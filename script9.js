import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./styles.css";

//Constants
const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};

const canvas = document.getElementById(`webgl`);

//Scene
const scene = new THREE.Scene();

//Materials
const material = new THREE.MeshStandardMaterial({
  roughness: 0.5,
});

//Meshes
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5), material);
sphere.position.y = 0.5;

sphere.castShadow = true;

const ground = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
ground.rotation.x = -Math.PI * 0.5;

ground.receiveShadow = true;

scene.add(sphere, ground);

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
scene.add(directionalLight);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize = { x: 512, y: 512 };

// directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5;
directionalLight.shadow.camera.left = -1;
directionalLight.shadow.camera.right = 1;
directionalLight.shadow.camera.top = 1;
directionalLight.shadow.camera.bottom = -1;
directionalLight.shadow.radius = 5;

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

//GUI

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.x / sizes.y, 0.1, 100);
scene.add(camera);
camera.position.z = 5;
camera.position.y = 5;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.x, sizes.y);
renderer.pixelRatio = 1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);

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
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
