import useSWR from 'swr';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import Review from '../layouts/Review';
// import Reader from '../layouts/Reader';

import BasicLayout from '../layouts/BasicLayout'

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function Archive(props) {
  const { data, error } = useSWR('/api/projects', fetcher)
  let projects = data?.projects;
  if (!data) projects = [{}];
  if (error) projects = [{}];

  const router = useRouter()
  const open = router.query.open
  const view = router.query.view

  const projectList = projects.map((project, i) => (
    <div className="text-left p-2" key={i}>
      <Link href={{pathname: `/archive/project`, query: { title: project.title }}}>
      {/* <Link href="/project/[id]" as={`/project/${project.title}`}> */}
        <a>{project.title}</a>
      </Link>
    </div>
  ))

  // const archiveContent = () => (
  //   <div className="divide-y-2 divide-black">
  //     <div className="p-2"> 
  //       <h2>Projects</h2>
  //     </div>
  //     {projectList}
  //   </div>
  // )

  return (
    <div className="divide-y-2 divide-black">
      <div className="p-2">
        <Link href={{pathname: '/'}}>
          <a>Home</a>
        </Link>
      </div>
      <div className="p-2"> 
        <h2>Projects</h2>
      </div>
      {projectList}
    </div>
  )
  // // depending on "open" and "view" router params
  // // render the right page layout
  // if (open === 'true') {
  //   return (
  //     <Review currentUser={props.currentUser} setUser={props.setUser} streamUrl={props.streamUrl}>
  //       {archiveContent()}
  //     </Review>
  //   )
  // } else {
  //   return (
  //     <Reader currentUser={props.currentUser}>
  //       {archiveContent()}
  //     </Reader>
  //   )    
  // }
}

Archive.Layout = BasicLayout

export default Archive