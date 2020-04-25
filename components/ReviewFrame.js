import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import DailyIframe from '@daily-co/daily-js'

import CallObjectContext from './LiveVideo/CallObjectContext'

import NavPublic from '../components/ReviewUI/NavPublic'
import RegisterPanel from '../components/RegisterPanel'
import TablePanel from '../components/Table/TablePanel'

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
      roomUrl: 'https://ccsr.daily.co/rural-studio', // make this an env variable?
    }
    this.handleNewMeetingState = this.handleNewMeetingState.bind(this)
  }
  // const [appState, setAppState] = useState(STATE_IDLE)
  // const [callObject, setCallObject] = useState(null)
  // const roomUrl = 'https://ccsr.daily.co/rural-studio'

  // get a meeting token w current user-name
  // https://docs.daily.co/reference#create-meeting-token

  // join the call on mount
  componentDidMount() {
    // if (!this.state.callObject) return

    const newCallObject = DailyIframe.createCallObject()
    const events = ['joined-meeting', 'left-meeting', 'error']

    // add new call object to state
    this.setState({
      callObject: newCallObject,
      appState: 'STATE_JOINING'
    })

    // to-do: get token before join
    newCallObject.join({ url: this.state.roomUrl }).then(() => {
      // what does this do?
      this.handleNewMeetingState()
      // creat event listeners for the call object?
      for (const event of events) {
        this.state.callObject.on(event, this.handleNewMeetingState)
      }  
    })
  }
  // const startJoiningCall = useCallback(url => {
  //   const newCallObject = DailyIframe.createCallObject()
  //   setRoomUrl(url)
  //   setCallObject(newCallObject)
  //   setAppState(STATE_JOINING)
  //   newCallObject.join({ url }) // and then use the token when joining here
  // }, [])

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


  // watch for changes to call state etc. on update
  componentDidUpdate() {
    // if (!this.state.callObject) return



 
  }

  // leave the call on unmount
  componentWillUnmount() {
    if (!this.state.callObject) return

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, this.handleNewMeetingState)
      }
    }   

    this.setState({appState: 'STATE_LEAVING'})
    //setAppState('STATE_LEAVING')
    this.state.callObject.leave()
  }
  // const startLeavingCall = useCallback(() => {
  //   if (!callObject) return
  //   setAppState(STATE_LEAVING)
  //   callObject.leave()
  // }, [callObject])

  render() {
    const reviewPanel = {
      'register': <RegisterPanel currentUser={this.props.user} setUser={this.props.setUser} setView={this.props.setView}/>,
      'stream': <LiveVideoNoSSR 
                  currentUser={this.props.user} 
                  setView={this.props.setView} 
                  appState={this.state.appState} 
                  // setAppState={this.props.setAppState} 
                  callObject={this.state.callObject} 
                  // setCallObject={this.props.setCallObject}
                />,
      'table': <TablePanel currentUser={this.props.user} setView={this.props.setView} />,
    }

    return (
      <div className='flex flex-grow px-2 h-full'>
        <div className='flex-grow flex flex-col relative'>
          <CallObjectContext.Provider value={this.state.callObject}>
            { reviewPanel[this.props.view] }
          </CallObjectContext.Provider>
          <NavPublic view={this.props.view} setView={this.props.setView}/>
        </div>
      </div>    
    )
  }
}

export default ReviewFrame