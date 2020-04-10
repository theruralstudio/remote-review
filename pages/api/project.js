import config from '../../config.json';
var Minio = require('minio');

// lists all projects in the source repository
export default (req, res) => {
  const querytitle = req.query.title;
  console.log(querytitle);

  const bucketname = config.api.staticbucketname;
  const minioClient = new Minio.Client({
    endPoint: config.api.staticendpoint,
    useSSL: false
    // no creds required if public-read
  });
    
  const objectsStream = minioClient.extensions.listObjectsV2WithMetadata(bucketname, 'projects/' + querytitle , true,'');
  let project = {
    "title": querytitle,
    "video": {},
    "images": [],
    "text": {}
  };

  // process each media object as it comes in
  // they should belong only to this project 
  objectsStream.on('data', function(obj) {
    //console.log(obj);
    const { name } = obj; // get the name

    const nameRegex = /([\w]+)\/([\d\w\s]+)\_([\d\w\-]+)\/([\d]*)[\_]*([\w\d\s\-]+)\.([\w\d]+)/g;
    const matches = [...name.matchAll(nameRegex)];
    if (matches[0]) {
      // console.log(obj);
      const [orig, collection, title, authors, index, caption, extension, ...rest] = matches[0];
      const url = `http://${config.api.staticendpoint}/${config.api.staticbucketname}/${encodeURI(obj.name)}`;
      const type = obj.metadata['content-type'][0];
      switch (type) {
        case 'video/mp4':
          project.video = { url, authors, index: Number(index), caption, type, extension };
          break;
        case 'image/jpeg':
        case 'image/png':
          project.images.push({ url, authors, index: Number(index), caption, type, extension });
          break;
        case 'text/plain':
        case 'text/markdown':
        case 'application/octet-stream':
          project.text = { url, authors, index: Number(index), caption, type, extension }
          break;
      };
    }
  })
  objectsStream.on('end', () => {
    res.status(200).json(project);
  })
  objectsStream.on('error', function(e) {
    // console.log(e)
    res.status(204);
  })
};
