import { useRouter } from 'next/router';
import Nav from '../components/Nav';

export default function Layout(props) {

  const router = useRouter();

  return (
    <div id="full-page">
      <div id="frame-outer">
        <div id="frame-left">
          {props.Right}
        </div>
        <div id="frame-right">
          {props.children}
        </div>
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
          justify-content: space-between;
          flex-direction: row;
          flex-grow: 1;
          padding: 1em;
          padding-bottom: 2em;
          padding-right: 0em;
          overflow: hidden;
        }

        #frame-left {
          border: 2px solid red;
          flex-grow: 1;
        }

        #frame-right {
          border: 2px solid blue;
          flex-grow: 1;
          position: relative;
          top: 1em;
          left: -1em;
          background: white;
        }

      `}</style>
    </div>
  );
}

