import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};

//cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener(`mousemove`, (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = -(event.clientY / window.innerHeight - 0.5);
  //   console.log(`${cursor.x} ,${cursor.y}`);
});

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(50, sizes.x / sizes.y, 0.1, 100);
camera.position.z = 4;

scene.add(camera);

//geometry
const geo = new THREE.BoxGeometry(1, 1, 1);

//material
const mat = new THREE.MeshBasicMaterial({ color: 0x0000ee });

//mesh
const mesh = new THREE.Mesh(geo, mat);
// mesh.position.y = 2;
scene.add(mesh);

//axes helper
const axes = new THREE.AxesHelper(1);
scene.add(axes);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(`webgl`),
});
renderer.setSize(sizes.x, sizes.y);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, document.getElementById(`webgl`));
controls.target.y = mesh.position.y;
controls.enableDamping = true;

window.addEventListener(`resize`, (event) => {
  sizes.x = window.innerWidth;
  sizes.y = window.innerHeight;
  renderer.setSize(sizes.x, sizes.y);
  camera.aspect = sizes.x / sizes.y;
  camera.updateProjectionMatrix();
});

//animation
const tick = () => {
  //update camera
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);
  //   console.log(camera.position);
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
