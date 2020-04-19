import React, { useContext, useState } from 'react'
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
  const [active, setActive] = useState(true);
  const [hovered, setHovered] = useState(true);

  const animationProps = useSpring({opacity: 1, from: {opacity: 0}}) // basic animation props
  const staticProps = {width: '100px', height: '100px', background: 'black'} // static styles
  // dragging example w react-use-gesture
  //const [{ x, y }, setPosition] = useSpring(() => ({ x: 0, y: 0 }))
  
  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('messages')
  const [snapshots, loading, error] = useList(ref)
  const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const bind = useGesture({
    onDrag: ({ down, offset: [x, y] }) => setPosition({x, y}),
    onMouseDown: () => console.log('mouse down')
  })
 
  return (
    <div id="table-wrapper">
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
        }
      `}</style>
    </div>
  )
}

export default TablePanel;

