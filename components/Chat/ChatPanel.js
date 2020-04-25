// import React, { useContext, useState } from 'react';
// import ChatInput from './ChatInput';
// import { FirebaseContext } from '../utils/firebase'
// import 'firebase/database'
// import { useListVals } from 'react-firebase-hooks/database'
// import UserCount from '../components/UserCount'

// function ChatPanel(props) {

//   // firebase
//   const firebase = useContext(FirebaseContext)
//   const ref = firebase.database().ref('messages')
//   const [messages, loading, error] = useListVals(ref)
//   const [messageOut, setMessageOut] = useState('')

//   const sendMessage = () => {
//     ref.push({
//       user: props.currentUser.name,
//       style: props.currentUser.style,
//       body: messageOut,
//     });
//     setMessageOut('') // clear the input
//   }

//   return (
//     <div id="chatWrapper">
//       <div id="chatMessages">
//         {messages.map(m => (
//           <div key={m.uuid} className={ (m.user == props.currentUser.name ) ? 'chatMessage right' : 'chatMessage'  } style={m.style}>
//             <div className="chatMessageUserName">{m.user}</div>
//             {m.body}
//           </div>
//         ))}
//       </div>
//       <ChatInput messageOut={messageOut} setMessageOut={setMessageOut} sendMessage={sendMessage} />
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
//     </div>
//   )
// }

// export default ChatPanel;
