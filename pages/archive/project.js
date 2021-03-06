import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import Markdown from 'react-markdown'
import useSWR from 'swr'
import Slider from "react-slick"
import Link from 'next/link'
import { FirebaseContext } from '../../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'

// import Review from '../../layouts/Review'
// import Reader from '../../layouts/Reader'

import BasicLayout from '../../layouts/BasicLayout'

import Carousel from '../../components/Carousel'

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function Project(props) {
  const router = useRouter()
  const {title} = router.query
  // const open = viewprops.open
  // const view = viewprops.view

  const { data, error } = useSWR(`/api/project?title=${encodeURI(title)}`, fetcher);
  // const { students, sError } =useSWR('/api/students', fetcher)
  // const authorUnis = data.authors.split('-')
  // const authors = students.filter( (s) => {
  //   authorUnis.includes(s.uni)
  // })
  // console.log(authors)

  // gesture controls for images
  const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const [targetUrl, setTargetUrl] = useState(null);
  const bind = useGesture({
    onDrag: ({ down, event, offset: [x, y], xy: [px, py]}) => {setPosition({x, y}); setTargetUrl(event.target.src); },
    onDragEnd: ( event ) => addImage(targetUrl),
    // onMouseDown: () => console.log(x)
  })
  
  const project = data;

  if (data) {
    const projectImages = () => {
      const imgs = project.images.map(img=> (
        <animated.div key={img.url} {...bind()} style={{...{x, y}}} >
          <img className="max-w-full" src={img.url}></img>
          <p>{img.caption}</p>
        </animated.div>
      ))
      return imgs
    }
  
    const pageContent = () => (
      <div className="flex flex-col divide-y-2 divide-black h-full">
        <div className="p-2">
          <Link href={{pathname: '/archive'}}>
            <a>← Back</a>
          </Link>
        </div>
        <div className="p-2">
          <h1>{project.title}</h1>
        </div>
        <div className="divide-y divide-black">
          {project.authors.map((a) => { return <div className="p-2">{a.name}</div> })}
        </div>        
        <Carousel images={project.images} video={project.video}/>
        <div className="p-2 flex-grow overflow-y-auto">
          <Markdown source={project.text.body} />
        </div>
        <div className="flex flex-row justify-end p-2">
          <a onClick={props.toggleOpen} className="cursor-pointer">← Hide Archive</a>
        </div>
      </div>
    )

    return (
      pageContent()
    )
  } else {
    return (
      <div className="w-full h-full flex flex-col divide-y-2 divide-black">
        <div className="p-2">
          <a>← Back</a>
        </div>
        <div className="flex-grow flex justify-center items-center">
          <p>↻ loading...</p>
        </div>
      </div>
    )
  }
}

Project.Layout = BasicLayout

export default Project