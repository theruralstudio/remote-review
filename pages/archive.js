import Link from 'next/link';
import useSWR from 'swr';
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
    <div id='archive-list'>
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
      <style jsx>{`
        #archive-list {
          margin: 1em;
        }

        ul {
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          padding-top: 1em;
          padding-bottom: 1em;
          border-bottom: 1px solid #b0b0b0;
        }

        a {
          font-size: 1.5em;
          color: blue;
        }
      `}</style>
    </div>
  );
};
