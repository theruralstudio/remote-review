import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router';
import DailyIframe from '@daily-co/daily-js'

import CallObjectContext from './LiveVideo/CallObjectContext'

import NavPublic from '../components/ReviewUI/NavPublic'
import VisibilityToggles from '../components/ReviewUI/VisibilityToggles'
import RegisterPanel from '../components/RegisterPanel'
import TablePanel from '../components/Table/TablePanel'
import UserStatus from '../components/ReviewUI/UserStatus'
import ChatInput from '../components/Chat/ChatInput'
import ChatMessages from '../components/Chat/ChatMessages'
import Instructions from '../components/ReviewUI/Instructions'

// load video panel client-side only
const LiveVideoNoSSR = dynamic(() => import('./LiveVideo/LiveVideo'), {
  ssr: false
}) 

class ReviewFrame extends Component {
  // {user, setUser, view, setView}
  constructor(props) {
    super(props)
    this.state = {
      appState: 'STATE_IDLE', // rename to callState
      callObject: null,
      roomUrl: process.env.dailyCoRoom, // make this an env variable?
      showRegister: false,
      showVideo: true,
      showChat: true,
    }
    this.handleNewMeetingState = this.handleNewMeetingState.bind(this)
  }
  // const [appState, setAppState] = useState(STATE_IDLE)
  // const [callObject, setCallObject] = useState(null)

  // get a meeting token w current user-name
  // https://docs.daily.co/reference#create-meeting-token

  // toggleRegister = () => {
  //   this.setState({
  //     showRegister: !this.state.showRegister
  //   })
  // }

  toggleInstructions = () => {
    // console.log(this.props.user)
    this.props.setUser({
      ...this.props.user,
      ...{ instructed: !this.props.user.instructed }
    })
  }

  toggleVideo = () => {
    this.setState({
      showVideo: !this.state.showVideo
    })
  }

  toggleChat = () => {
    this.setState({
      showChat: !this.state.showChat
    })
  }

  startCall = () => {
    // const newCallObject = DailyIframe.createCallObject()
    // const events = ['joined-meeting', 'left-meeting', 'error']

    // // add new call object to state
    // this.setState({
    //   callObject: newCallObject,
    //   appState: 'STATE_JOINING'
    // })

    // // to-do: get token before join
    // newCallObject.join({ url: this.state.roomUrl }).then(() => {
    //   // what does this do?
    //   this.handleNewMeetingState()
    //   // creat event listeners for the call object?
    //   for (const event of events) {
    //     this.state.callObject.on(event, this.handleNewMeetingState)
    //   }  
    // })
  }

  // join the call on mount
  componentDidMount() {
    //reroute to registration page if not registered
    if (!this.props.user.registered) {
      this.props.router.push('/register')
    } else {
      this.startCall()
    }
  }

  handleNewMeetingState(e) {
    if (!this.state.callObject) return

    // console.log(e)
    // event && logDailyEvent(event)
    switch (this.state.callObject.meetingState()) {
    // switch (e.action) {
      case 'joined-meeting':
          this.setState({appState: 'STATE_JOINED'})
          break
      case 'left-meeting':
        this.state.callObject.destroy().then(() => {
          this.setState({
            appState: 'STATE_IDLE',
            callObject: null,
          })
          // setRoomUrl(null)
          // setCallObject(null)
          // setAppState(STATE_IDLE)
        })
        break
      case 'error':
        this.setState({appState: 'STATE_ERROR'})
        break
      default:
        break
    }
  }

  // leave the call on unmount
  componentWillUnmount() {
    if (!this.state.callObject) return

    // Stop listening for changes in state
    // return function cleanup() {
    // }   

    // for (const event of events) {
    //   callObject.off(event, this.handleNewMeetingState)
    // }

    this.setState({appState: 'STATE_LEAVING'})
    this.state.callObject.leave()
    this.state.callObject.destroy()
  }

  render() {
    if (!this.props.user.registered) {
      return null
    } else {
      return (
        <div id="review-frame-full" className='flex-grow flex flex-col relative'>
          {/* <CallObjectContext.Provider value={this.state.callObject}> */}
            {/* { this.state.showRegister && <RegisterPanel currentUser={this.props.user} setUser={this.props.setUser} toggleRegister={this.toggleRegister}/> } */}
            {/* { this.state.showChat && <ChatMessages currentUser={this.props.user}/> } */}
            {/* { this.state.showChat && <ChatInput currentUser={this.props.user}/> } */}
            {/* <VisibilityToggles toggleInstructions={this.toggleInstructions} showVideo={this.state.showVideo} toggleVideo={this.toggleVideo} showChat={this.state.showChat} toggleChat={this.toggleChat}/> */}
            {/* <UserStatus user={this.props.user} numUsers={0} toggleRegister={this.toggleRegister}/> */}
            {/* <LiveVideoNoSSR currentUser={this.props.user} appState={this.state.appState} callObject={this.state.callObject} showVideo={this.state.showVideo}/> */}
            <div className="absolute flex-grow w-full h-full flex justify-center items-center text-2xl text-gray-400 opacity-25 pointer-events-none select-none z-0">⌖</div>
            <TablePanel currentUser={this.props.user} />
            {/* { !this.props.user.instructed && <Instructions toggleInstructions={this.toggleInstructions} instructed={this.props.user.instructed}/> } */}
          {/* </CallObjectContext.Provider> */}
        </div>
      )
    }
  }
}

export default withRouter(ReviewFrame)