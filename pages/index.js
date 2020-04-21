import Layout from '../layouts/Layout'
import React, {Component} from 'react'
import useSWR from 'swr'
import { render } from 'react-three-fiber'
import Router from 'next/router'
import FourGrid from '../layouts/FourGrid'

// function fetcher(url) {
//   return fetch(url).then(r => r.json());
// }

class Index extends Component {
  
  //const { data, error } = useSWR('/api/randomQuote', fetcher);

  // componentDidMount() {
  //   const {pathname} = Router
  //   if(pathname == '/' ){
  //     Router.push('/archive')
  //   }
  // }

  render() {
    return (
      <div className="flex bg-gray-200 w-full h-full">
        <div className="flex flex-col flex-grow items-stretch m-20">
          <div className="flex flex-grow items-stretch">
            <span className="flex-grow flex items-center justify-center m-5 border-black border-2">Spring 2020</span>
            <span className="flex-grow flex items-center justify-center m-5 border-black border-2">Previous Studios</span>
          </div>
          <div className="flex flex-grow items-stretch">
            <span className="flex-grow flex items-center justify-center m-5 border-black border-2">Media & Bibliography</span>
            <span className="flex-grow flex items-center justify-center m-5 border-black border-2">Who</span>
          </div>
        </div>
        <div>
            <div className="fixed top-0 left-0 m-2">Search</div>
            <div>
              <a className="fixed bottom-0 left-0 m-2" href={'http://estudioherreros.com/en/'}>estudio Herreros</a>
            </div>
            <div className="fixed top-0 right-0 m-2">Lang</div>
            <div className="fixed bottom-0 right-0 m-2">Contact</div>
        </div>
      </div>
    )
  }
}

export default Index;