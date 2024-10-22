import * as THREE from "three";
import { OrbitControls, ThreeMFLoader } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
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
const textureLoader = new THREE.TextureLoader();
const matcap = textureLoader.load(`src/assets/images/matcaps/8.png`);
// const debugObject = {};
const texLoader = new THREE.TextureLoader();
const matcap = texLoader.load(`src/assets/images/matcaps/8.png`);

//Scene
const scene = new THREE.Scene();

//Text Geometry
const fontLoader = new FontLoader();
fontLoader.load(`src/helvetiker_bold.typeface.json`, (font) => {
  const textGeometry = new TextGeometry(`Nishi Daddy`, {
    font: font,
    size: 2,
    depth: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 1,
  });
  textGeometry.center();
  // textGeometry.computeBoundingBox()
  // console.log(textGeometry.boundingBox);
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x ) /2,
  //   - (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y ) /2,
  //   - (textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z ) /2,
  // )
  // textGeometry.computeBoundingBox()
  // console.log(textGeometry.boundingBox);

  textGeometry.center();
  //Materials
  const material = new THREE.MeshMatcapMaterial({
    matcap,
    // transparent: true,
    // opacity: 0.6,
  });

  //Mesh
  const textMesh = new THREE.Mesh(textGeometry, material);

  scene.add(textMesh);
});

const torusGeo = new THREE.TorusGeometry();
const material = new THREE.MeshMatcapMaterial({
  matcap,
});

for (let i = 0; i < 500; i++) {
  const torusMesh = new THREE.Mesh(torusGeo, material);
  scene.add(torusMesh);
  torusMesh.position.x = (Math.random() - 0.5) * 100;
  torusMesh.position.z = (Math.random() - 0.5) * 100;
  torusMesh.position.y = (Math.random() - 0.5) * 100;
  torusMesh.rotation.y = Math.random() * Math.PI;
  torusMesh.rotation.x = Math.random() * Math.PI;
}

//lights
const env = new RGBELoader();
env.load(`src/squash_court_1k.hdr`, (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // scene.background = envMap;
  // scene.background = envMap;
  scene.environment = envMap;
});

//Axes Helper
// const axes = new THREE.AxesHelper(2);
// scene.add(axes);

//GUI
// gui.add(lambert, `metalness`).min(0).max(1).step(0.01);
// gui.add(lambert, `roughness`).min(0).max(1).step(0.01);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.x / sizes.y, 0.1, 500);
scene.add(camera);
camera.position.z = 18;

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
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
