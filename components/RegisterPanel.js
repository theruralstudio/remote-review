import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../utils/firebase'
import UserContext from '../utils/usercontext'
import tinycolor from 'tinycolor2'
import 'firebase/database'

export default function RegisterPanel(props) {
  const participantKeys = {
    [process.env.NEXT_PUBLIC_LOGINKEYPARTICIPANT]: 'participant',
    [process.env.NEXT_PUBLIC_LOGINKEYMODERATOR]: 'moderator',
    [process.env.NEXT_PUBLIC_LOGINKEYGUEST]: 'guest'
  }
  const router = useRouter()
  const [name, setName] = useState('')
  const [entryCode, setEntryCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('users')

  // local user
  const {user, setUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    // register user in db if the key matches any
    if ( participantKeys[entryCode] ) {
      // console.log(participantKeys[entryCode])
      
      // randomly create color pair
      const rand = Math.random() * 360;
      const fg = tinycolor({h: rand, s: 1, l: 0.25});
      const bg = tinycolor({h: rand, s: 1, l: 0.75});

      const style = {
        color: fg.toHexString(),
        background: bg.toHexString(),
        // border: `2px solid ${fg.toHexString()}`,
      };

      // push to firebase
      ref.push({
        name: name,
        style: style
      });

      // pass state back up thru context
      setUser({
        name: name,
        style: style,
        registered: true,
        instructed: true
      });

      // reroute to archive again
      router.push('/archive')
    } else {
      setErrorMsg('Sorry, couldn\'t sign you in, check your entry code.')
      // console.log("couldn't sign you in");
    };

    // then clear input state/ add active user
    setName('')
    setEntryCode('')

    // and toggle visibility again
    // props.toggleRegister()
    // props.setView('table')
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.props.firebase.users().on('value', snapshot => {
  //     // console.log(snapshot);
  //   });
  // };

  return (
    <div className="self-center flex-grow flex flex-col justify-center items-center w-full h-full relative">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">

        { errorMsg &&
          <div className="w-full max-w-sm bg-red-300 text-red-800 p-8 mb-4">
            {errorMsg}
          </div>        
        }



        <div className="w-full max-w-sm bg-white p-8 border-2 border-black">
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
        </div>
        <button className="link bg-white focus:outline-none p-2 px-3 mt-4 rounded-full border-2 border-black cursor-pointer" type="submit" value="Register">
          Register
        </button>
      </form>
    </div>
  )
}