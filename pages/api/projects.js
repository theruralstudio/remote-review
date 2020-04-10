import config from '../../config.json';
import fetch from 'isomorphic-unfetch';
var Minio = require('minio');

// lists all projects in the source repository
export default (req, res) => {
  const bucketname = config.api.staticbucketname;
  const minioClient = new Minio.Client({
    endPoint: config.api.staticendpoint,
    useSSL: false
    // no creds required if public-read
  });
    
  const objectsStream = minioClient.extensions.listObjectsV2WithMetadata(bucketname, 'projects', true,'');
  let media = [];
  let projects = new Set();

  // process each object
  objectsStream.on('data', function(obj) {
    console.log(obj);
    const { name } = obj; // get the name

    const nameRegex = /([\w]+)\/([\d\w\s]+)\_([\d\w\-]+)\/([\d]+)\_([\w\d\s\-]+)\.([\w\d]+)/g;
    const matches = [...name.matchAll(nameRegex)];
    if (matches[0]) {
      const [orig, collection, title, authors, index, caption, extension, ...rest] = matches[0];
      // also add url const url = , add to media object below
      const type = obj.metadata['content-type'][0];
      projects.add(title);
      media.push({ project: title, authors, index: Number(index), caption, type, extension});
    }
  })
  objectsStream.on('end', () => {
    let body = {
      "projects": [...projects].map( (proj, i) => {
        return {
          "title": proj,
          "media": media.filter( (m, i) => m.project === proj )
        }
      })
    }
    console.log(body);
    res.status(200).json(body);
  })
  objectsStream.on('error', function(e) {
    // console.log(e)
    res.status(204);
  })
};