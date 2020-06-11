import React, { createContext } from 'react'
import app from 'firebase/app'

// create context

const FirebaseContext = createContext(null)
export { FirebaseContext }

// get config from env variables

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  databaseURL: process.env.firebaseDatabaseURL,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId,
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
