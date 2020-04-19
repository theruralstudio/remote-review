import { useRouter } from 'next/router';
import NavPublic from '../components/NavPublic';
import NavPersonal from '../components/NavPersonal';

export default function Review(props) {

  // const router = useRouter();

  return (
    <div id="full-page">
      <div id="frame-outer">
        {props.children}
      </div>
      <style jsx>{`
        #full-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: red;
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
      `}</style>
    </div>
  );
}

