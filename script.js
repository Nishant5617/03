import * as THREE from "three";
import { WebGL } from "three/examples/jsm/Addons.js";

//canvas
const canvas = document.getElementById("webgl");

//scene
const scene = new THREE.Scene();

const sizes = {
  width: 1000,
  height: 1000,
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
grp.add(mesh2);
mesh1.position.set(1, 0, 0);
// mesh1.scale.set(0.5, 1, 0.5);
// mesh1.rotation.reorder(`YXZ`);
// mesh1.rotation.set(Math.PI / 4, Math.PI / 4, 0);

console.log(grp);
// console.log(mesh1.position.distanceTo(camera.position));
// console.log(mesh1.position.distanceTo(new THREE.Vector3(0, 0, 0)));
// console.log(mesh1.rotation);

camera.lookAt(grp.position);

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

renderer.render(scene, camera);
