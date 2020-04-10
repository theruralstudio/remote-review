import Layout from '../layouts/Layout';
import ReactPlayer from 'react-player';

export default function Twitch() {
  return (
    <div>
      <Layout>
        <ReactPlayer url={'https://www.twitch.tv/ontariobirdcam'} playing />
      </Layout>
    </div>
  );
}