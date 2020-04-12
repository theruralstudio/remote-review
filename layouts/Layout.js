import { useRouter } from 'next/router';
import Nav from '../components/Nav';

export default function Layout(props) {
  const router = useRouter();

  return (
    <div id="full-page">
      <div id="frame-outer">
        <Nav />
        {props.children}
      </div>
      <style jsx>{`
        #full-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
        }

        #frame-outer {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin: 20px;
          border: 2px solid black;
        }
      `}</style>
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
    </div>
  );
}

