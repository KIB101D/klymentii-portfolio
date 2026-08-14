import * as THREE from "three";

export interface Shot {
  name: string;
  duration: number;
  motion: boolean;
  start: {
    position: THREE.Vector3;
    target: THREE.Vector3;
  };
  end: {
    position: THREE.Vector3;
    target: THREE.Vector3;
  };
  transition: "white" | "black" | "none";
}

export function pointOnLogo(
  bounds: THREE.Box3 | null,
  x: number,
  y: number,
): THREE.Vector3 {
  if (!bounds) {
    return new THREE.Vector3();
  }

  return new THREE.Vector3(
    THREE.MathUtils.lerp(bounds.min.x, bounds.max.x, (x + 1) / 2),
    THREE.MathUtils.lerp(bounds.min.y, bounds.max.y, (y + 1) / 2),
    0,
  );
}

export function cameraFromTarget(
  target: THREE.Vector3,
  distance: number,
  horizontalOffset = 0,
  verticalOffset = 0,
): THREE.Vector3 {
  return new THREE.Vector3(
    target.x + horizontalOffset,
    target.y + verticalOffset,
    distance,
  );
}

export function fitCameraToLogo(
  camera: THREE.PerspectiveCamera,
  bounds: THREE.Box3,
  margin = 1.04,
): number {
  const width = bounds.max.x - bounds.min.x;
  const height = bounds.max.y - bounds.min.y;
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

  const distanceByWidth =
    (width * margin) / (2 * Math.tan(horizontalFov / 2));
  const distanceByHeight =
    (height * margin) / (2 * Math.tan(verticalFov / 2));

  return Math.max(distanceByWidth, distanceByHeight);
}

export function createStoryboard(
  camera: THREE.PerspectiveCamera,
  logoBounds: THREE.Box3,
): Shot[] {
  const target1 = pointOnLogo(logoBounds, -0.88, 0.68);
  const shot1Camera = cameraFromTarget(target1, 7.2, 0.02, 0);

  const target2 = pointOnLogo(logoBounds, -0.48, -0.5);
  const shot2Camera = cameraFromTarget(target2, 6.85, 0, 0);

  const target3 = pointOnLogo(logoBounds, 0.45, 0.53);
  const shot3Camera = cameraFromTarget(target3, 6.8, 0, 0);

  const target4Start = pointOnLogo(logoBounds, -0.18, 0);
  const target4End = pointOnLogo(logoBounds, 0.88, 0);
  const shot4Start = cameraFromTarget(target4Start, 6.65, -0.72, 0);
  const shot4End = cameraFromTarget(target4End, 5.65, 0.18, 0);

  const target5 = pointOnLogo(logoBounds, 0, 0);
  const finalDistance = fitCameraToLogo(camera, logoBounds, 1.04);
  const shot5Start = cameraFromTarget(target5, 4.0, 0, 0);
  const shot5End = cameraFromTarget(target5, finalDistance, 0, 0);

  return [
    {
      name: "SHOT 1",
      duration: 0.14,
      motion: false,
      start: { position: shot1Camera.clone(), target: target1.clone() },
      end: { position: shot1Camera.clone(), target: target1.clone() },
      transition: "white",
    },
    {
      name: "SHOT 2",
      duration: 0.14,
      motion: false,
      start: { position: shot2Camera.clone(), target: target2.clone() },
      end: { position: shot2Camera.clone(), target: target2.clone() },
      transition: "white",
    },
    {
      name: "SHOT 3",
      duration: 0.16,
      motion: false,
      start: { position: shot3Camera.clone(), target: target3.clone() },
      end: { position: shot3Camera.clone(), target: target3.clone() },
      transition: "white",
    },
    {
      name: "SHOT 4",
      duration: 1.6,
      motion: true,
      start: { position: shot4Start, target: target4Start },
      end: { position: shot4End, target: target4End },
      transition: "black",
    },
    {
      name: "SHOT 5",
      duration: 0.32,
      motion: true,
      start: { position: shot5Start, target: target5 },
      end: { position: shot5End, target: target5 },
      transition: "none",
    },
  ];
}
