import { useRouter } from 'next/router';
import Layout from '../../layouts/Layout';
import ReactPlayer from 'react-player';
import Markdown from 'react-markdown';
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Project() {
  const { query } = useRouter();
  const { data, error } = useSWR(`/api/project?title=${encodeURI(query.name)}`, fetcher);

  const project = data;

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <p>Error Loading the Project...</p>
      </div>
    );
  } else {
    return (
      <Layout>
        <h1>{project.title}</h1>

        <h3>Video</h3>
        <ReactPlayer url={project.video.url} playing />
        <p>{project.video.caption}</p>

        <h3>Images</h3>
        <ul>
          {project.images.map(img=> (
            <li key={img.url}>
              <img src={img.url}></img>
              <p>{img.caption}</p>
            </li>
          ))}
        </ul>

        <h3>Text</h3>
        <Markdown source={project.text.body} />
        <div>{project.text.body}</div>

      </Layout>
    );
  }
}