import * as THREE from "three";
import { gsap } from "gsap";
import { ANIMATION } from "./animationConfig";

export interface StickerImpactRefs {
  logo: THREE.Group;
  logoBounds: THREE.Box3 | null;
  camera: THREE.PerspectiveCamera;
  sticker: HTMLElement;
  stickerLogo: HTMLElement;
  stickerShadow: HTMLElement;
  dust: HTMLElement;
}

export function prepareStickerSizing(stickerLogo: HTMLElement) {
  void stickerLogo.offsetWidth;
  const rect = stickerLogo.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
  };
}

export function calculateThreeToStickerScale(
  refs: StickerImpactRefs,
): number {
  const { logoBounds } = refs;

  if (!logoBounds) {
    return 1;
  }

  const points = [
    new THREE.Vector3(logoBounds.min.x, logoBounds.min.y, 0),
    new THREE.Vector3(logoBounds.min.x, logoBounds.max.y, 0),
    new THREE.Vector3(logoBounds.max.x, logoBounds.min.y, 0),
    new THREE.Vector3(logoBounds.max.x, logoBounds.max.y, 0),
  ];

  const projected = points.map((point) => {
    const world = point.clone();
    refs.logo.localToWorld(world);
    world.project(refs.camera);

    return {
      x: (world.x * 0.5 + 0.5) * window.innerWidth,
      y: (-world.y * 0.5 + 0.5) * window.innerHeight,
    };
  });

  const xs = projected.map((point) => point.x);
  const ys = projected.map((point) => point.y);
  const threeWidth = Math.max(...xs) - Math.min(...xs);
  const threeHeight = Math.max(...ys) - Math.min(...ys);

  const stickerSize = prepareStickerSizing(refs.stickerLogo);
  const stickerWidth = stickerSize.width;
  const stickerHeight = stickerSize.height;

  if (!threeWidth || !threeHeight || !stickerWidth || !stickerHeight) {
    return 1;
  }

  const scaleByWidth = stickerWidth / threeWidth;
  const scaleByHeight = stickerHeight / threeHeight;

  // Width is the primary metric because the final mark is strongly horizontal.
  void scaleByHeight;
  return scaleByWidth;
}

export function getLogoScreenCenter(refs: StickerImpactRefs) {
  if (!refs.logoBounds) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  const center = new THREE.Vector3(
    (refs.logoBounds.min.x + refs.logoBounds.max.x) / 2,
    (refs.logoBounds.min.y + refs.logoBounds.max.y) / 2,
    0,
  );

  refs.logo.localToWorld(center);
  center.project(refs.camera);

  return {
    x: (center.x * 0.5 + 0.5) * window.innerWidth,
    y:
      (-center.y * 0.5 + 0.5) * window.innerHeight + ANIMATION.position.yOffset,
  };
}

export function syncStickerToLogo(refs: StickerImpactRefs): Promise<void> {
  prepareStickerSizing(refs.stickerLogo);

  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const target = getLogoScreenCenter(refs);
      refs.sticker.style.left = `${target.x}px`;
      refs.sticker.style.top = `${target.y}px`;

      requestAnimationFrame(() => {
        const rect = refs.stickerLogo.getBoundingClientRect();
        const stickerCenterX = rect.left + rect.width / 2;
        const stickerCenterY = rect.top + rect.height / 2;
        const correctionX = target.x - stickerCenterX;
        const correctionY = target.y - stickerCenterY;
        const currentLeft = Number.parseFloat(refs.sticker.style.left || "0");
        const currentTop = Number.parseFloat(refs.sticker.style.top || "0");

        refs.sticker.style.left = `${currentLeft + correctionX}px`;
        refs.sticker.style.top = `${currentTop + correctionY}px`;
        resolve();
      });
    });
  });
}

export function createDustBurst(
  dust: HTMLElement,
  x: number,
  y: number,
): void {
  dust.innerHTML = "";
  dust.style.left = `${x}px`;
  dust.style.top = `${y}px`;

  const {
    count,
    minDistance,
    maxDistance,
    minSize,
    maxSize,
    minDuration,
    maxDuration,
  } = ANIMATION.dust;

  gsap.set(dust, {
    opacity: 1,
    scale: 1,
  });

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "dust-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance =
      minDistance + Math.random() * (maxDistance - minDistance);
    const size = minSize + Math.random() * (maxSize - minSize);
    const startX = (Math.random() - 0.5) * 6;
    const startY = (Math.random() - 0.5) * 4;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.opacity = `${0.25 + Math.random() * 0.5}`;
    dust.appendChild(particle);

    gsap.to(particle, {
      x: endX,
      y: endY,
      scale: 0.2 + Math.random() * 0.7,
      opacity: 0,
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      ease: "power2.out",
      delay: Math.random() * 0.02,
      onComplete: () => particle.remove(),
    });
  }

  gsap.to(dust, {
    opacity: 0,
    duration: 0.24,
    ease: "power2.out",
  });
}

export function stickerImpact(refs: StickerImpactRefs): Promise<void> {
  return new Promise((resolve) => {
    const rect = refs.stickerLogo.getBoundingClientRect();
    const impactX = rect.left + rect.width / 2;
    const impactY = rect.top + rect.height * 0.78;

    gsap.set(refs.sticker, {
      opacity: 0,
      scale: ANIMATION.sticker.startScale,
      rotation: ANIMATION.sticker.startRotation,
      x: "-50%",
      y: "-50%",
      filter: `blur(${ANIMATION.impact.startBlur}px) brightness(${ANIMATION.impact.startBrightness})`,
    });

    gsap.set(refs.stickerShadow, {
      opacity: ANIMATION.shadow.startOpacity,
      x: ANIMATION.shadow.startX,
      y: ANIMATION.shadow.startY,
      scale: 1.05,
      filter: "blur(3px)",
    });

    gsap.set(refs.stickerLogo, {
      scaleX: 1,
      scaleY: 1,
    });

    createDustBurst(refs.dust, impactX, impactY);

    const timeline = gsap.timeline({ onComplete: resolve });

    timeline.to(refs.sticker, {
      opacity: 1,
      scale: ANIMATION.sticker.impactScale,
      rotation: ANIMATION.sticker.impactRotation,
      filter: `blur(${ANIMATION.impact.revealBlur}px) brightness(1.08)`,
      duration: ANIMATION.sticker.revealDuration,
      ease: "none",
    });

    timeline.to(
      refs.stickerShadow,
      {
        opacity: ANIMATION.shadow.impactOpacity,
        x: ANIMATION.shadow.impactX,
        y: ANIMATION.shadow.impactY,
        scale: 1.08,
        filter: "blur(2.5px)",
        duration: 0.035,
        ease: "power4.out",
      },
      "<",
    );

    timeline.to(refs.sticker, {
      scale: ANIMATION.sticker.impactScale,
      rotation: ANIMATION.sticker.impactRotation,
      filter: `blur(${ANIMATION.impact.settleBlur}px) brightness(1.02)`,
      duration: ANIMATION.sticker.squashDuration,
      ease: "power4.out",
    });

    timeline.to(
      refs.stickerLogo,
      {
        scaleX: 1.035,
        scaleY: 0.965,
        duration: 0.055,
        ease: "power3.out",
      },
      "<",
    );

    timeline.to(refs.sticker, {
      scale: ANIMATION.sticker.reboundScale,
      rotation: ANIMATION.sticker.reboundRotation,
      filter: "blur(0px) brightness(1)",
      duration: ANIMATION.sticker.reboundDuration,
      ease: "back.out(2.6)",
    });

    timeline.to(
      refs.stickerShadow,
      {
        x: ANIMATION.shadow.impactX + 3,
        y: ANIMATION.shadow.impactY + 3,
        scale: 1.09,
        opacity: 0.72,
        filter: "blur(2px)",
        duration: 0.075,
        ease: "power3.out",
      },
      "<",
    );

    timeline.to(refs.sticker, {
      scale: ANIMATION.sticker.finalScale,
      rotation: ANIMATION.sticker.finalRotation,
      duration: ANIMATION.sticker.settleDuration,
      ease: "power2.out",
    });

    timeline.to(
      refs.stickerShadow,
      {
        x: ANIMATION.shadow.finalX,
        y: ANIMATION.shadow.finalY,
        scale: 1,
        opacity: ANIMATION.shadow.finalOpacity,
        filter: "blur(1px)",
        duration: 0.16,
        ease: "power2.out",
      },
      "<",
    );
  });
}

export async function playFinalImpact(
  refs: StickerImpactRefs,
  previousScale: number,
): Promise<number> {
  await syncStickerToLogo(refs);

  gsap.set(refs.sticker, {
    opacity: 0,
  });

  const scale = calculateThreeToStickerScale(refs);
  const threeToStickerScale = scale || previousScale;

  await gsap.to(refs.logo.scale, {
    x: ANIMATION.fall.anticipationScale,
    y: ANIMATION.fall.anticipationScale,
    z: 1,
    duration: ANIMATION.fall.anticipationDuration,
    ease: "power2.out",
  });

  const fall = gsap.timeline();

  fall.to(refs.logo.scale, {
    x: threeToStickerScale,
    y: threeToStickerScale,
    z: 1,
    duration: ANIMATION.fall.fallDuration,
    ease: "power4.in",
  });

  fall.to(refs.logo, {
    opacity: 0,
    duration: ANIMATION.fall.vanishDuration,
    ease: "none",
    onComplete() {
      refs.logo.visible = false;
    },
  });

  await fall;
  await stickerImpact(refs);
  return threeToStickerScale;
}
