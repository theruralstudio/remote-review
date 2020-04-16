import { useRouter } from 'next/router';
import Nav from '../components/Nav';

export default function Layout(props) {

  const router = useRouter();

  return (
    <div id="full-page">
      <div id="frame-outer">
        <Nav numUsers={props.numUsers} currentUser={props.currentUser}/>
        {props.children}

      </div>
      <style jsx>{`
        #full-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        #frame-outer {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin: 20px;
          border: 2px solid black;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

