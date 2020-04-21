import useSWR from 'swr';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Review from '../layouts/Review';
import Reader from '../layouts/Reader';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Archive(props) {
  const { data, error } = useSWR('/api/projects', fetcher)
  let projects = data?.projects;
  if (!data) projects = [{}];
  if (error) projects = [{}];

  const router = useRouter()
  const open = router.query.open
  const view = router.query.view

  const projectList = projects.map((project, i) => (
    <li key={i}>
      <Link href={{ pathname: `/project/${project.title}`, query: { open: open, view: view, ...router.query }}}>
      {/* <Link href="/project/[id]" as={`/project/${project.title}`}> */}
        <a>{project.title}</a>
      </Link>
    </li>
  ))

  const archiveContent = () => (
    <div id='archive-list'>
      <h2>Projects</h2>
      <ul>
        {projectList}
      </ul>
    </div>
  )

  // depending on "open" and "view" router params
  // render the right page layout
  if (open === 'true') {
    return (
      <Review currentUser={props.currentUser} setUser={props.setUser} streamUrl={props.streamUrl}>
        {archiveContent()}
      </Review>
    )
  } else {
    return (
      <Reader currentUser={props.currentUser}>
        {archiveContent()}
      </Reader>
    )    
  }
}
