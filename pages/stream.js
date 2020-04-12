import Layout from '../layouts/Layout';
import LiveVideo from '../components/LiveVideo';

// playback for live stream: can be either twitch or youtube live
// chat handled separately as neither provides integrated UI for both

export default function Stream() {
  return (
    <div>
      <Layout>
        <LiveVideo url={'https://www.twitch.tv/ontariobirdcam'}/>
        {/* <LiveVideo url={'https://www.youtube.com/watch?v=5qap5aO4i9A'}/> */}
      </Layout>
    </div>
  );
}