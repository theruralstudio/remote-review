import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useObjectVal } from 'react-firebase-hooks/database'

function TableImage({id}) {
  //const safeFrame = useRef(null);

  //firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref(`images/${id}`)
  const [img, loading, error] = useObjectVal(ref, {keyField: 'id'})

  // const animationProps = useSpring({opacity: 1, from: {opacity: 0}}) // basic animation props

  // remove an image
  const removeImage = () => {
    ref.remove()
  }

  // update an image's position, in X, Y from the center
  const updateImage = (d) => {
    console.log(d)
    const updatebody = d
    ref.update(updatebody)
  }
  
  // initialize position from props
  // const [{x, y}, setPosition] = useState( img ? {x: img.position.x, y: img.position.y} : {x: 0, y: 0});

  // const [{x, y}, setPosition] = useState({x: img.position.x, y: img.position.y});
  // const [{ x, y }, setPosition] = useSpring(() => ({ x: img.position.x, y: img.position.y }))

  // const centerPosition = (targetNode) => {
  //   let centerX = targetNode.offsetLeft + targetNode.offsetWidth / 2;
  //   let centerY = targetNode.offsetTop + targetNode.offsetHeight / 2;
  //   return [centerX, centerY]
  // }

  // const centerDelta = (before, after) => {
  //   let [x1, y1] = centerPosition(before)
  //   let [x2, y2] = centerPosition(after)
  //   return [x1 - x2, y1 - y2]
  // }

  // if image loaded, translate props here
  const {x, y} = img && img.position ? img.position : {x: 0, y: 0}
  const zoom = img ? img.zoom : 5
  const staticProps = {  // static styles
    maxWidth: `${zoom*100}px`, 
    maxHeight: `${zoom*100}px`, 
  }


  const bind = useGesture({
    onDrag: ({ down, event, tap, offset: [dx, dy]}) => { if (tap) removeImage(); updateImage({position: { x: dx, y: dy }}) }, // while dragging, use temporary x/y setPosition({x: dx, y: px + dy})
    onWheel: ({xy: [x, y]}) => { updateImage({zoom: y/10}) },
  }, { filterTaps: true })
 
  if (img) {
    return (
      <animated.img {...bind()} 
        className="absolute shadow pointer-events-auto"
        draggable={false}
        src={img.url}
        style={{...staticProps, ...{ x, y } }}> 
      </animated.img>
    )
  } else {
    return (<p>none</p>)
  }

}

export default TableImage;
