import Layout from '../layouts/Layout';
import Link from 'next/link';
import useSWR from 'swr';
//import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Archive() {
  const { data, error } = useSWR('/api/projects', fetcher);

  let projects = data?.projects;

  if (!data) projects = [{}];
  if (error) projects = [{}];

  return (  
    <Layout>
      <p>This component will display the archived projects and reference material.</p>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.key}>
            <Link href="/project/[id]" as={`/project/${project.title}`}>
              <a>{project.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
