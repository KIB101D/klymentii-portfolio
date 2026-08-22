import * as THREE from "three";
import { gsap } from "gsap";
import type CameraControls from "camera-controls";
import type { Shot } from "./storyboard";

export function setCameraImmediate(
  controls: CameraControls,
  position: THREE.Vector3,
  target: THREE.Vector3,
): void {
  controls.setLookAt(
    position.x,
    position.y,
    position.z,
    target.x,
    target.y,
    target.z,
    false,
  );
}

export function moveCamera(
  controls: CameraControls,
  shot: Shot,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Animation aborted", "AbortError"));
      return;
    }

    if (!shot.motion) {
      setCameraImmediate(controls, shot.start.position, shot.start.target);
      window.setTimeout(() => resolve(), shot.duration * 1000);
      return;
    }

    const state = { t: 0 };
    const startPosition = shot.start.position.clone();
    const startTarget = shot.start.target.clone();
    const endPosition = shot.end.position.clone();
    const endTarget = shot.end.target.clone();
    const ease = shot.name === "SHOT 4" ? "power2.inOut" : "power4.out";

    const tween = gsap.to(state, {
      t: 1,
      duration: shot.duration,
      ease,
      onUpdate() {
        if (signal?.aborted) {
          tween.kill();
          reject(new DOMException("Animation aborted", "AbortError"));
          return;
        }

        const position = startPosition.clone().lerp(endPosition, state.t);
        const target = startTarget.clone().lerp(endTarget, state.t);
        setCameraImmediate(controls, position, target);
      },
      onComplete() {
        setCameraImmediate(controls, endPosition, endTarget);
        resolve();
      },
    });
  });
}

export function whiteFlash(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    gsap.killTweensOf(element);

    const timeline = gsap.timeline({ onComplete: resolve });
    timeline.set(element, { opacity: 0 });
    timeline.to(element, {
      opacity: 1,
      duration: 0.02,
      ease: "none",
    });
    timeline.to(element, {
      opacity: 0,
      duration: 0.04,
      ease: "power4.out",
    });
  });
}

export async function flashCut(
  controls: CameraControls,
  flash: HTMLElement,
  nextShot: Shot,
): Promise<void> {
  setCameraImmediate(controls, nextShot.start.position, nextShot.start.target);
  await whiteFlash(flash);
}

export async function blackCut(
  controls: CameraControls,
  cut: HTMLElement,
  nextShot: Shot,
): Promise<void> {
  await gsap.to(cut, {
    opacity: 1,
    duration: 0.17,
    ease: "power2.in",
  });

  setCameraImmediate(controls, nextShot.start.position, nextShot.start.target);

  await gsap.to(cut, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  });
}
