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
      <FourGrid >
        <div className="flex-grow bg-blue-400">
          <div className="w-1/2 m-4 p-4 flex justify-center content-center border-black border-2">Spring 2020</div>
          <div className="w-1/2 m-4 p-4 flex justify-center content-center border border-black border-4">Previous Studios</div>
        </div>
        <div className="flex-grow bg-green-400">
          <div className="w-1/2 m-4 p-4 flex justify-center content-center border border-black border-4">Media & Bibliography</div>
          <div className="w-1/2 m-4 p-4 flex justify-center content-center border border-black border-4">Who</div>
        </div>
      </FourGrid>
    )
  }
}

export default Index;