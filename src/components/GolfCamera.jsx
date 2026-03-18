import React, { useRef, useEffect } from "react";
import { detectPose } from "../mediapipe/poseLandmarker";
import { processFrame } from "../core/swingAnalyzer";

export default function GolfCamera({ onFrame }) {
  const videoRef = useRef();

  useEffect(() => {
    startCamera();
  }, []);

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
      loop();
    };
  }

  function loop() {
    const video = videoRef.current;

    const run = async () => {
      const result = detectPose(video, performance.now());

      if (result?.landmarks?.length) {
        const frame = processFrame(result.landmarks[0], performance.now());
        if (onFrame) onFrame(frame);
      }

      requestAnimationFrame(run);
    };

    run();
  }

  return <video ref={videoRef} style={{ width: "100%" }} />;
}
