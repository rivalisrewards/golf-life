import React from "react";

export default function GolfResults({ result }) {
  if (!result) return null;

  return (
    <div>
      <h2>Swing Analysis</h2>
      <p>Backswing Angle: {result.backswingFrame.armAngle.toFixed(1)}</p>
      <p>Impact Angle: {result.impactFrame.armAngle.toFixed(1)}</p>
      <p>Range: {result.range.toFixed(1)}</p>
      <h3>Score: {result.score}/100</h3>
    </div>
  );
}
