import React, { createContext } from 'react'
import app from 'firebase/app'

// create context

const FirebaseContext = createContext(null)
export { FirebaseContext }

// get config from env variables

const firebaseConfig = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: process.env.FIREBASEAUTHDOMAIN,
  databaseURL: process.env.FIREBASEDATABASEURL,
  projectId: process.env.FIREBASEPROJECTID,
  storageBucket: process.env.FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
  appId: process.env.FIREBASEAPPID,
  measurementId: process.env.FIREBASEMEASUREMENTID,
}

// initialize firebase and create a wrapper component
// to provide firebase context everywhere in react

export default ({ children }) => {

  if (!app.apps.length) {
    app.initializeApp(firebaseConfig)
  }

  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )
}
