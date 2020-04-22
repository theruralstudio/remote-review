import React, { useContext } from 'react';
import { FirebaseContext } from '../utils/firebase'
import { useListVals } from 'react-firebase-hooks/database'
import 'firebase/database'

export default function ChatMessages({currentUser}) {

  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('messages')
  const [messages, loading, error] = useListVals(ref)

  // const usertoright = (m.user == currentUser.name ) ? ' float-right' : ''

  return (
    <div className="absolute bottom-0 left-0 m-4">
      {messages.map(m => (
        <div key={m.uuid} className={`p-2 ${m.user == currentUser.name ? 'justify-end' : ''}`} style={m.style}>
          <div className="chatMessageUserName">{m.user}</div>
          {m.body}
        </div>
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