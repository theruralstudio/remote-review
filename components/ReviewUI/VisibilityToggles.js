import React, { useContext, useEffect, useState } from "react"

export default function VisibilityToggles({showVideo, toggleVideo, showChat, toggleChat, instructed, toggleInstructions}) {

  return (
    <div className="absolute top-0 right-0 flex flex-col m-2 justify-start items-end z-10">
      { !instructed && 
        <div className="blinking bg-white rounded-full p-2 mb-2 cursor-pointer">
          <div onClick={toggleInstructions}>Instructions</div>
        </div>  
      }
      <div className="bg-white rounded-full p-2 mb-2 cursor-pointer">
        <div onClick={toggleVideo}>{showVideo ? 'Hide Video Call' : 'Show Video Call'}</div>
      </div>  
      <div className="bg-white rounded-full p-2 mb-2 cursor-pointer">
        <div onClick={toggleChat}>{showChat ? 'Hide Chat' : 'Show Chat'}</div>
      </div>   
      {/* <style jsx>{`
        .blinking{
          animation:blinkingBorder 1.5s linear infinite;
        }
        @keyframes blinkingBorder{
            0%{ border: 2px solid lime;  }
            50%{ border: 2px solid white; }
            100%{ border: 2px solid lime;  }
        }
      `}</style>        */}
    </div>
  )
}