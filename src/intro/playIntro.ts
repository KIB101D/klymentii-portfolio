import * as THREE from "three";
import { gsap } from "gsap";
import type CameraControls from "camera-controls";

import {
  blackCut,
  flashCut,
  moveCamera,
  setCameraImmediate,
} from "./cameraSequence";

import type { Shot } from "./storyboard";

import { playFinalImpact, type StickerImpactRefs } from "./stickerImpact";

export interface IntroPlaybackContext {
  controls: CameraControls;

  cut: HTMLElement;
  flash: HTMLElement;

  stickerRefs: StickerImpactRefs;

  shots: Shot[];

  logo: THREE.Group;

  getThreeToStickerScale: () => number;

  setThreeToStickerScale: (value: number) => void;

  resetVisualState: () => void;

  stopRenderer: () => void;

  isPlaying: () => boolean;

  setPlaying: (value: boolean) => void;

  onFinished: () => void;

  getSkipPromise: () => Promise<void>;
}

export async function playIntro(context: IntroPlaybackContext): Promise<void> {
  /*
   * playIntro is the owner of the playback state.
   * createIntroEngine.play() must NOT set playing=true
   * before calling this function.
   */
  if (context.isPlaying() || context.shots.length === 0) {
    return;
  }

  const skipPromise = context.getSkipPromise();

  /*
   * Run an async operation and allow skip() to interrupt it.
   *
   * The animation itself is killed by createIntroEngine.skip().
   * Promise.race() makes sure we don't wait for a killed tween,
   * camera animation, impact or timeout.
   */
  async function run<T>(promise: Promise<T>): Promise<T | null> {
    return Promise.race([promise, skipPromise.then(() => null)]);
  }

  context.setPlaying(true);

  try {
    /*
     * ---------------------------------------------------------
     * RESET
     * ---------------------------------------------------------
     */

    gsap.killTweensOf([
      context.cut,
      context.flash,
      context.stickerRefs.sticker,
      context.stickerRefs.stickerLogo,
      context.stickerRefs.stickerShadow,
      context.stickerRefs.dust,
      context.logo,
    ]);

    context.resetVisualState();

    gsap.set(context.cut, {
      opacity: 1,
    });

    gsap.set(context.flash, {
      opacity: 0,
    });

    /*
     * ---------------------------------------------------------
     * SHOT 1
     * ---------------------------------------------------------
     */

    setCameraImmediate(
      context.controls,
      context.shots[0].start.position,
      context.shots[0].start.target,
    );

    const firstCut = await run(
      new Promise<void>((resolve) => {
        gsap.to(context.cut, {
          opacity: 0,
          duration: 0.18,
          ease: "power2.out",
          onComplete: resolve,
        });
      }),
    );

    if (firstCut === null) {
      return;
    }

    const shot1 = await run(moveCamera(context.controls, context.shots[0]));

    if (shot1 === null) {
      return;
    }

    /*
     * ---------------------------------------------------------
     * SHOT 1 → 2
     * ---------------------------------------------------------
     */

    const flash12 = await run(
      flashCut(context.controls, context.flash, context.shots[1]),
    );

    if (flash12 === null) {
      return;
    }

    const shot2 = await run(moveCamera(context.controls, context.shots[1]));

    if (shot2 === null) {
      return;
    }

    /*
     * ---------------------------------------------------------
     * SHOT 2 → 3
     * ---------------------------------------------------------
     */

    const flash23 = await run(
      flashCut(context.controls, context.flash, context.shots[2]),
    );

    if (flash23 === null) {
      return;
    }

    const shot3 = await run(moveCamera(context.controls, context.shots[2]));

    if (shot3 === null) {
      return;
    }

    /*
     * ---------------------------------------------------------
     * SHOT 3 → 4
     * ---------------------------------------------------------
     */

    const flash34 = await run(
      flashCut(context.controls, context.flash, context.shots[3]),
    );

    if (flash34 === null) {
      return;
    }

    const shot4 = await run(moveCamera(context.controls, context.shots[3]));

    if (shot4 === null) {
      return;
    }

    /*
     * ---------------------------------------------------------
     * SHOT 4 → 5
     * ---------------------------------------------------------
     */

    const black45 = await run(
      blackCut(context.controls, context.cut, context.shots[4]),
    );

    if (black45 === null) {
      return;
    }

    const shot5 = await run(moveCamera(context.controls, context.shots[4]));

    if (shot5 === null) {
      return;
    }

    /*
     * ---------------------------------------------------------
     * FINAL IMPACT
     * ---------------------------------------------------------
     */

    const finalScale = await run(
      playFinalImpact(context.stickerRefs, context.getThreeToStickerScale()),
    );

    if (finalScale === null) {
      return;
    }

    context.setThreeToStickerScale(finalScale);

    /*
     * ---------------------------------------------------------
     * THREE.JS NO LONGER NEEDED
     * ---------------------------------------------------------
     */

    context.stopRenderer();

    /*
     * ---------------------------------------------------------
     * FINISHED
     * ---------------------------------------------------------
     */

    context.onFinished();
  } finally {
    context.setPlaying(false);
  }
}
