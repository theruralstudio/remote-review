import config from '../../config.json';
var Minio = require('minio');

// lists all projects in the source repository
export default (req, res) => {
  const querytitle = req.query.title;
  //console.log(querytitle);

  const minioClient = new Minio.Client({
    endPoint: config.api.staticendpoint,
    useSSL: true,
    accessKey: 'AS5NPCNW3QGDTIBH42QB',
    secretKey: '5gSUdkRgCDyEkPrx8HTjvGI4Z4/3QOneOZtDRlEGnXU'
  });
    
  const objectsStream = minioClient.listObjectsV2(config.api.staticbucketname, 'projects/' + querytitle , true,'');
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
      const key = obj.etag;
      //const type = obj.metadata['content-type'][0];
      switch (extension) {
        case 'mp4':
          project.video = { key, url, authors, index: Number(index), caption, extension };
          break;
        case 'jpg':
        case 'png':
          project.images.push({ key, url, authors, index: Number(index), caption, extension });
          break;
        case 'txt':
        case 'md':
          project.text = { key, url, authors, index: Number(index), caption, extension }
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
