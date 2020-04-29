import React from 'react'

export default function ProjectMinimal({toggleOpen}) {

  console.log(toggleOpen)
  return (
    <div className="absolute bottom-0 left-0 flex flex-col justify-start items-start z-10">
      <div className="bg-white rounded-full p-2 cursor-pointer">
        <a onClick={toggleOpen}>Show Archive →</a>
      </div>
    </div>
  )
}