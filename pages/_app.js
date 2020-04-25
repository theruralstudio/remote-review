import React, { useState, useEffect, useContext } from 'react';

// NEXT COMPONENTS
import { useRouter } from 'next/router';
import App from 'next/app'

// STYLE (TAILWIND)
import '../styles/main.css'

// FIREBASE
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'

// LAYOUTS
// import BasicLayout from '../layouts/BasicLayout'

// COMPONENTS
import ReviewFrame from '../components/ReviewFrame'

// not clear what this does?
const Noop = ({children}) => children

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      user: { 
        name: 'Anonymous', 
        style: { 
          color: '#000000', 
          background: '#ffffff', 
          border: `2px solid #000000`,
        }
      },
      view: 'table',
      open: true,
      // streamurl: 'https://www.youtube.com/watch?v=YO67a5UvX9k',
    }
  }

  setView = (v) => {
    this.setState({view: v})
  }

  setUser = (v) => {
    this.setState({user: v})    
  }


  render() {
    const { Component, pageProps } = this.props
    const Layout = Component.Layout || Noop

    // const router = useRouter()
  
    // const [user, setUser] = useState({ name: 'Anonymous', style: { color: '#000000', background: '#ffffff', border: `2px solid #000000`,} });
    // const [userCount, setUserCount] = useState(0);
    // const [view, setView] = useState('table') // if view isn't provided in link, won't work
    // const [open, setOpen] = useState(true) 
    // const [streamUrl, setStreamUrl] = useState('https://www.youtube.com/watch?v=YO67a5UvX9k');
    // FINAL REVIEW: 'https://www.youtube.com/watch?v=Zoe3zSEIAl8'
  
    // depending on "open" and "view" router params
    // render the right page layout
    // if (router.pathname == '/' ) {
    //   return (
    //     <Layout>
    //       <div className="flex w-full h-full p-4">
    //         <div className="flex flex-grow -mx-2">
    //           <div className={`flex w-full px-2`}>
    //             <div className="flex-grow">
    //               <Component {...pageProps}/>
    //             </div>
    //           </div>
    //         </div>
    //       </div>  
    //     </Layout>      
    //   )
    // } else {
    const reviewChildren = this.state.open == true && <ReviewFrame view={this.state.view} setView={this.setView} user={this.state.user} setUser={this.setUser} />

    return (
      <Layout open={this.state.open} view={this.state.view} reviewChildren={reviewChildren}>
        <Component {...pageProps}/>
      </Layout>
    )
    // }
  }
}

export default MyApp