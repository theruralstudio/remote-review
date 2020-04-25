import React, { useEffect, useState, useCallback } from 'react'

import { logDailyEvent } from './logUtils'
import Call from './Call'
import StartButton from './StartButton'
import Tray from './Tray'

// const STATE_IDLE = 'STATE_IDLE'
// const STATE_JOINING = 'STATE_JOINING'
// const STATE_JOINED = 'STATE_JOINED'
// const STATE_LEAVING = 'STATE_LEAVING'
// const STATE_ERROR = 'STATE_ERROR'

export default function LiveVideo({appState, setAppState, callObject, setCallObject}) {
  // const [roomUrl, setRoomUrl] = useState('https://ccsr.daily.co/rural-studio')

  // watch for meeting state changes
  useEffect(() => {
    // if (!callObject) return

    // const events = ['joined-meeting', 'left-meeting', 'error']

    // function handleNewMeetingState(event) {
    //   event && logDailyEvent(event)
    //   switch (callObject.meetingState()) {
    //     case 'joined-meeting':
    //       setAppState(STATE_JOINED)
    //       break
    //     case 'left-meeting':
    //       callObject.destroy().then(() => {
    //         setRoomUrl(null)
    //         setCallObject(null)
    //         setAppState(STATE_IDLE)
    //       })
    //       break
    //     case 'error':
    //       setAppState(STATE_ERROR)
    //       break
    //     default:
    //       break
    //   }
    // }

    // // Use initial state
    // handleNewMeetingState()

    // // Listen for changes in state
    // for (const event of events) {
    //   callObject.on(event, handleNewMeetingState)
    // }

    // // Stop listening for changes in state
    // return function cleanup() {
    //   for (const event of events) {
    //     callObject.off(event, handleNewMeetingState)
    //   }
    // }
  }, [callObject])

  // Show the call UI if we're either joining, already joined, or are showing an error.
  const showCall = ['STATE_JOINING', 'STATE_JOINED', 'STATE_ERROR'].includes(appState)

  // Enable the call buttons (camera toggle, leave call, etc.) if we're joined or if we've errored out.
  const enableCallButtons = ['STATE_JOINED', 'STATE_ERROR'].includes(appState)

  // Enable the start button if we're in an idle state (i.e. not creating, joining, etc.).
  const enableStartButton = appState === 'STATE_IDLE'

  return (
    <div className='flex-grow flex flex-col h-full'>
      {showCall ? (
        <div>
          <Call />
          <Tray
            disabled={!enableCallButtons}
            // onClickLeaveCall={startLeavingCall}
          />
        </div>
      ) : (
        <div>no call</div>
        // <StartButton
        //   disabled={!enableStartButton}
        //   onClick={() => {
        //     startJoiningCall(roomUrl)
        //   }}
        // />
      )}
    </div>
  )
}
