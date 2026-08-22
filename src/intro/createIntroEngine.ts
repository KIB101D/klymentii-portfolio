import * as THREE from "three";
import CameraControls from "camera-controls";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { gsap } from "gsap";
import { buildLogo } from "./logo";
import { ANIMATION } from "./animationConfig";
import { createStoryboard, fitCameraToLogo, type Shot } from "./storyboard";
import { playIntro } from "./playIntro";
import { prepareStickerSizing, type StickerImpactRefs } from "./stickerImpact";

export interface IntroEngineRefs {
  canvasHost: HTMLDivElement;
  cut: HTMLDivElement;
  flash: HTMLDivElement;
  sticker: HTMLDivElement;
  stickerLogo: HTMLDivElement;
  stickerShadow: HTMLDivElement;
  dust: HTMLDivElement;
  onFinished: () => void;
}

export interface IntroEngine {
  init: () => Promise<void>;
  play: () => Promise<void>;
  skip: () => void;
  dispose: () => void;
}

const LOCAL_FONT_URL = "/fonts/helvetiker_bold.typeface.json";
const REMOTE_FONT_URL =
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

let cameraControlsInstalled = false;

function installCameraControls(): void {
  if (cameraControlsInstalled) return;
  CameraControls.install({ THREE });
  cameraControlsInstalled = true;
}

async function loadFont(fontLoader: FontLoader) {
  try {
    return await fontLoader.loadAsync(LOCAL_FONT_URL);
  } catch (localError) {
    console.warn(
      "Local Helvetiker font was not found; falling back to the Three.js hosted copy.",
      localError,
    );
    return await fontLoader.loadAsync(REMOTE_FONT_URL);
  }
}

export function createIntroEngine(refs: IntroEngineRefs): IntroEngine {
  let logoBounds: THREE.Box3 | null = null;
  let shots: Shot[] = [];
  let playing = false;
  let threeToStickerScale = 1;
  let rafId: number | null = null;
  let rendering = false;
  let initialized = false;
  let disposed = false;
  let previousTime = performance.now();
  let skipRequested = false;
  let skipResolve: (() => void) | null = null;
  let finished = false;

  installCameraControls();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1c1c1c);

  const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.01,
    5000,
  );
  camera.position.set(0, 0, 20);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  refs.canvasHost.appendChild(renderer.domElement);

  const controls = new CameraControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.restThreshold = 0.0005;
  controls.smoothTime = 0.05;

  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(-2, 4, 8);
  scene.add(key);

  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0xe3e5e9,
    metalness: 0.78,
    roughness: 0.18,
    side: THREE.DoubleSide,
  });

  const depthMaterial = new THREE.MeshStandardMaterial({
    color: 0x202226,
    metalness: 0.68,
    roughness: 0.24,
    side: THREE.DoubleSide,
  });

  const logo = new THREE.Group();
  scene.add(logo);

  function getStickerRefs(): StickerImpactRefs {
    return {
      logo,
      logoBounds,
      camera,
      sticker: refs.sticker,
      stickerLogo: refs.stickerLogo,
      stickerShadow: refs.stickerShadow,
      dust: refs.dust,
    };
  }

  function completeIntro(): void {
    if (finished || disposed) return;
    finished = true;
    refs.onFinished();
  }

  function getSkipPromise(): Promise<void> {
    if (skipRequested) return Promise.resolve();
    return new Promise<void>((resolve) => {
      skipResolve = resolve;
    });
  }

  function resetVisualState(): void {
    gsap.killTweensOf([
      refs.sticker,
      refs.stickerLogo,
      refs.stickerShadow,
      refs.dust,
      logo,
      refs.cut,
      refs.flash,
    ]);

    gsap.set(refs.sticker, {
      opacity: 0,
      x: "-50%",
      y: "-50%",
      scale: 1,
      rotation: ANIMATION.sticker.finalRotation,
      transformOrigin: "center center",
      filter: "blur(0px) brightness(1)",
    });

    gsap.set(refs.stickerLogo, {
      scaleX: 1,
      scaleY: 1,
    });

    gsap.set(refs.stickerShadow, {
      x: ANIMATION.shadow.finalX,
      y: ANIMATION.shadow.finalY,
      scale: 1,
      opacity: ANIMATION.shadow.finalOpacity,
      filter: "blur(1px)",
    });

    gsap.set(refs.dust, {
      opacity: 0,
      scale: 0,
    });
    refs.dust.innerHTML = "";

    gsap.set(logo, {
      visible: true,
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      x: 0,
      y: 0,
      z: 0,
    });

    refs.cut.style.opacity = "1";
    refs.flash.style.opacity = "0";
  }

  function renderLoop(currentTime: number): void {
    if (!rendering || disposed) {
      return;
    }

    rafId = requestAnimationFrame(renderLoop);

    const delta = Math.min(0.05, (currentTime - previousTime) / 1000);
    previousTime = currentTime;

    controls.update(delta);
    renderer.render(scene, camera);
  }

  function startRenderer(): void {
    if (rendering || disposed) return;

    rendering = true;
    previousTime = performance.now();
    rafId = requestAnimationFrame(renderLoop);
  }

  function stopRenderer(): void {
    rendering = false;

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function handleResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (shots.length > 0 && logoBounds) {
      const target5 = new THREE.Vector3(
        (logoBounds.min.x + logoBounds.max.x) / 2,
        (logoBounds.min.y + logoBounds.max.y) / 2,
        0,
      );
      const finalDistance = fitCameraToLogo(camera, logoBounds, 1.04);
      const finalPosition = new THREE.Vector3(
        target5.x,
        target5.y,
        finalDistance,
      );
      shots[4].end.position.copy(finalPosition);
      shots[4].end.target.copy(target5);
    }
  }

  async function init(): Promise<void> {
    if (initialized || disposed) return;
    initialized = true;

    try {
      const fontLoader = new FontLoader();
      const font = await loadFont(fontLoader);

      if (disposed) return;

      const builtLogo = buildLogo(font, faceMaterial, depthMaterial);
      logo.clear();
      logo.add(builtLogo.group.children[0]);
      logo.add(builtLogo.group.children[1]);
      logoBounds = builtLogo.bounds;

      shots = createStoryboard(camera, logoBounds);
      resetVisualState();
      setCameraImmediateForCurrentShot();
      startRenderer();
    } catch (error) {
      initialized = false;
      console.error("Intro initialization failed.", error);
      throw error;
    }
  }

  function setCameraImmediateForCurrentShot(): void {
    if (shots.length === 0) return;

    controls.setLookAt(
      shots[0].start.position.x,
      shots[0].start.position.y,
      shots[0].start.position.z,
      shots[0].start.target.x,
      shots[0].start.target.y,
      shots[0].start.target.z,
      false,
    );
  }

  async function play(): Promise<void> {
    if (disposed) return;
    if (!initialized) await init();
    if (playing || shots.length === 0) return;
    if (skipRequested) {
      skip();
      return;
    }

    finished = false;
    startRenderer();

    const playPromise = playIntro({
      controls,
      cut: refs.cut,
      flash: refs.flash,
      stickerRefs: getStickerRefs(),
      shots,
      logo,
      getThreeToStickerScale: () => threeToStickerScale,
      setThreeToStickerScale: (value) => {
        threeToStickerScale = value;
      },
      resetVisualState,
      stopRenderer,
      isPlaying: () => playing,
      setPlaying: (value) => {
        playing = value;
      },
      onFinished: completeIntro,
      getSkipPromise,
    });

    await playPromise;
  }

  function skip(): void {
    if (disposed || finished) return;

    skipRequested = true;
    skipResolve?.();
    skipResolve = null;

    gsap.killTweensOf([
      refs.cut,
      refs.flash,
      refs.sticker,
      refs.stickerLogo,
      refs.stickerShadow,
      refs.dust,
      logo,
    ]);

    logo.visible = false;
    stopRenderer();

    prepareStickerSizing(refs.stickerLogo);
    refs.sticker.style.left = "50%";
    refs.sticker.style.top = "50%";

    gsap.set(refs.cut, { opacity: 0 });
    gsap.set(refs.flash, { opacity: 0 });
    gsap.set(refs.sticker, {
      opacity: 1,
      x: "-50%",
      y: "-50%",
      scale: ANIMATION.sticker.finalScale,
      rotation: ANIMATION.sticker.finalRotation,
      filter: "blur(0px) brightness(1)",
    });
    gsap.set(refs.stickerLogo, { scaleX: 1, scaleY: 1 });
    gsap.set(refs.stickerShadow, {
      x: ANIMATION.shadow.finalX,
      y: ANIMATION.shadow.finalY,
      scale: 1,
      opacity: ANIMATION.shadow.finalOpacity,
      filter: "blur(1px)",
    });
    gsap.set(refs.dust, { opacity: 0, scale: 0 });
    refs.dust.innerHTML = "";

    completeIntro();
  }

  function dispose(): void {
    if (disposed) return;
    disposed = true;
    skipResolve?.();
    skipResolve = null;

    stopRenderer();
    window.removeEventListener("resize", handleResize);
    gsap.killTweensOf([
      refs.cut,
      refs.flash,
      refs.sticker,
      refs.stickerLogo,
      refs.stickerShadow,
      refs.dust,
      logo,
    ]);

    controls.dispose();

    logo.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => material.dispose());
      } else if (mesh.material) {
        mesh.material.dispose();
      }
    });

    faceMaterial.dispose();
    depthMaterial.dispose();
    renderer.dispose();

    if (renderer.domElement.parentElement === refs.canvasHost) {
      refs.canvasHost.removeChild(renderer.domElement);
    }
  }

  window.addEventListener("resize", handleResize);

  // Force an initial sticker layout measurement once the DOM is mounted.
  prepareStickerSizing(refs.stickerLogo);

  return {
    init,
    play,
    skip,
    dispose,
  };
}
