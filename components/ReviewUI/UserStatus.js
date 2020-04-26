import React, { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import CallObjectContext from "../LiveVideo/CallObjectContext"

function getStreamStates(callObject) {
  let isCameraMuted,
    isMicMuted,
    isSharingScreen = false;
  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
    isSharingScreen = localParticipant.screen;
  }
  return [isCameraMuted, isMicMuted, isSharingScreen];
}

export default function UserStatus({numUsers, user, toggleRegister}) {
  // const router = useRouter()
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isSharingScreen, setSharingScreen] = useState(false);

  function toggleCamera() {
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  // listen for participant state changes
  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState(event) {
      // event && logDailyEvent(event);
      const [isCameraMuted, isMicMuted, isSharingScreen] = getStreamStates(
        callObject
      );
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
      setSharingScreen(isSharingScreen);
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on("participant-updated", handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);  

  const isRegistered = user.name == 'Anonymous'

  return (
    <div className="absolute bottom-0 left-0 flex flex-col justify-start items-start divide divide-y-8">
      <div className="bg-white rounded-full p-2 cursor-pointer" style={user.style}>
        {isRegistered
          ? <div onClick={toggleRegister}>Click to Register</div>
          : <div>Hello, {user.name}</div>        
        }      
      </div>
      <div className="bg-white rounded-full p-2 cursor-pointer">
        <div onClick={toggleMic}>{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</div>
      </div>
      <div className="bg-white rounded-full p-2 cursor-pointer">
        <div onClick={toggleCamera}>{isCameraMuted ? 'Unmute Camera' : 'Mute Camera'}</div>
      </div>            
      {/* <div className="bg-white rounded-full m-4 p-2">{numUsers} are here</div> */}
    </div>
  )
}