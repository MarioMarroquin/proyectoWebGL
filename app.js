const scene = new THREE.Scene();

const planeDimensions = 100;
const percentage = 0.97;

const renderCampsite = () => {
  const circleRadius = 3;
  const trunkGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x3f330c });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  const randomSignX = Math.round(Math.random()) === 1 ? 1 : -1;
  const randomSignY = Math.round(Math.random()) === 1 ? 1 : -1;
  const treeX =
    Math.random() * ((planeDimensions * percentage) / 2) * randomSignX;
  const treeY =
    Math.random() * ((planeDimensions * percentage) / 2) * randomSignY;

  const distance = Math.sqrt(Math.pow(treeX - 0, 2) + Math.pow(treeY - 0, 2));

  console.log(treeX);
  if (Math.floor(distance) !== circleRadius) return renderCampsite();

  trunk.position.set(treeX - 0.5, 0.5, treeY - 0.5);
  return trunk;
};

const renderTree = () => {
  const circleRadius = 10;
  const trunkGeometry = new THREE.BoxGeometry(1, 1, 1);
  const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x3f330c });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  const randomSignX = Math.round(Math.random()) === 1 ? 1 : -1;
  const randomSignY = Math.round(Math.random()) === 1 ? 1 : -1;
  const treeX =
    Math.random() * ((planeDimensions * percentage) / 2) * randomSignX;
  const treeY =
    Math.random() * ((planeDimensions * percentage) / 2) * randomSignY;

  const distance = Math.sqrt(Math.pow(treeX - 0, 2) + Math.pow(treeY - 0, 2));

  console.log(treeX);
  if (distance < circleRadius) return;

  trunk.position.set(treeX - 0.5, 4, treeY - 0.5);
  trunk.scale.set(1, 8, 1);
  return trunk;
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
camera.position.y = 40;
camera.position.x = 0;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// create plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x61904 });
const grass = new THREE.Mesh(planeGeometry, planeMaterial);
grass.receiveShadow = true;
grass.rotation.x = -0.5 * Math.PI;
scene.add(grass);

// create light
const light = new THREE.DirectionalLight(0xeeffd3, 10);
light.castShadow = false;
light.position.set(0, 50, 10);
scene.add(light);

for (let i = 0; i < 500; i++) {
  const trunk = renderTree();
  scene.add(trunk);
}

for (let i = 0; i < 50; i++) {
  const rock = renderCampsite();
  scene.add(rock);
}

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

render();
