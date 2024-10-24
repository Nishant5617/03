import * as THREE from "three";
import { GlitchPass, OrbitControls, OutputPass, RenderPass, RenderPixelatedPass, SSAARenderPass, SSAOPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { ARButton } from "three/examples/jsm/Addons.js";
import "./styles.css";


const button = ARButton.createButton()
document.body.appendChild(button)
//Base
const canvas = document.getElementById(`webgl`);

const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

//Texture Images
const textureLoader = new THREE.TextureLoader();
const image2 = textureLoader.load(`models/beige.jpg`);
image2.flipY = false;
const image3 = textureLoader.load(`models/brown.jpg`);
image3.flipY = false;
const imageObject = {
  image1: null,
  image2: image2,
  image3: image3,
};

const images = {};

//Materials

//Objects
let gltfMesh;
const gltfLoader = new GLTFLoader();
const sofa = gltfLoader.load(`models/grey.glb`, (gltf) => {
  scene.add(gltf.scene);
  gltfMesh = gltf.scene.children[0];
  // console.log(gltfMesh);
  gltf.scene.children[0].castShadow = true;
  imageObject.image1 = gltf.scene.children[0].material.map;

  const gui = new GUI();
  gui
    .add(images, `image`, imageObject)
    .onChange((value) => {
      gltfMesh.material.map = value;
    })
    .name(`material type`);
});

// const box = new THREE.Mesh(
//   new THREE.BoxGeometry(),
//   new THREE.MeshBasicMaterial()
// );
// box.position.y = 0.5;
// box.castShadow = true;
// scene.add(box)
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.ShadowMaterial({ opacity: 0.2 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.x / sizes.y);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = -2;

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1, 5);
// pointLight.position.y = 1.5;
// pointLight.position.x = 1;
// scene.add(pointLight);
// pointLight.castShadow = true;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x = 0.5;
directionalLight.castShadow = true;
scene.add(directionalLight);

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.far = 2;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);

directionalLight.shadow.radius = 3;

// scene.add(directionalLightCameraHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
// scene.add(pointLightHelper);

//GUI
// const gui = new GUI();
// gui.add(images, `image`, imageObject).onChange((value) => {});

//Controls
const cameraController = new OrbitControls(camera, canvas);
cameraController.enableDamping = true;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.x, sizes.y);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);


//Post Processing
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
// const pixelate = new RenderPixelatedPass(8, scene,camera)
// composer.addPass(pixelate)
// console.log(renderPass);
// const glitchPass = new GlitchPass()
// composer.addPass(glitchPass)
// const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
// console.log(bloomPass);
// composer.addPass(bloomPass)
const ssao = new SSAOPass(scene, camera)
composer.addPass(ssao)
const ssaa = new SSAARenderPass(scene,camera)
composer.addPass(ssaa)
const outPass = new OutputPass()
composer.addPass(outPass)

//Resizing
window.addEventListener(`resize`, () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight)
});

//Animation
const tick = () => {
  cameraController.update();

  window.requestAnimationFrame(tick);

  composer.render()
};

tick();
