import React, {Component} from 'react'
import Link from 'next/link'

import LandingLayout from '../layouts/LandingLayout'

class Index extends Component {

  render() {
    return (
      <div className="flex-grow flex flex-col justify-center items-center m-24">
        <div className="flex-grow grid grid-cols-2 gap-8">
          <span className="text-center bg-white flex items-center justify-center border-black border-2">
            <Link href={{pathname: '/archive', query: {open: true}}}>
              <div className="cursor-pointer">
                <p>ADVANCED STUDIO VI · RURAL CITY III · SPRING 2020</p>
                <p className="font-bold">INFRASTRUCTURAL GEOGRAPHY: WATER, LEISURE AND ENERGY POLICIES</p>
              </div>
            </Link>
          </span>
          <span className="text-center bg-white text-gray-600 flex items-center justify-center border-black border-2">
            <div>
              <p>ADVANCED STUDIO VI · RURAL CITY II · SPRING 2019</p>
              <p className="font-bold">POST-OCCUPATION OF THE DEPLETED TERRITORIES</p>
              <p className="text-xs">WE’RE WORKING ON IT</p>
            </div>
          </span>
          <span className="text-center bg-white text-gray-600 flex items-center justify-center border-black border-2">
            <div>
              <p>ADVANCED STUDIO VI · RURAL CITY II · SPRING 2019</p>
              <p className="font-bold">THE PERIPHERY OF THE PERIPHERY</p>
              <p className="text-xs">WE’RE WORKING ON IT</p>
            </div>
          </span>
          <span className="text-center bg-white text-gray-600 flex items-center justify-center border-black border-2">
            <div>
              <p>CONSTRUCTING (COLLABORATIVE) PRACTICE · SPRING 2021</p>
              <p className="font-bold">RESEARCH · SYMPOSIUM · BOOK · SEMINAR</p>
              <p className="text-xs">WE’RE WORKING ON IT</p>
            </div>
          </span>
        </div>
        <div className="mt-8">
          <strong>THIS IS THE JUAN HERREROS’ RESEARCH AT GSAPP SITE</strong>
        </div>        
      </div>
    )
  }
}

Index.Layout = LandingLayout

export default Index;