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
      <div className='absolute bottom-0 right-0 z-10'>
        <form autoComplete="off" id="chat-form" onSubmit={handleSubmit}>
          <input id="text-input"
            type="text" 
            value={messageOut}
            onChange={handleChange}
            autoFocus
            placeholder="Type to chat..."
          />
          <input id="send-button" type="submit" value="Send" />
        </form>
        <style jsx>{`
          #chat-form {
            display: flex;
            justify-content: space-between;
          }

          #text-input {
            padding: 0.75em;
            padding-left: 1em;
            outline: 0;
            border: 2px solid black;
            border-right: none;
            border-radius: 2em 0em 0em 2em;
            -webkit-appearance: none;
            appearance: none;
            flex-grow: 2;
          }

          input:focus {
            outline: 0 solid transparent;
          }

          #send-button {
            display: block;
            background: lime;
            border: 2px solid black;
            font-weight: bold;
            padding-right: 1em;
            padding-left: 0.5em;
            border-radius: 0em 2em 2em 0em;
          }

          #send-button:active {
            background: black;
            color: white;
          }

        `}</style>
      </div>
    )
}