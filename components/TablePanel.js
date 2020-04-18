import React, { Component } from 'react'
import { Canvas } from 'react-three-fiber'
import Box from './Three/box'
import ImagePlane from './Three/imageplane'
import BackgroundPlane from './Three/backgroundplane'

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
          {/* <ambientLight intensity={0.5}/> */}
          <directionalLight position={[1, -1, 5]} lookAt={[0, 0, 0]} castShadow/>
          <Box position={[0, 0, -3]} castShadow/>
          <ImagePlane position={[-1.2, 1, 0]} castShadow/>
          <BackgroundPlane position={[0, 0, -5]} receiveShadow/>
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

