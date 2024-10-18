import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import GUI from "lil-gui";

document.querySelector(`title`).textContent = `BufferGeometry`;

//Constants
const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};
const canvas = document.getElementById(`webgl`);
const gui = new GUI();
const debugObject = {};

//Scene
const scene = new THREE.Scene();

//Geometry
const geo = new THREE.BufferGeometry();

//Float32Array
debugObject.count = 50;
let positionsArray = new Float32Array(debugObject.count * 3 * 3);
for (var i = 0; i < debugObject.count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5;
}

let positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geo.setAttribute(`position`, positionsAttribute);

gui
  .add(debugObject, `count`)
  .min(1)
  .max(50)
  .step(1)
  .onChange(() => {
    mesh.geometry.dispose();
    positionsArray = new Float32Array(debugObject.count * 3 * 3);
    for (var i = 0; i < debugObject.count * 3 * 3; i++) {
      positionsArray[i] = Math.random() - 0.5;
    }
    positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
    geo.setAttribute(`position`, positionsAttribute);
  });

const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

//Mesh
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.x / sizes.y, 1, 100);
scene.add(camera);
camera.position.z = 3;

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

//Animate
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
