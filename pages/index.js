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
        <div>Spring 2020</div>
        <div>Previous Studios</div>
        <div>Media & Bibliography</div>
        <div>Who</div>
        <style jsx>{`
        p,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }    
      `}</style>   
      </FourGrid>
    )
  }
}

export default Index;