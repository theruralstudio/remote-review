import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'

import ChatPanel from './ChatPanel'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import UserCount from './UserCount'
import TableImage from './TableImage'

function TablePanel({numUsers, currentUser}) {
  const safeFrame = useRef(null);

  const [active, setActive] = useState(true);
  const [hovered, setHovered] = useState(true);

  const animationProps = useSpring({opacity: 1, from: {opacity: 0}}) // basic animation props
  const staticProps = {maxWidth: '100px', maxHeight: '100px', background: 'black', boxShadow: '0px 0px 10px black'} // static styles
  // dragging example w react-use-gesture
  //const [{ x, y }, setPosition] = useSpring(() => ({ x: 0, y: 0 }))
  
  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('images')
  const [images, loading, error] = useListVals(ref, {keyField: 'id'})

  // add an image to the list, maybe do this from project panel instead?
  const addImage = () => {
    ref.push({
      url: cards[0]
    })
  }

  // remove an image
  const removeImage = (id) => {
    firebase.database().ref(`images/${id}`).remove()
  }

  // update an image's position
  const updateImage = (id, pos) => {
    console.log(pos)
    const ref = firebase.database().ref(`images/${id}`)
    const updatebody = {
      position: pos
    }
    ref.update(updatebody)
  }

  // gesture controls for images on table
  // const [{x, y}, setPosition] = useState({x: 0, y: 0});
  // const bind = useGesture({
  //   onDrag: ({ down, offset: [x, y]}) => {setPosition({x, y})}, // while dragging, use temporary x/y
  //   onDragEnd: () => { console.log(`${x} ${y}`)}, // then update the actual record
  //   // onMouseDown: () => console.log(x)
  // })
 
  return (
    <div className="flex-grow flex flex-col w-full bg-gray-300 relative">
      <ChatInput currentUser={currentUser}/>
      <UserCount numUsers={numUsers}/>
      <ChatMessages currentUser={currentUser}/>
      <div id="table-safe-frame" ref={safeFrame}></div>
      { images.map( (img) => (
          <TableImage 
            img={img}
            updateImage={updateImage}
          />
        ))
      }
    </div>
  )
}

export default TablePanel;

