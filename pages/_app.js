import App from 'next/app'
import Firebase, { FirebaseContext } from '../components/Firebase';
import Layout from '../layouts/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
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

export default MyApp