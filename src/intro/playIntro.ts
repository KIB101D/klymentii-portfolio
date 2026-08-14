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
}

export async function playIntro(context: IntroPlaybackContext): Promise<void> {
  if (context.isPlaying() || context.shots.length === 0) {
    return;
  }

  context.setPlaying(true);

  try {
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

    gsap.set(context.cut, { opacity: 1 });
    gsap.set(context.flash, { opacity: 0 });

    setCameraImmediate(
      context.controls,
      context.shots[0].start.position,
      context.shots[0].start.target,
    );

    await gsap.to(context.cut, {
      opacity: 0,
      duration: 0.18,
      ease: "power2.out",
    });

    await moveCamera(context.controls, context.shots[0]);

    await flashCut(context.controls, context.flash, context.shots[1]);
    await moveCamera(context.controls, context.shots[1]);

    await flashCut(context.controls, context.flash, context.shots[2]);
    await moveCamera(context.controls, context.shots[2]);

    await flashCut(context.controls, context.flash, context.shots[3]);
    await moveCamera(context.controls, context.shots[3]);

    await blackCut(context.controls, context.cut, context.shots[4]);
    await moveCamera(context.controls, context.shots[4]);

    const finalScale = await playFinalImpact(
      context.stickerRefs,
      context.getThreeToStickerScale(),
    );
    context.setThreeToStickerScale(finalScale);

    context.stopRenderer();
    context.onFinished();
  } finally {
    context.setPlaying(false);
  }
}
