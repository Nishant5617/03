import * as THREE from "three";
import gsap from "gsap";

console.log(gsap);

//canvas
const canvas = document.getElementById("webgl");

//scene
const scene = new THREE.Scene();

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  100
);

camera.position.set(0, 1, 5);

//geometry
const box = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const ball = new THREE.SphereGeometry(0.5);

//material
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//group
const grp = new THREE.Group();
scene.add(grp);
grp.position.y = 1.5;
grp.scale.x = 1;

//mesh
const mesh1 = new THREE.Mesh(box, material1);
grp.add(mesh1);
const mesh2 = new THREE.Mesh(ball, material2);
// grp.add(mesh2);
// mesh1.position.set(1, 0, 0);
// mesh1.scale.set(0.5, 1, 0.5);
// mesh1.rotation.reorder(`YXZ`);
// mesh1.rotation.set(Math.PI / 4, Math.PI / 4, 0);

// console.log(grp);
// console.log(mesh1.position.distanceTo(camera.position));
// console.log(mesh1.position.distanceTo(new THREE.Vector3(0, 0, 0)));
// console.log(mesh1.rotation);

//helpers
const axesHelper = new THREE.AxesHelper(1);

//scene addition
scene.add(camera);
// scene.add(mesh1);
// scene.add(mesh2);
scene.add(axesHelper);

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// gsap.to(mesh1.position, { duration: 2, delay: 1, x: 2 });
// gsap.to(mesh1.position, { duration: 4, delay: 3, x: -2 });

renderer.render(scene, camera);

// let time = Date.now();

//clock
const clock = new THREE.Clock();

console.log(sizes);

const resetSize = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  console.log(`function called`);
  console.log(sizes.width);
  console.log(sizes.height);
};

window.onresize = resetSize;

//animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // console.log(deltaTime);

  mesh1.position.x = Math.sin(elapsedTime);
  // grp.rotation.y = Math.cos(elapsedTime);
  camera.lookAt(mesh1.position);
  // camera.position.x = Math.cos(elapsedTime);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
