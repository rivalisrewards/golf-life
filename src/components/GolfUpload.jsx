import React, { useRef } from "react";

export default function GolfUpload({ onLoad }) {
  const videoRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    videoRef.current.src = url;

    videoRef.current.onloadeddata = () => {
      videoRef.current.play();
      onLoad(videoRef.current);
    };
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFile} />
      <video ref={videoRef} controls style={{ width: "100%" }} />
    </div>
  );
}
