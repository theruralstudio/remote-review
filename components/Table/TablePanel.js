import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { FirebaseContext } from '../../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'
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

  // remove an image
  const removeImage = (id) => {
    firebase.database().ref(`images/${id}`).remove()
  }

  const tableFrame= useRef(null);

  return (
    <div className="flex-grow h-full flex justify-center items-center relative pointer-events-none">
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
  )
}

export default TablePanel;

