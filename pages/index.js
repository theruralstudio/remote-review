import Layout from '../layouts/Layout';
import React, {Component} from 'react';
import useSWR from 'swr';
import { render } from 'react-three-fiber';
import Router from 'next/router';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

class Index extends Component {
  
  //const { data, error } = useSWR('/api/randomQuote', fetcher);

  componentDidMount() {
    const {pathname} = Router
    if(pathname == '/' ){
      Router.push('/archive')
    }
  }

  render() {
    return (
      <div>
        <div>
          <p>This component will display a landing page.</p>
          {/* <h2>a quote</h2>
          <div className="quote">{quote}</div>
          {author && <span className="author">- {author}</span>} */}
        </div>
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
      </div>
    );
  }

}

export default Index;