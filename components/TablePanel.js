import React, { useContext, useState, useRef } from 'react'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useList } from 'react-firebase-hooks/database'

const cards = [
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
]

function TablePanel(props) {
  const safeFrame = useRef(null);

  const [active, setActive] = useState(true);
  const [hovered, setHovered] = useState(true);

  const animationProps = useSpring({opacity: 1, from: {opacity: 0}}) // basic animation props
  const staticProps = {width: '100px', height: '100px', background: 'black'} // static styles
  // dragging example w react-use-gesture
  //const [{ x, y }, setPosition] = useSpring(() => ({ x: 0, y: 0 }))
  
  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('images')
  const [snapshots, loading, error] = useList(ref)

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
    const ref = firebase.database().ref(`images/${id}`)
    const updatebody = {
      position: pos
    }
    ref.update(updatebody)
  }

  // gesture controls for images on table
  const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const bind = useGesture({
    onDrag: ({ down, offset: [x, y], xy: [px, py]}) => {setPosition({x, y}); updateImage('-M5FGo__4ZQB_5aJvv89', {px, py}); console.log(safeFrame);},
    onMouseDown: () => console.log('')
  })
 
  return (
    <div id="table-wrapper">
      <div id="table-safe-frame" ref={safeFrame}></div>
      {cards.map((img) => (
          <animated.div {...bind()} 
            style={{
              ...animationProps, 
              ...staticProps, 
              ...{x, y},
              backgroundImage: `url("${img}")`
            }}
              >
          </animated.div>
        ))
      }
      <style jsx>{`
        #table-wrapper { 
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        #table-safe-frame {
          display:block;
          height: auto;
          bottom:0;
          top:0;
          left:0;
          right:0;
          margin: 2em;
          position: absolute;
          border: 1px dotted lime;
          pointer-events: none;
          z-index: 100;
        }
      `}</style>
    </div>
  )
}

export default TablePanel;

