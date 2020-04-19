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

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Project() {
  const { query } = useRouter();
  const { data, error } = useSWR(`/api/project?title=${encodeURI(query.name)}`, fetcher);

  // gesture controls for images
  const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const [targetUrl, setTargetUrl] = useState(null);
  const bind = useGesture({
    onDrag: ({ down, event, offset: [x, y], xy: [px, py]}) => {setPosition({x, y}); setTargetUrl(event.target.src); },
    onDragEnd: ( event ) => addImage(targetUrl),
    // onMouseDown: () => console.log(x)
  })
  
  // useDrag(({ offset: [x, y], event }) => , {threshold: 100})

  const carouselSettings = {
    dots: false,
    infinite: true,
    draggable: false, // using drag for table
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

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
        console.log('added image')
      }
    }  

  const project = data;

  if (!data) {
    return (
      <div id="project-container">
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div id="project-container">
        <p>Error Loading the Project...</p>
      </div>
    );
  } else {
    return (
      <div id="project-container">

        <Link href="/archive">
          <a>Back</a>
        </Link>        
        <h1>{project.title}</h1>

        <Slider {...carouselSettings}>
          <div>
            <ReactPlayer className="slider-video" url={project.video.url} playing />
            <p>{project.video.caption}</p>
          </div>
          {project.images.map(img=> (
            <animated.div key={img.url} {...bind()} style={{...{x, y}}} >
              <img className="slider-img" src={img.url}></img>
              <p>{img.caption}</p>
            </animated.div>
          ))}
        </Slider>

        <div id="text-frame">
          <Markdown source={project.text.body} />
        </div>

        <div>{project.text.body}</div>
          <style  jsx>{`
            .slick-slider .slick-initialized {
              width: 100%;
              max-height: 40vh;
              max-width: 40vw;
              background: black;
            }

            .slider-img, .slider-video {
              max-height: 50vh;
            }

            h1, h2, h3 {
              padding: 0.5em;
            }

            #text-frame {
              padding: 1em;
            }
            
            #project-container {
              padding: 0px;
              max-width: 40vw;
              overflow: hidden;
            }



          `}</style>
      </div>
    );
  }
}