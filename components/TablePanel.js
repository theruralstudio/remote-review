import React, { Component } from 'react'
import { Canvas } from 'react-three-fiber'
import Box from './Three/box'

// test for react-three-fiber

class TablePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: true,
      hovered: true
    }
  }

  render() {
    return (
      <div id="three-wrapper">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
        <style jsx>{`
          #three-wrapper { 
            flex-grow: 1;
          }
        `}</style>
      </div>

    )
  }

}

export default TablePanel;

