import { useRouter, Router } from 'next/router';
import Layout from '../../layouts/Layout';
import fetch from 'isomorphic-unfetch';
import ReactPlayer from 'react-player'



const Project = props => (
  <Layout>
    <h1>{props.url.query.name}</h1>
    <p>This will render a single project</p>
    <h3>Contents</h3>
    <ul>
      {props.contents.map(item => (
        <li key={item.sha}>
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
  </Layout>
);

Project.getInitialProps = async function (context) {
  const { name } = context.query;
  const res = await fetch(`https://api.github.com/repos/carstoid/gsapp-review-data/contents/${name}`);
  const contents = await res.json();

  return { contents };
};

export default Project;