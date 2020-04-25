import React, {Component} from 'react'
import Link from 'next/link'

import LandingLayout from '../layouts/LandingLayout'

class Index extends Component {

  render() {
    return (
      <div className="flex bg-gray-200 w-full h-full">
        <div className="flex-grow grid grid-cols-2 gap-8 m-48">
          <span className="flex items-center justify-center border-black border-2">
            <Link href={{pathname: '/archive', query: {open: true}}}><a>Spring 2020</a></Link>
          </span>
          <span className="line-through text-gray-400 flex items-center justify-center border-black border-2">Previous Studios</span>
          <span className="line-through text-gray-400 flex items-center justify-center border-black border-2">Media & Bibliography</span>
          <span className="line-through text-gray-400 flex items-center justify-center border-black border-2">Who</span>
        </div>
        <div>
            <div className="line-through text-gray-400 fixed top-0 left-0 m-6">Search</div>
            <div>
              <a className="fixed bottom-0 left-0 m-6" href={'http://estudioherreros.com/en/'}>estudio Herreros</a>
            </div>
            <div className="line-through text-gray-400 fixed top-0 right-0 m-6">Lang</div>
            <div className="line-through text-gray-400 fixed bottom-0 right-0 m-6">Contact</div>
        </div>
      </div>
    )
  }
}

Index.Layout = LandingLayout

export default Index;