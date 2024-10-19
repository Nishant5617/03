import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

//Constants
const canvas = document.getElementById(`webgl`);
const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};

//Textures
const texLoader = new THREE.TextureLoader();
const images = {
  map1: texLoader.load(`src/assets/images/matcaps/1.png`),
  map2: texLoader.load(`src/assets/images/matcaps/2.png`),
  map3: texLoader.load(`src/assets/images/matcaps/3.png`),
};

//Scene
const scene = new THREE.Scene();

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.x, sizes.y);

//Mesh
const material = new THREE.MeshMatcapMaterial();
material.matcap = images.map1;
const material2 = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
});

const geo = new THREE.SphereGeometry(0.5);

const sphere = new THREE.Mesh(geo, material);
scene.add(sphere);

//Camera
const camera = new THREE.PerspectiveCamera(50, sizes.x / sizes.y, 0.1, 10);
scene.add(camera);
camera.position.z = 3;

//Lights
const dirlight = new THREE.DirectionalLight(0xffffff, 1);
dirlight.position.x = 2;
const amblight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(dirlight);
scene.add(amblight);

GUI;
const gui = new GUI();

const mats = {
  mat1: material,
  mat2: material2,
};
// gui.add(material, `metalness`).min(0).max(1).step(0.1);
// gui.add(material, `roughness`).min(0).max(1).step(0.1);
// gui.addColor(material, `color`);
// gui.addColor(material, `emissive`);
// gui.add(material, "wireframe");
gui.add(sphere.material, "matcap", images);

//Render the scene
renderer.render(scene, camera);

const controller = new OrbitControls(camera, canvas);
controller.target.y = sphere.position.y;
controller.enableDamping = true;

const tick = () => {
  controller.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
