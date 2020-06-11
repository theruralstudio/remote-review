import React, { createContext } from 'react'
import app from 'firebase/app'

// create context
const FirebaseContext = createContext(null)
export { FirebaseContext }

// initialize firebase and create a wrapper component
// to provide firebase context everywhere in react
export default ({ children }) => {
  // get config from env variables
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASEDATABASEURL,
    projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASESTORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASEMESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASEAPPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASEMEASUREMENTID,
  }

  if (!app.apps.length) {
    app.initializeApp(firebaseConfig)
  }

  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )
}
