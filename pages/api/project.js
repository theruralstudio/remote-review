import config from '../../config.json';
import fetch from 'isomorphic-unfetch';

// lists all projects in the source repository
export default async (req, res) => {

  const { name } = req.query;
  let project = {};

  if (name) {
    const sourceUrl = `${config.api.baseurl}/${config.api.repo}/contents/projects/${encodeURI(name)}`;
    console.log(sourceUrl);
    const sourceRes = await fetch(sourceUrl);
    project = await sourceRes.json();
  }

  // strip out unneeded stuff from github api?

  res.status(200).json(project);
};
