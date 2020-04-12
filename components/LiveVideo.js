import ReactPlayer from 'react-player';

const LiveVideo = props => (
  <div>
    <ReactPlayer className='player-wrapper' url={props.url} width='100%' height='100%' playing />
    <style jsx>{`
      div {
        background: black;
        flex-grow: 2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
);

export default LiveVideo;