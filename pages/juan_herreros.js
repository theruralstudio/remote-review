import React, {Component} from 'react'
import Link from 'next/link'

import LandingLayout from '../layouts/LandingLayout'

class Juan extends Component {

  render() {
    return (
      <div className="flex-grow flex flex-col justify-center items-stretch m-24">
        <div className="flex-grow flex flex-col grid grid-cols-2 gap-8 items-stretch">
          <span className="text-center bg-white flex-grow flex items-center justify-center border-black border-2">
            <a href="https://studio-herreros-content-test.nyc3.digitaloceanspaces.com/20200118_Resume_3pg.%20English.docx" download>
              Resume
            </a>
          </span>
          <span className="text-center bg-white text-gray-600 flex-grow flex items-center justify-center border-black border-2">
            <div>
              Bibliography
            </div>
          </span>
          <span className="text-center bg-white text-gray-600 flex items-center justify-center border-black border-2">
            <div>
              Videos
            </div>
          </span>
          <span className="text-center bg-white text-gray-600 flex items-center justify-center border-black border-2">
            <div>
              Images
            </div>
          </span>
        </div>     
      </div>
    )
  }
}

Juan.Layout = LandingLayout

export default Juan;