import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";

export interface LogoBuildResult {
  group: THREE.Group;
  bounds: THREE.Box3;
}

export function buildLogo(
  font: Font,
  faceMaterial: THREE.MeshStandardMaterial,
  depthMaterial: THREE.MeshStandardMaterial,
): LogoBuildResult {
  const geometry = new TextGeometry("Klymentii", {
    font,
    size: 5.2,
    depth: 0.18,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.015,
    bevelOffset: 0,
    bevelSegments: 2,
  });

  geometry.computeBoundingBox();
  geometry.center();
  geometry.computeBoundingBox();

  if (!geometry.boundingBox) {
    geometry.dispose();
    throw new Error("Unable to calculate the logo bounding box.");
  }

  const bounds = geometry.boundingBox.clone();
  const group = new THREE.Group();

  const face = new THREE.Mesh(geometry, faceMaterial);
  group.add(face);

  const backGeometry = geometry.clone();
  const back = new THREE.Mesh(backGeometry, depthMaterial);
  back.position.set(0, 0, -0.045);
  group.add(back);

  return { group, bounds };
}
