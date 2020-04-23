import React, { useState, useEffect, useContext } from 'react';

// NEXT COMPONENTS
import { useRouter } from 'next/router';
import App from 'next/app'

// STYLE (TAILWIND)
import '../styles/main.css'

// FIREBASE
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'

// LAYOUTS
import BasicLayout from '../layouts/BasicLayout'

// COMPONENTS
import ReviewFrame from '../components/ReviewFrame'

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter()

  const [user, setUser] = useState({ name: 'Anonymous', style: { color: '#000000', background: '#ffffff', border: `2px solid #000000`,} });
  const [userCount, setUserCount] = useState(0);
  const [view, setView] = useState('table') // if view isn't provided in link, won't work
  const [open, setOpen] = useState(true) 
  const [streamUrl, setStreamUrl] = useState('https://www.youtube.com/watch?v=Q47u0B_Fqjs');
  
  // depending on "open" and "view" router params
  // render the right page layout
  return (
    <BasicLayout>
      <div className="flex w-full h-full p-4">
        <div className="flex flex-grow -mx-2">
          <div className={`flex ${open ? 'w-2/5' : 'w-full'} px-2`}>
            <div className="flex-grow bg-white border-2 border-black">
              {/* { children } */}
              <Component {...pageProps}/>
            </div>
          </div>
          { open == true && <ReviewFrame view={view} setView={setView} user={user} setUser={setUser} url={streamUrl}/> }
        </div>
      </div>  
    </BasicLayout>
  )
}
