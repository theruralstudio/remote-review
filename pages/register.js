import React, {Component, useState, useEffect} from 'react'
import LandingLayout from '../layouts/LandingLayout'
import RegisterPanel from '../components/RegisterPanel'

function Register(props) {
  return (
    <div className="flex-grow gap-8 m-48 flex flex-col items-start">
      <RegisterPanel setUser={props.setUser}/>
    </div>
  )
}

Register.Layout = LandingLayout

export default Register;