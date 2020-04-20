import { useRouter } from 'next/router';
import NavPublic from '../components/NavPublic';
import NavPersonal from '../components/NavPersonal';


export default function FourGrid(props) {

  // const router = useRouter();

  return (
    <div className="bg-gray-200 w-full h-full">
      <div id="frame-outer" className="flex-row justify-between w-full h-full p-20">
        {props.children}
      </div>
      <div id="nav-outer">
        <div className="column">
          <div className="nav-button">Search</div>
          <a className="nav-button" href={'http://estudioherreros.com/en/'}>estudio Herreros</a>
        </div>
        <div className="column right">
          <div className="nav-button">Lang</div>
          <div className="nav-button">Contact</div>
        </div>
      </div>
      {/* <style jsx>{`
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
      `}</style> */}
    </div>
  );
}

