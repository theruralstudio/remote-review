import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three'

function ImagePlane(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  
  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  const squirrelUrl = 'https://audubonportland.org/wp-content/uploads/2019/03/Fox-Squirrel-by-Red-Faux-300x300.jpg';
  const texture = useMemo(() => new TextureLoader().setCrossOrigin('anonymous').load(squirrelUrl), [squirrelUrl]);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 1]} />
      {/* <meshStandardMaterial attach="material" color={'white'} /> */}
      <meshLambertMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default ImagePlane;