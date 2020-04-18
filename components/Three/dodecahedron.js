import React from "react"
import { Canvas, useThree } from "react-three-fiber"
import { useDrag, useHover } from "react-use-gesture"
import { useSpring } from "react-spring"

function Dodecahedron(props) {

  return (
    <mesh {...props} >
      <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default Dodecahedron;