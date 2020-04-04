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
    </div>
  );
}

