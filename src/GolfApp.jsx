import React, { useEffect, useState } from "react";
import GolfCamera from "./components/GolfCamera";
import GolfUpload from "./components/GolfUpload";
import GolfResults from "./components/GolfResults";
import { initPose } from "./mediapipe/poseLandmarker";
import { analyzeSwing, resetSwing } from "./core/swingAnalyzer";

export default function GolfApp() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    initPose();
  }, []);

  function handleFrame() {}

  function finishSwing() {
    const res = analyzeSwing();
    setResult(res);
  }

  return (
    <div>
      <h1>Rivalis Golf Analyzer</h1>

      <GolfCamera onFrame={handleFrame} />
      <GolfUpload onLoad={() => resetSwing()} />

      <button onClick={finishSwing}>Analyze Swing</button>

      <GolfResults result={result} />
    </div>
  );
}
