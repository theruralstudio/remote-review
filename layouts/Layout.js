import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import Chat from '../components/Chat';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

export default function Layout(props) {
  const router = useRouter();

  return (
    <div style={layoutStyle}>
      <Nav />
      {props.children}
      <p>Your userkey is {router.query.userkey}</p>
      <p>Your access code is {router.query.accesscode}</p>
      <Chat />
      <style jsx global>{`
        html, body {
          font-family: 'Arial';
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

