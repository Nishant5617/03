import * as THREE from "three";
import { ImprovedNoise, OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import GUI from "lil-gui";
import "./styles.css";
import { RGBELoader } from "three/examples/jsm/Addons.js";

document.querySelector(`title`).textContent = `Materials`;

//Constants
const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};
const canvas = document.getElementById(`webgl`);
const gui = new GUI();
// const debugObject = {};

//import textures
const textureLoader = new THREE.TextureLoader();

const loadManager = new THREE.LoadingManager();
// loadManager.onError = (url) => console.log(`error in ${url}`);

const colorTexture = textureLoader.load(`src/assets/images/door/color.jpg`);
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;
// colorTexture.generateMipmaps = false;
colorTexture.colorSpace = THREE.SRGBColorSpace;
// colorTexture.repeat = { x: 2, y: 2 }; //giving in one line
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.center = { x: 0.5, y: 0.5 };
// colorTexture.rotation = Math.PI / 2;
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

const matcapColor = textureLoader.load(`src/assets/images/matcaps/9.png`);
matcapColor.colorSpace = THREE.SRGBColorSpace;

//Scene
const scene = new THREE.Scene();

//Geometries
const box = new THREE.BoxGeometry();
const torus = new THREE.TorusGeometry(0.4, 0.2);
const sphere = new THREE.SphereGeometry(0.5);
const plane = new THREE.PlaneGeometry(1, 1, 500, 500);

//Materials
const mat1 = new THREE.MeshMatcapMaterial({ matcap: matcapColor });
mat1.side = THREE.DoubleSide;
// mat1.transparent = true;
// mat1.opacity = 0.7;
const mat2 = new THREE.MeshBasicMaterial({ map: colorTexture });
const mat3 = new THREE.MeshBasicMaterial({ map: colorTexture });
const lambert = new THREE.MeshStandardMaterial({
  map: colorTexture,
  metalnessMap: metalnessTexture,
  roughnessMap: roughnessTexture,
  normalMap: normalTexture,
  aoMap: ambientOcclusionTexture,
  alphaMap: alphaTexture,
  displacementMap: heightTexture,
  displacementScale: 0.05,
});
lambert.transparent = true;
lambert.side = THREE.DoubleSide;

//Mesh
const mesh1 = new THREE.Mesh(torus, lambert);
mesh1.position.x = 1.3;
// scene.add(mesh1);
const mesh2 = new THREE.Mesh(sphere, lambert);
mesh2.position.x = -1.3;
// scene.add(mesh2);
const mesh3 = new THREE.Mesh(plane, lambert);
mesh3.position.x = 0;
scene.add(mesh3);

//lights
// const ambLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambLight);
// const ptLight = new THREE.PointLight(0xffffff, 30);
// scene.add(ptLight);
// ptLight.position.x = 5;

const env = new RGBELoader();
env.load(`src/squash_court_1k.hdr`, (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap;
  scene.environment = envMap;
});

//GUI
gui.add(lambert, `metalness`).min(0).max(1).step(0.01);
gui.add(lambert, `roughness`).min(0).max(1).step(0.01);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.x / sizes.y, 0.1, 100);
scene.add(camera);
camera.position.z = 4;

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
  // mesh1.rotation.y = clock.getElapsedTime();
  // mesh1.rotation.z = clock.getElapsedTime();
  // mesh2.rotation.y = clock.getElapsedTime();
  // mesh2.rotation.z = clock.getElapsedTime();
  // mesh3.rotation.y = clock.getElapsedTime();
  // mesh3.rotation.z = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
