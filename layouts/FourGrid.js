import { useRouter } from 'next/router';
import NavPublic from '../components/NavPublic';
import NavPersonal from '../components/NavPersonal';

export default function FourGrid(props) {

  // const router = useRouter();

  return (
    <div id="full-page" className="bg-gray-200">
      <div id="nav-outer">
        <div className="column">
          <div className="nav-button">Search</div>
          <div className="nav-button">Estudio Herreros</div>
        </div>
        <div className="column right">
          <div className="nav-button">Lang</div>
          <div className="nav-button">Contact</div>
        </div>
      </div>
      <div id="frame-outer">
        <div id="cells">
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
          position: relative;
        }

        #nav-outer {
          position: absolute; 
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
        }
        
        .nav-button {
          padding: 1em;
        }

        .column {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .right {
          align-items: flex-end;
        }

        #cells {
          margin: 5em;
        }
      `}</style>
    </div>
  );
}

