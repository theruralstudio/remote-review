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

import Review from '../../layouts/Review'
import Reader from '../../layouts/Reader'
import Carousel from '../../components/Carousel'

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Project(props) {
  const router = useRouter()
  const {name, ...viewprops} = router.query
  const open = viewprops.open
  const view = viewprops.view


  const { data, error } = useSWR(`/api/project?title=${encodeURI(name)}`, fetcher);

  // gesture controls for images
  const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const [targetUrl, setTargetUrl] = useState(null);
  const bind = useGesture({
    onDrag: ({ down, event, offset: [x, y], xy: [px, py]}) => {setPosition({x, y}); setTargetUrl(event.target.src); },
    onDragEnd: ( event ) => addImage(targetUrl),
    // onMouseDown: () => console.log(x)
  })
  
  // useDrag(({ offset: [x, y], event }) => , {threshold: 100})

  // const carouselSettings = {
  //   dots: false,
  //   infinite: true,
  //   draggable: false, // using drag for table
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // }

    // firebase
    const firebase = useContext(FirebaseContext)
    const ref = firebase.database().ref('images')
    const [images, loading, imgError] = useListVals(ref)
  
    // add an image to the list, maybe do this from project panel instead?
    const addImage = (url) => {
      if (url) {
        ref.push({
          url: url,
          position: {x: 0, y: 0} // add at 0,0 for now
        })
      }
    }  

  const project = data;

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
    <div className="divide-y-2 divide-black">
      <div className="p-2">
        <Link href={{pathname: '/archive', query: {...viewprops, view: 'register'}}}>
          <a>Back</a>
        </Link>
      </div>

      <div className="p-2">
        <h1>{project.title}</h1>
      </div>


      <Carousel images={project.images} video={project.video}/>

      <div id="text-frame" className="p-2">
        <Markdown source={project.text.body} />
      </div>
    </div>
  )

  // depending on "open" and "view" router params
  // render the right page layout
  if (open === 'true' && data) {
    return (
      <Review currentUser={props.currentUser}>
        {pageContent()}
      </Review>
    )
  } else if (data) {
    return (
      <Reader currentUser={props.currentUser}>
        {pageContent()}
      </Reader>
    )    
  } else {
    return (
      <Reader currentUser={props.currentUser}>
        loading...
      </Reader>
    )
  }
}