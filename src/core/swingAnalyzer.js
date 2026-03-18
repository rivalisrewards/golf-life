import { getAngle } from "../utils/angleCalc";

let frames = [];

export function resetSwing() {
  frames = [];
}

export function processFrame(landmarks, timestamp) {
  if (!landmarks) return null;

  const lShoulder = landmarks[11];
  const lElbow = landmarks[13];
  const lWrist = landmarks[15];

  const rHip = landmarks[24];
  const rShoulder = landmarks[12];
  const rElbow = landmarks[14];

  const armAngle = getAngle(lShoulder, lElbow, lWrist);
  const torsoAngle = getAngle(rHip, rShoulder, rElbow);

  const frame = {
    time: timestamp,
    armAngle,
    torsoAngle
  };

  frames.push(frame);

  return frame;
}

export function analyzeSwing() {
  if (frames.length < 10) return null;

  const armAngles = frames.map(f => f.armAngle);
  const max = Math.max(...armAngles);
  const min = Math.min(...armAngles);

  const backswingIndex = armAngles.indexOf(max);
  const impactIndex = armAngles.indexOf(min);

  return {
    backswingFrame: frames[backswingIndex],
    impactFrame: frames[impactIndex],
    range: max - min,
    score: calculateScore(max, min)
  };
}

function calculateScore(max, min) {
  let score = 100;

  if (max < 140) score -= 20;
  if (min > 50) score -= 20;

  return Math.max(score, 0);
}
