import App from 'next/app'
import Firebase, { FirebaseContext, withFirebase } from '../components/Firebase';
import Layout from '../layouts/Layout';
import NavPersonal from '../components/NavPersonal';
import ChatPanel from '../components/ChatPanel';
import RegisterPanel from '../components/RegisterPanel';
import LiveVideo from '../components/LiveVideo';
import TablePanel from '../components/TablePanel';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: 2,
      currentUser: {
        name: '',
        style: {},
      }
    }

    this.handleUpdate = this.handleUpdate.bind(this);
  };

  handleUpdate(o) {
    this.setState(o);
  };

  componentWillUnmount() {
    //this.props.firebase.messages().off();
  };

  render() {
    const { Component, pageProps } = this.props
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <Layout 
          numUsers={this.state.numUsers} 
          currentUser={this.state.currentUser}
          Right={ 
            // <ChatPanel currentUser={this.state.currentUser}/>
            // <RegisterPanel currentUser={this.state.currentUser}/>
            <TablePanel />
            // <LiveVideo currentUser={this.state.currentUser} />
          }
          >
          <Component 
            {...pageProps}
            numUsers={this.state.numUsers}
            handleUpdate={this.handleUpdate}
            currentUser={this.state.currentUser}
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
      </FirebaseContext.Provider>
    )
  }
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

export default withFirebase(MyApp)