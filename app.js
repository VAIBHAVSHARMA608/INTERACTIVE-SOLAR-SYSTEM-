import * as THREE from './libs/three/three.module.js';
import { OrbitControls } from './libs/three/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // increase intensity
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 5, 200);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load textures
const textureLoader = new THREE.TextureLoader();

// Set background
scene.background = textureLoader.load('textures/background.webp');

const sunTexture = textureLoader.load('textures/sun.webp');
const mercuryTexture = textureLoader.load('textures/mercury.jpg');
const venusTexture = textureLoader.load('textures/venus.jpg');
const earthTexture = textureLoader.load('textures/earth.jpg');
const marsTexture = textureLoader.load('textures/mars.jpg');
const jupiterTexture = textureLoader.load('textures/jupiter.jpg');
const saturnTexture = textureLoader.load('textures/saturn.jpg');
const uranusTexture = textureLoader.load('textures/uranus.jpg');
const neptuneTexture = textureLoader.load('textures/neptune.jpg');
const saturnRingTexture = textureLoader.load('textures/saturn ring.jpg');
const uranusRingTexture = textureLoader.load('textures/uranus ring.jpg');

// Sun
const geometry = new THREE.SphereGeometry(1.5, 64, 32);
const material = new THREE.MeshBasicMaterial({ map: sunTexture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
camera.position.set(0, 60, 0);
camera.lookAt(0, 0, 0);

// Add a light source to the scene
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);

// Create a UI panel for sliders and labels
const uiPanel = document.createElement('div');
uiPanel.style.position = 'absolute';
uiPanel.style.top = '10px';
uiPanel.style.left = '10px';
uiPanel.style.background = 'rgba(255,255,255,0.8)';
uiPanel.style.padding = '10px';
uiPanel.style.borderRadius = '8px';
uiPanel.style.zIndex = '10';
document.body.appendChild(uiPanel);

// --- Add sliders and nametags for all planets ---
const planetData = [
  // [name, texturePath, orbitRadius, size, axialSpeed, orbitalSpeed, hasRing, ringInner, ringOuter, ringTexturePath]
  ['Mercury', 'textures/mercury.jpg', 5, 0.5, 0.02, 0.001, false],
  ['Venus', 'textures/venus.jpg', 8, 0.6, 0.015, 0.005, false],
  ['Earth', 'textures/earth.jpg', 11, 0.65, 0.017, 0.004, false],
  ['Mars', 'textures/mars.jpg', 14, 0.55, 0.018, 0.003, false],
  ['Jupiter', 'textures/jupiter.jpg', 18, 1.2, 0.019, 0.002, false],
  ['Saturn', 'textures/saturn.jpg', 22, 1.1, 0.02, 0.0015, true, 1.5, 2.0, 'textures/saturn ring.jpg'],
  ['Uranus', 'textures/uranus.jpg', 26, 0.9, 0.021, 0.0012, true, 1.2, 1.6, 'textures/uranus ring.jpg'],
  ['Neptune', 'textures/neptune.jpg', 30, 0.85, 0.022, 0.001, false]
];

const planetOrbits = [];
const planetSpheres = [];
const planetAxialSpeeds = [];
const planetOrbitalSpeeds = [];
const planetSpeedSliders = [];
const planetNametags = [];

function createOrbitLine(radius, color = 0xffffff) {
  const segments = 256;
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    positions.push(
      Math.cos(theta) * radius,
      0,
      Math.sin(theta) * radius
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.18 // more subtle
  });
  return new THREE.Line(geometry, material);
}

const orbitColors = [
  0xcccccc, // Mercury
  0xe0e0e0, // Venus
  0x99ccff, // Earth
  0xff9966, // Mars
  0xffcc99, // Jupiter
  0xffe5b4, // Saturn
  0xb3e0ff, // Uranus
  0x99b3ff  // Neptune
];

planetData.forEach(([name, texPath, orbitRadius, size, axialSpeed, orbitalSpeed, hasRing, ringInner, ringOuter, ringTexturePath], idx) => {
  const orbit = new THREE.Group();
  scene.add(orbit);

  const texture = textureLoader.load(texPath);
  const geometry = new THREE.SphereGeometry(size, 64, 32);
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 10
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = orbitRadius;
  orbit.add(sphere);

  // Add rings for Saturn and Uranus with texture
  if (hasRing && ringTexturePath) {
    const ringTexture = textureLoader.load(ringTexturePath);
    const ringGeometry = new THREE.RingGeometry(ringInner, ringOuter, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.x = orbitRadius;
    ring.rotation.x = Math.PI / 2;
    ring.name = 'ring';
    orbit.add(ring);
    sphere.userData.hasRing = true;
  } else {
    sphere.userData.hasRing = false;
  }

  const orbitLine = createOrbitLine(orbitRadius, orbitColors[idx] || 0xffffff);
  scene.add(orbitLine);

  // Create speed slider for this planet
  const sliderLabel = document.createElement('label');
  sliderLabel.textContent = name + ' Speed: ';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '0.02';
  slider.step = '0.0001';
  slider.value = orbitalSpeed;
  slider.style.width = '100px';
  sliderLabel.appendChild(slider);
  uiPanel.appendChild(sliderLabel);
  uiPanel.appendChild(document.createElement('br'));

  planetOrbits.push(orbit);
  planetSpheres.push(sphere);
  planetAxialSpeeds.push(axialSpeed);
  planetOrbitalSpeeds.push(parseFloat(slider.value));
  planetSpeedSliders.push(slider);

  // Update speed when slider changes
  slider.addEventListener('input', () => {
    planetOrbitalSpeeds[idx] = parseFloat(slider.value);
  });

  // Create nametag for this planet
  const nametag = document.createElement('div');
  nametag.textContent = name;
  nametag.style.position = 'absolute';
  nametag.style.color = '#222';
  nametag.style.fontWeight = 'bold';
  nametag.style.pointerEvents = 'none';
  nametag.style.fontSize = '14px';
  nametag.style.textShadow = '0 0 4px #fff';
  document.body.appendChild(nametag);
  planetNametags.push({ nametag, orbitRadius, sphere });
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minPolarAngle = Math.PI / 2.5;
controls.target.set(0, 0, 0);
controls.update();

function animate() {
  sphere.rotation.y += 0.001; // Sun axial rotation
  // Animate all planets
  for (let i = 0; i < planetSpheres.length; i++) {
    const orbit = planetOrbits[i];
    const sphere = planetSpheres[i];
    const speed = planetOrbitalSpeeds[i];

    // Rotate the orbit group to move the planet and rings
    orbit.rotation.y += speed;

    // Update nametag position based on planet's world position
    const worldPosition = new THREE.Vector3();
    sphere.getWorldPosition(worldPosition);
    const vector = worldPosition.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
    const nametag = planetNametags[i].nametag;
    nametag.style.left = `${x - nametag.offsetWidth / 2}px`;
    nametag.style.top = `${y - 30}px`;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
  camera.aspect = window.innerWidth / window.innerHeight;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();