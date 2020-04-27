import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../../utils/firebase'
import 'firebase/database'
import { useObjectVal } from 'react-firebase-hooks/database'

function TableVideo({id}) {

}

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
    const updatebody = d
    ref.update(updatebody)
  }

  const remap = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  const updateZoom = (z) => {
    console.log(z)
    const zoomMultiplier = remap(z, -25, 25, 0.5, 1.5)
    const [zMin, zMax] = [2, 20]
    // const zFactor = 10
    // const scaledInput = z/zFactor
    const newValue = img.zoom * zoomMultiplier
    const newValuePadded = Math.min(Math.max(parseInt(newValue), zMin), zMax)

    console.log(newValue)
    updateImage({
      zoom: newValuePadded
    })
  }
  
  // if image loaded, translate props here
  const {x, y} = img && img.position ? img.position : {x: 0, y: 0}
  const zoom = img ? img.zoom : 5
  const staticProps = {  // static styles
    width: `${zoom*100}px`, 
    height: `${zoom*100}px`, 
  }

  const bind = useGesture({
    onDrag: ({ down, event, tap, offset: [dx, dy]}) => { updateImage({position: { x: dx, y: dy }}) }, // while dragging, use temporary x/y setPosition({x: dx, y: px + dy})
    onWheel: ({movement: [x, y]}) => { updateZoom(y) },
  })
 
  if (img) {
    return (
      <animated.div {...bind()} className="absolute pointer-events-auto flex flex-col items-center justify-center" style={{...staticProps, ...{ x, y } }}> 
        <div className="pointer-events-auto cursor-pointer self-start lime -mb-6 z-10" onClick={removeImage}>╳</div>
        <img draggable={false} className="shadow" src={img.url} />
        <style jsx>
          {`
          .lime {
            font-weight: bold;
            color: black;
          }
          `}
        </style>
      </animated.div>
      // <animated.img 
      //   className="absolute shadow pointer-events-auto"
      //   draggable={false}
      //   src={img.url}
      //   style={{...staticProps, ...{ x, y } }}>
      // </animated.img>
    )
  } else {
    return (<p>none</p>)
  }

}

export default TableImage;
