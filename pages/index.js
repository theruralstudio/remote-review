import React, {Component} from 'react'
import Link from 'next/link'

import LandingLayout from '../layouts/LandingLayout'

class Index extends Component {

  render() {
    return (
      <div className="flex-grow grid grid-cols-2 gap-8 m-48">
        <span className="bg-white flex items-center justify-center border-black border-2">
          <Link href={{pathname: '/archive', query: {open: true}}}><a>Spring 2020</a></Link>
        </span>
        <span className="line-through bg-white text-gray-400 flex items-center justify-center border-black border-2">Previous Studios</span>
        <span className="line-through bg-white text-gray-400 flex items-center justify-center border-black border-2">Media & Bibliography</span>
        <span className="bg-white flex items-center justify-center border-black border-2">
          <Link href={{pathname: '/who'}}><a>Who</a></Link>
        </span>
      </div>
    )
  }
}

Index.Layout = LandingLayout

export default Index;