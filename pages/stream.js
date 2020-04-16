import Layout from '../layouts/Layout';
import LiveVideo from '../components/LiveVideo';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

// playback for live stream: can be either twitch or youtube live
// chat handled separately as neither provides integrated UI for both

export default function Stream(props) {
  return (
    <LiveVideo url={'https://www.youtube.com/watch?v=l6LKRZn5AYM'} currentUser={props.currentUser}/>
  );
}