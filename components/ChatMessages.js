import React, { useContext } from 'react';
import { FirebaseContext } from '../utils/firebase'
import { useListVals } from 'react-firebase-hooks/database'
import 'firebase/database'

function ChatMessage({message, currentUser}) {
  const m = message
  return (
    <div className={`my-2 p-2 shadow-lg ${m.user == currentUser.name ? ' self-end' : ''}`} style={m.style}>
      <div className="text-xs">{m.user}</div>
      {m.body}
    </div>
  )
}

export default function ChatMessages({currentUser}) {

  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('messages')
  const [messages, loading, error] = useListVals(ref)

  return (
    <div className="absolute flex flex-col w-full h-full justify-end items-start p-2 pb-24 pointer-events-none overflow-hidden">
      {messages.map((m, i) => (
        <ChatMessage key={i} message={m} currentUser={currentUser} />
      ))}
    </div>
  )
}

// export default ChatPanel;

//       {/* <style jsx>{`
//         #chatWrapper {
//           height: 100%;
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           flex-grow: 2;
//           overflow: hidden;
//         }

//         #chatMessages {
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           align-items: flex-start;
//           flex-grow: 2;
//           overflow: hidden;
//         }

//         .chatMessage {
//           display: block;
//           margin: 1em;
//           padding: 0.5em;
//           max-width: 60vw;
//         }

//         .right {
//           align-self: flex-end;
//         }

//         .chatMessageUserName {
//           font-size: 0.6em;
//           text-transform: uppercase;
//           margin-bottom: 0.5em;
//         }
//       `}</style> */}