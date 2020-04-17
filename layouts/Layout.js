import { useRouter } from 'next/router';
import NavPublic from '../components/NavPublic';
import NavPersonal from '../components/NavPersonal';

export default function Layout(props) {

  const router = useRouter();

  return (
    <div id="full-page">
      <div id="frame-outer">
        <div id="frame-left">
          <NavPersonal currentUser={props.currentUser}/>
          {props.children}
        </div>
        <div id="frame-right">
          <NavPublic />
          <div id="user-count">{props.numUsers} are here</div>
          {props.Right}
        </div>
      </div>
      <style jsx>{`
        #user-count {
          color: white;
          background: blue;
          margin: 0.5em;
          padding: 0.5em;
          align-self: flex-start;
          border-radius: 1em;
        }

        #full-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        #frame-outer {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          flex-grow: 1;
          padding: 1em;
          padding-bottom: 2em;
          padding-right: 0em;
          overflow: hidden;
        }

        #frame-left {
          display: flex;
          flex-direction: column;
          border: 2px solid red;
          min-width: 33vw;
        }

        #frame-right {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 2px solid blue;
          position: relative;
          top: 1em;
          left: -1em;
          background: white;
        }

      `}</style>
    </div>
  );
}

