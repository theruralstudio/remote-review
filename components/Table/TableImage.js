import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../../utils/firebase'
import 'firebase/database'
import { useObjectVal } from 'react-firebase-hooks/database'

function TableVideo({id}) {

}

function TableImage({id, num}) {
  //const safeFrame = useRef(null);

  //firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref(`images/${id}`)
  const [img, loading, error] = useObjectVal(ref, {keyField: 'id'})

  // const animationProps = useSpring({opacity: 1, from: {opacity: 0}}) // basic animation props

  const remap = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  const pad = (input, min, max) => {
    return Math.min(Math.max(parseInt(input), min), max)
  }

  // remove an image
  const removeImage = () => {
    ref.remove()
  }

  const zoomIn = () => {
    ref.update({
      zoom: pad(img.zoom + 2, 2, 20)
    })
  }

  const zoomOut = () => {
    ref.update({
      zoom: pad(img.zoom - 2, 2, 20)
    })
  }

  // update an image's position, in X, Y from the center
  const updateImage = (d) => {
    const updatebody = d
    ref.update(updatebody)
  }


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
    maxWidth: `${zoom*100}px`, 
    maxHeight: `${zoom*100}px`, 
    // transform: `scale(${zoom})`
  }

  const bind = useGesture({
    onDrag: ({ down, event, tap, offset: [dx, dy]}) => { updateImage({position: { x: dx, y: dy }}) }, // while dragging, use temporary x/y setPosition({x: dx, y: px + dy})
    onWheel: ({movement: [x, y]}) => { updateZoom(y) },
  })
 
  if (img) {
    return (
      <animated.div {...bind()} className="absolute pointer-events-auto flex flex-col items-center justify-center" style={{...staticProps, ...{ x, y } }}> 
        <div className="self-start flex">
          <div className="pointer-events-auto bg-white cursor-pointer text-gray-700 px-2" onClick={removeImage}>╳</div>
          <div className="pointer-events-auto bg-green-200 cursor-pointer text-gray-700 px-2" onClick={zoomIn}>+</div>
          <div className="pointer-events-auto bg-red-200 cursor-pointer text-gray-700 px-2" onClick={zoomOut}>-</div>          
        </div>
        <img draggable={false} className="shadow" src={img.url} />
        <div className="self-start flex">
          <div className="self-start number bg-white text-gray-700 px-2">{num + 1}</div>
          <div className="self-start number bg-white text-gray-700 px-2">{img.caption}</div>
        </div>
        <style jsx>{`
          .number {
            font-family: monospace;
          }
        `}</style>
      </animated.div>
    )
  } else {
    return (<p>none</p>)
  }
}

export default TableImage;
