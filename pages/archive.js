import Layout from '../layouts/Layout';
//import Link from 'next/link';
import useSWR from 'swr';
//import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Archive() {
  //const { query } = useRouter();
  const { data, error } = useSWR('/api/projects', fetcher);

  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  let projects = data && data.projects;
  //let quote = data?.quote;

  if (!data) projects = [{}];
  if (error) projects = [{}];

  return (  
    <Layout>
      <p>This component will display the archived projects and reference material.</p>
      <h2>Projects</h2>
      <ul>
        {/* {projects.map(project => (
          <li key={project.sha}>
            <Link href="/project/[id]" as={`/project/${project.name}`}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))} */}
      </ul>
      <ReactPlayer url='http://assets.carstenrod.in/gsapp-review-data/projects/900km%20Nile%20City/video.mp4' playing />
    </Layout>
  );
};
