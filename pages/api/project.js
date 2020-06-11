import fetch from 'isomorphic-unfetch';
var Minio = require('minio');

// lists all projects in the source repository
export default (req, res) => {
  const bucketName = process.env.BUCKETNAME
  const endPoint = process.env.BUCKETENDPOINT
  const minioClient = new Minio.Client({
    endPoint: endPoint,
    bucketName: bucketName,
    accessKey: process.env.BUCKETPUBLICKEY,
    secretKey: process.env.BUCKETSECRETKEY,
    useSSL: true,
  });

  const querytitle = req.query.title
  const objectsStream = minioClient.listObjectsV2(bucketName, 'projects/' + querytitle , true,'');
  
  let project = {
    "title": querytitle,
    "authors": [],
    "video": {},
    "images": [],
    "text": {}
  };

  // process each media object as it comes in
  // they should belong only to this project 
  objectsStream.on('data', function(obj) {
    const { name } = obj; // get the name
    const nameRegex = /([\w]+)\/([\d\w\s]+)\_([\d\w\-]+)\/([\d]*)[\_]*([\w\d\s\-]+)\.([\w\d]+)/g;
    const matches = [...name.matchAll(nameRegex)];
    if (matches[0]) {
      const [orig, collection, title, authors, index, caption, extension, ...rest] = matches[0];
      const url = `http://${endPoint}/${bucketName}/${encodeURI(obj.name)}`;
      const key = obj.etag;
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
    let projectText = ''
    if (project.text.url) {
      projectText = fetch(project.text.url).then((r) => r.text())
    }
    const students = fetch(`https://${endPoint}/${bucketName}/text/students.json`).then((r) => r.json())

    Promise.all([projectText, students])
        .then(values => {
          let authors = project.images[0].authors ? project.images[0].authors.split('-') : {}
          let students = values[1]
          let authorObjs = students.filter(s => {
            return authors.includes(s.uni)
          })
          project.authors = authorObjs
          project.text.body = values[0]
        })
        .then(v => {
          res.status(200).json(project);
        })
  })
  objectsStream.on('error', function(e) {
    res.status(204);
  })
};
