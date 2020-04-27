import React, { useEffect, useRef } from "react";

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
      props.videoTrack && <video className="object-cover w-full h-full" autoPlay muted playsInline ref={videoEl} />
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

  const isActive = props.id == props.activeSpeaker

  return (
    <div className={`${isActive ? 'active-tile z-30' : 'inactive-tile'} object-cover bg-gray-500`}>
      {getLoadingComponent()}
      {getVideoComponent()}
      {getAudioComponent()}
      <style jsx>{`
        .active-tile {
          outline: 2px solid magenta
        }
      `}</style>
    </div>
  );
}
