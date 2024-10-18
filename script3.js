import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import GUI from "lil-gui";

document.querySelector(`title`).textContent = `Debug`;

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
const geo = new THREE.BoxGeometry();

//Material
debugObject.color = `#ff5733`;
const mat = new THREE.MeshBasicMaterial({ color: debugObject.color });

//Mesh
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//GUI Creation
gui.add(mesh.position, `y`).min(-3).max(3).step(0.01).name(`elavation`);
gui.add(mesh, `visible`);
gui.add(mat, `wireframe`);
gui.addColor(debugObject, `color`).onChange((value) => {
  mat.color.set(debugObject.color);
});
debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};
gui.add(debugObject, "spin");
debugObject.subdivision = 2;
gui
  .add(debugObject, `subdivision`)
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
  });

//Hide GUI
gui.hide();
window.addEventListener(`keydown`, (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});

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
