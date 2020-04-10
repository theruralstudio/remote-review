import Layout from '../layouts/Layout';
// import TwitchViewer from '../components/TwitchViewer';
import ReactPlayer from 'react-player';


export default function YouTube() {
  return (
    <div>
      <Layout>
        <ReactPlayer url="https://www.youtube.com/watch?v=5qap5aO4i9A" playing />
      </Layout>
    </div>
  );
}

