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
    
  const objectsStream = minioClient.extensions.listObjectsV2WithMetadata(bucketname, '', true,'');
  let media = [];

  objectsStream.on('data', function(obj) {
    console.log(obj);
    const { name } = obj;
    const type = obj.metadata['content-type'][0];
    media.push({ name, type });
  })
  objectsStream.on('end', () => {
    res.status(200).json({"projects": media});
  })
  objectsStream.on('error', function(e) {
    console.log(e)
    res.status(204);
  })
};