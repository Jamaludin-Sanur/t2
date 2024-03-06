import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Planet } from "./Planet.js";

const countries = [
  [52.293698, 5.803912], // Netherland
  [50.589889, 4.781694], // Belgium
  [50.780563, 10.575005], // Germany
  [47.651382, 14.57285], // Austria
  [63.832647, 16.318023], // Sweden
  [65.114865, 27.091104], // Finland
  [65.644691, 12.931612], // Norway
  [56.043907, 9.230226], // Denmark
  [53.959921, 0], // uk
];

const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.z = 1.5;
  return camera;
};

const createLights = () => {
  const light1 = new THREE.AmbientLight(0x888888);

  const light2 = new THREE.DirectionalLight(0xcccccc, 1);
  light2.position.set(5, 5, 5);
  light2.castShadow = true;
  light2.shadowCameraNear = 0.01;
  light2.shadowCameraFar = 15;
  light2.shadowCameraFov = 45;
  light2.shadowCameraLeft = -1;
  light2.shadowCameraRight = 1;
  light2.shadowCameraTop = 1;
  light2.shadowCameraBottom = -1;
  light2.shadowBias = 0.001;
  light2.shadowDarkness = 0.2;
  light2.shadowMapWidth = 1024 * 2;
  light2.shadowMapHeight = 1024 * 2;

  return [light1, light2];
};

const start = () => {
  // Setup renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  // Setup scene
  const scene = new THREE.Scene();
  const camera = createCamera();
  const lights = createLights();
  const mesh = Planet.createPlanet(countries);
  scene.add(camera);
  scene.add(mesh);
  scene.add(...lights);

  // Setup control & animations
  let controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed *= 1;

  // Render
  document.body.appendChild(renderer.domElement);
  requestAnimationFrame(function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  });
};

start();
