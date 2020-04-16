import React, { Component } from 'react'
import { Canvas } from 'react-three-fiber'
import Box from '../components/Three/box'

// test for react-three-fiber

class Renderer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: true,
      hovered: true
    }
  }

  render() {
    return (
      <div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    )
  }

}

export default Renderer;

