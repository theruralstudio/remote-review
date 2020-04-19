import ReactPlayer from 'react-player';
import ChatPanel from './ChatPanel';

const LiveVideo = props => (
  <div id="video-wrapper">
    <ReactPlayer 
      id="video-player" 
      className='player-wrapper' 
      url={props.url} 
      width='100%' 
      height='100%' 
      playing 
    />
    <div className="overlay">
      <ChatPanel  currentUser={props.currentUser}/>
    </div>
    <style jsx>{`
      #video-wrapper {
        height: 100%;
        width: 100%;
        background: black;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      #video-player {
      }

      .overlay {
        width: 100%;
        height: 100%;        
        position: absolute;
      }
    `}</style>
  </div>
);

export default LiveVideo;