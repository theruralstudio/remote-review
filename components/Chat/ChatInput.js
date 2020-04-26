import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../utils/firebase'
import 'firebase/database'
import { useListVals } from 'react-firebase-hooks/database'

export default function ChatInput(props) {

    // firebase
    const firebase = useContext(FirebaseContext)
    const ref = firebase.database().ref('messages')
    const imgref = firebase.database().ref('images')
    const [messages, loading, error] = useListVals(ref)
    const [messageOut, setMessageOut] = useState('')
  
    // handle chat commands and outgoing messages
    const sendMessage = () => {
      if (messageOut == 'CLEARCHAT') {
        ref.remove();
      } else if (messageOut == 'CLEARTABLE') {
        imgref.remove();
      } else {
        ref.push({
          user: props.currentUser.name,
          style: props.currentUser.style,
          body: messageOut,
        });
      }
      setMessageOut('') // clear the input
    }

    // constructor(props) {
    //   super(props);
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    // };

    const handleChange = (e) => {
      setMessageOut(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      sendMessage();
    }

    return (
      <div className='absolute bottom-0 right-0 m-2 z-10'>
        <form autoComplete="off" id="chat-form" className='flex justify-between' onSubmit={handleSubmit}>
          <input id="text-input"
            className="rounded-l-full p-2 pl-4"
            type="text" 
            value={messageOut}
            onChange={handleChange}
            autoFocus
            placeholder="Type to chat..."
          />
          <input id="send-button" className='rounded-r-full p-2 pr-4' type="submit" value="Send" />
        </form>
        <style jsx>{`
          input:focus {
            outline: 0 solid transparent;
          }

          #send-button {
            background: lime;
          }
        `}</style>
      </div>
    )
}