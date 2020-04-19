import App from 'next/app'
import React, { useState, useEffect } from 'react';
// import Firebase, { FirebaseContext, withFirebase } from '../components/Firebase';
import FirebaseProvider from '../utils/firebase';
import { useRouter } from 'next/router';
import Layout from '../layouts/Layout';
import dynamic from 'next/dynamic';

import NavPersonal from '../components/NavPersonal';
// import ChatPanel from '../components/ChatPanel';
// import RegisterPanel from '../components/RegisterPanel';
import LiveVideo from '../components/LiveVideo';

const TablePanelNoSSR = dynamic(
  () => import('../components/TablePanel'),
  { ssr: false }
)

function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const [user, setUser] = useState({ name: '', style: {} });
  const [userCount, setUserCount] = useState(2);
  const [view, setView] = useState('register');
  const [streamUrl, setStreamUrl] = useState('https://www.youtube.com/watch?v=mG9_Ey_zr6U');
  
  // get chat messages from firebase
  // const [initializing, messages] = useMessages();
  useEffect(() => {
    // do stuff to update data or other sideeffecfts

  });


  //
  const handleUpdate = o => {
    this.setState(o);
  };

  const componentWillUnmount = () => {
    //this.props.firebase.messages().off();
  };

  const viewSwitch = p => {
    switch(p) {
      case "chat":
        // return <ChatPanel currentUser={user} />;
      case "register":
        // return <RegisterPanel currentUser={user} setUser={setUser} />;
      case "stream":
        return <LiveVideo url={streamUrl} currentUser={user} />;
      case "table":
      default:
        return <TablePanelNoSSR currentUser={user} />;
    };
  }

  // app body, wrapped with FirebaseProvider
  // so databases etc are available everywhere in react

  return (
    <FirebaseProvider>
      <Layout 
        numUsers={userCount} 
        currentUser={user}
        setView={setView}
        Right={viewSwitch(router.query.view)}
        >
        <Component 
          {...pageProps}
          numUsers={userCount}
          handleUpdate={handleUpdate}
          currentUser={user}
        />
      </Layout>
      <style jsx global>{`
      html, body {
        font-family: 'Arial';
        margin: 0px;
        padding: 0px;
      }

      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
    </FirebaseProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp