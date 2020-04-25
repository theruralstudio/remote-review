import React, { useState, useEffect, useContext } from 'react';

// NEXT COMPONENTS
import { useRouter } from 'next/router';
import App from 'next/app'

// STYLE (TAILWIND)
import '../styles/main.css'

// FIREBASE
// import { FirebaseContext } from '../utils/firebase'
// import 'firebase/database'
// import { useListVals } from 'react-firebase-hooks/database'

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
      view: 'stream',
      open: true,
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
    const reviewChildren = this.state.open == true && <ReviewFrame view={this.state.view} setView={this.setView} user={this.state.user} setUser={this.setUser} />

    return (
      <Layout open={this.state.open} view={this.state.view} reviewChildren={reviewChildren} user={this.state.user}>
        <Component {...pageProps}/>
      </Layout>
    )
    // }
  }
}

export default MyApp