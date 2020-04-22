import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useObjectVal } from 'react-firebase-hooks/database'

function TableImage(props) {
  //const safeFrame = useRef(null);

  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref(`images/${props.img.id}`)
  const [img, loading, error] = useObjectVal(ref, {keyField: 'id'})

  const animationProps = useSpring({opacity: 1, from: {opacity: 0}}) // basic animation props
  const staticProps = {  // static styles
    maxWidth: '200px', 
    maxHeight: '200px', 
    background: 'black', 
    // boxShadow: '0px 0px 10px black'
  }
  // dragging example w react-use-gesture
  //const [{ x, y }, setPosition] = useSpring(() => ({ x: 0, y: 0 }))
  
  // gesture controls for images on table
  //const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const [{x, y}, setPosition] = useState({x: props.img.position.x, y: props.img.position.y});

  const bind = useGesture({
    onDrag: ({ down, offset: [x, y]}) => {setPosition({x, y})}, // while dragging, use temporary x/y
    onDragEnd: ({offset: [x, y]}) => { props.updateImage(props.img.id, {x: x, y: y } ) }, // then update the actual record
    // onMouseDown: () => console.log(x)
  })
 
  return (
    <animated.img {...bind()} 
      className="shadow"
      draggable={false}
      src={props.img.url}
      style={{...animationProps, ...staticProps, ...{ x, y } }}>
    </animated.img>
  )
}

export default TableImage;

