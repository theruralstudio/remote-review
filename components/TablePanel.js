import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'
// import ChatPanel from './ChatPanel'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import UserStatus from './UserStatus'
import TableImage from './TableImage'

function TablePanel({numUsers, currentUser, setView}) {
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
  // const addImage = () => {
  //   ref.push({
  //     url: cards[0]
  //   })
  // }

  // remove an image
  const removeImage = (id) => {
    firebase.database().ref(`images/${id}`).remove()
  }

  const tableFrame= useRef(null);

  // gesture controls for images on table
  // const [{x, y}, setPosition] = useState({x: 0, y: 0});
  // const bind = useGesture({
  //   onDrag: ({ down, offset: [x, y]}) => {setPosition({x, y})}, // while dragging, use temporary x/y
  //   onDragEnd: () => { console.log(`${x} ${y}`)}, // then update the actual record
  //   // onMouseDown: () => console.log(x)
  // })
 
  return (
    <div className="flex-grow flex flex-col w-full relative pointer-events-none">
      <div className="absolute flex-grow w-full h-full flex justify-center items-center text-6xl text-gray-400 select-none z-0">╳</div>
      <ChatInput currentUser={currentUser}/>
      <UserStatus numUsers={numUsers} currentUser={currentUser} setView={setView}/>
      <ChatMessages currentUser={currentUser}/>
      <div className="flex-grow h-full flex justify-center items-center relative">
        { images.map( (img, i) => (
            <TableImage
              id={img.id}
              key={i} 
              img={img}
              // updateImage={updateImage}
              frame={tableFrame}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TablePanel;

