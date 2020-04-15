import Layout from '../layouts/Layout';
import LiveVideo from '../components/LiveVideo';

// playback for live stream: can be either twitch or youtube live
// chat handled separately as neither provides integrated UI for both

export default function Stream() {
  return (
    <LiveVideo url={'https://www.youtube.com/watch?v=l6LKRZn5AYM'}/>
  );
}