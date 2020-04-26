import React, { useContext, useEffect, useState } from "react"

export default function VisibilityToggles({showVideo, toggleVideo, showChat, toggleChat}) {

  return (
    <div className="absolute top-0 right-0 flex flex-col m-2 justify-start items-end z-10">
      <div className="bg-white rounded-full p-2 mb-2 cursor-pointer">
        <div onClick={toggleVideo}>{showVideo ? 'Hide Video' : 'Show Video'}</div>
      </div>  
      <div className="bg-white rounded-full p-2 mb-2 cursor-pointer">
        <div onClick={toggleChat}>{showChat ? 'Hide Chat' : 'Show Chat'}</div>
      </div>          
    </div>
  )
}