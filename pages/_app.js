import React, { useState, useEffect, useContext, createContext } from 'react';

// NEXT COMPONENTS
import App from 'next/app'

// STYLE (TAILWIND)
import '../styles/main.css'

// FIREBASE
// import { FirebaseContext } from '../utils/firebase'
// import 'firebase/database'
// import { useListVals } from 'react-firebase-hooks/database'
import UserContext from '../utils/usercontext'

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
        },
        registered: false
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

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  componentDidMount() {
    // reroute to registration page if not registered and path contains 'archive'
    // console.log(this.props.router.pathname)
    // if (!this.state.user.registered && this.props.router.pathname.includes('archive')) {
    //   this.props.router.push('/register')
    // }
  }

  render() {
    const { Component, pageProps } = this.props
    const Layout = Component.Layout || Noop
    const reviewChildren = <ReviewFrame toggleOpen={this.toggleOpen} open={this.state.open} view={this.state.view} setView={this.setView} user={this.state.user} setUser={this.setUser} />
    return (
      <Layout toggleOpen={this.toggleOpen} open={this.state.open} view={this.state.view} reviewChildren={reviewChildren} user={this.state.user} setUser={this.setUser} >
        <UserContext.Provider value={{ user: this.state.user, setUser: this.setUser }}>
          <Component {...pageProps} toggleOpen={this.toggleOpen} open={this.state.open} />
        </UserContext.Provider>
      </Layout>
    )
  }
}

export default MyApp