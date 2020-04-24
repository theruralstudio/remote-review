import React, { useEffect, useRef } from "react";
// import "./Tile.css";

/**
 * Props
 * - videoTrack: MediaStreamTrack?
 * - audioTrack: MediaStreamTrack?
 * - isLocalPerson: boolean
 * - isLarge: boolean
 * - isLoading: boolean
 */
export default function Tile(props) {
  const videoEl = useRef(null);
  const audioEl = useRef(null);

  /**
   * When video track changes, update video srcObject
   */
  useEffect(() => {
    videoEl.current &&
      (videoEl.current.srcObject = new MediaStream([props.videoTrack]));
  }, [props.videoTrack]);

  /**
   * When audio track changes, update audio srcObject
   */
  useEffect(() => {
    audioEl.current &&
      (audioEl.current.srcObject = new MediaStream([props.audioTrack]));
  }, [props.audioTrack]);

  function getLoadingComponent() {
    return props.isLoading && <p className="loading">Loading...</p>;
  }

  function getVideoComponent() {
    return (
      props.videoTrack && <video autoPlay muted playsInline ref={videoEl} />
    );
  }

  function getAudioComponent() {
    return (
      !props.isLocalPerson &&
      props.audioTrack && <audio autoPlay playsInline ref={audioEl} />
    );
  }

  function getClassNames() {
    let classNames = "tile";
    classNames += props.isLarge ? " large" : " small";
    props.isLocalPerson && (classNames += " local");
    return classNames;
  }

  return (
    <div className={getClassNames()}>
      <div className="background" />
      {getLoadingComponent()}
      {getVideoComponent()}
      {getAudioComponent()}
      <style jsx>{`
      .tile.small {
        width: 200px;
        margin: 0 10px;
        position: relative;
      }
      
      .tile.large {
        position: relative;
        margin: 2px;
      }
      
      .tile video {
        width: 100%;
        position: absolute;
        top: 0px;
      }
      
      .tile .background {
        background-color: #000000;
        width: 100%;
        padding-top: 56.25%; /* Hard-coded 16:9 aspect ratio */
      }
      
      .tile.local video {
        transform: scale(-1, 1);
      }
      
      .tile.small video {
        border-radius: 4px;
      }
      
      .tile.small .background {
        border-radius: 4px;
      }
      
      .tile .loading {
        position: absolute;
        color: #ffffff;
        top: 50%;
        left: 50%;
        margin: 0;
        transform: translate(-50%, -50%);
        font-size: 14px;
        line-height: 17px;
      }
      
      
      `}
      </style>
    </div>
  );
}