import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let landmarker = null;

export async function initPose() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  landmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task"
    },
    runningMode: "VIDEO",
    numPoses: 1
  });
}

export function detectPose(video, timestamp) {
  if (!landmarker) return null;
  return landmarker.detectForVideo(video, timestamp);
}
