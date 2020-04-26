import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useList } from 'react-firebase-hooks/database'
import tinycolor from 'tinycolor2'

export default function RegisterPanel(props) {
  const participantKeys = {
    [process.env.loginKeyModerator]: 'moderator',
    [process.env.loginKeyParticipant]: 'participant',
    [process.env.loginKeyGuest]: 'guest'
  }

  const [name, setName] = useState('')
  const [entryCode, setEntryCode] = useState('')

  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('users')

  const handleSubmit = (e) => {
    e.preventDefault();

    // register user in db if the key matches any
    if ( participantKeys[entryCode] ) {
      console.log(participantKeys[entryCode])
      
      // randomly create color pair
      const rand = Math.random() * 360;
      const fg = tinycolor({h: rand, s: 1, l: 0.25});
      const bg = tinycolor({h: rand, s: 1, l: 0.75});

      const style = {
        color: fg.toHexString(),
        background: bg.toHexString(),
        border: `2px solid ${fg.toHexString()}`,
      };

      // push to firebase
      ref.push({
        name: name,
        style: style
      });

      // pass state back up
      props.setUser({
        name: name,
        style: style
      });

    } else {
      // console.log("couldn't sign you in");
    };

    // then clear state/ add active user
    setName(null)
    setEntryCode(null)

    // and toggle visibility again
    props.toggleRegister()
    // props.setView('table')
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.props.firebase.users().on('value', snapshot => {
  //     // console.log(snapshot);
  //   });
  // };

  return (
    <div className="self-center flex-grow flex flex-col justify-center items-center w-full h-full relative pointer-events-none">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 pointer-events-auto">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className='block text-black md:text-right mb-1 md:mb-0 pr-4' htmlFor="name-input">
              Your Name:
            </label>
          </div>
          <div className="md:w-2/3">
            <input className='appearance-none border-b-2 border-black w-full leading-tight focus:outline-none focus:border-black'
              id="name-input"
              name="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className='md:w-1/3'> 
            <label className='block text-black md:text-right mb-1 md:mb-0 pr-4' htmlFor='code-input'>
              Entry Code:
            </label>
          </div>
          <div>
            <input className='appearance-none border-b-2 border-black w-full leading-tight focus:outline-none focus:border-black'
              id="code-input"
              name="entrycode" 
              type="text" 
              value={entryCode} 
              onChange={(e) => setEntryCode(e.target.value)} 
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="link focus:outline-none py-2" type="submit" value="Register">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}