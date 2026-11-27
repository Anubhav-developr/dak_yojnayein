import * as THREE from 'three';

export const COLORS = {
  red: '#c8161d',      // India Post pillar-box red
  redDeep: '#7a0c10',
  gold: '#f2b632',
  goldDeep: '#c98a10',
  paper: '#fbf6ea',
  violet: '#3d2f8f',
  ink: '#120d26',
  silver: '#e6e2f2',
};

// Glossy lacquer, like a Blender Principled BSDF with clearcoat.
export const lacquerRed = () =>
  new THREE.MeshPhysicalMaterial({ color: COLORS.red, roughness: 0.34, metalness: 0.04, clearcoat: 1, clearcoatRoughness: 0.14 });

export const goldMetal = () => new THREE.MeshStandardMaterial({ color: COLORS.gold, metalness: 1, roughness: 0.27 });

export const paperMat = () => new THREE.MeshStandardMaterial({ color: COLORS.paper, roughness: 0.92, metalness: 0 });

export const violetCover = () =>
  new THREE.MeshPhysicalMaterial({ color: COLORS.violet, roughness: 0.5, metalness: 0.05, clearcoat: 0.6, clearcoatRoughness: 0.3 });

export const darkMat = () => new THREE.MeshStandardMaterial({ color: COLORS.ink, roughness: 0.6, metalness: 0.1 });
