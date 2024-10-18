import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import GUI from "lil-gui";

document.querySelector(`title`).textContent = `Materials`;

//Constants
const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};
const canvas = document.getElementById(`webgl`);
// const gui = new GUI();
// const debugObject = {};
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load(`src/assets/images/door/color.jpg`);
const ambientOcclusionTexture = textureLoader.load(
  `src/assets/images/door/ambientOcclusion.jpg`
);
const alphaTexture = textureLoader.load(`src/assets/images/door/alpha.jpg`);
const heightTexture = textureLoader.load(`src/assets/images/door/height.jpg`);
const metalnessTexture = textureLoader.load(
  `src/assets/images/door/metalness.jpg`
);
const roughnessTexture = textureLoader.load(
  `src/assets/images/door/roughness.jpg`
);
const normalTexture = textureLoader.load(`src/assets/images/door/normal.jpg`);
//Scene
const scene = new THREE.Scene();

//Geometries
const box = new THREE.BoxGeometry();
const torus = new THREE.TorusGeometry(0.4, 0.2);
const sphere = new THREE.SphereGeometry(0.5);
const plane = new THREE.PlaneGeometry();

//Materials
const mat1 = new THREE.MeshBasicMaterial({ map: colorTexture });
const mat2 = new THREE.MeshBasicMaterial({ map: colorTexture });
const mat3 = new THREE.MeshBasicMaterial({ map: colorTexture });

//Mesh
const mesh1 = new THREE.Mesh(torus, mat1);
mesh1.position.x = 1.3;
// scene.add(mesh1);
const mesh2 = new THREE.Mesh(sphere, mat2);
mesh2.position.x = -1.3;
// scene.add(mesh2);
const mesh3 = new THREE.Mesh(box, mat1);
mesh3.position.x = 0;
scene.add(mesh3);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.x / sizes.y, 1, 100);
scene.add(camera);
camera.position.z = 5;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.x, sizes.y);
renderer.render(scene, camera);
renderer.pixelRatio = 1;

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Resize
window.addEventListener(`resize`, () => {
  sizes.x = window.innerWidth;
  sizes.y = window.innerHeight;
  camera.aspect = sizes.x / sizes.y;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.x, sizes.y);
});

//
const clock = new THREE.Clock();

//Animate
const tick = () => {
  //   mesh1.rotation.y = clock.getElapsedTime();
  //   mesh2.rotation.y = clock.getElapsedTime();
  //   mesh3.rotation.y = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
