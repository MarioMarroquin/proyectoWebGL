const renderTree = () => {
  const circleRadius = 10;

  const trunkGeometry = new THREE.BoxGeometry(1, 1, 1);
  const trunkMaterial = new THREE.MeshLambertMaterial({map: trunkTexture});
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  const leaveGeometry = new THREE.BoxGeometry(1, 1, 1);
  const leaveMaterial = new THREE.MeshLambertMaterial({map: leaveTexture});
  const leave = new THREE.Mesh(leaveGeometry, leaveMaterial);

  let randomSignX = Math.round(Math.random()) === 1 ? 1 : -1;
  let randomSignY = Math.round(Math.random()) === 1 ? 1 : -1;
  let treeX = Math.random() * ((planeDimensions * percentage) / 2) * randomSignX;
  let treeY = Math.random() * ((planeDimensions * percentage) / 2) * randomSignY;

  let distance = Math.sqrt(Math.pow(treeX, 2) + Math.pow(treeY, 2));

  if (distance < circleRadius) return;

  trunk.position.set(treeX, 4, treeY);
  trunk.scale.set(1, 8, 1);

  leave.position.set(treeX, 8, treeY);
  leave.scale.set(3, 3.5, 3);

  scene.add(trunk);
  scene.add(leave);
};

const renderCampsite = () => {
  const circleRadius = 3;

  const stoneGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const stoneMaterial = new THREE.MeshPhongMaterial({ color: 0x3f330c });
  const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);

  let randomSignX = Math.round(Math.random()) === 1 ? 1 : -1;
  let randomSignY = Math.round(Math.random()) === 1 ? 1 : -1;
  let treeX = Math.random() * ((planeDimensions * percentage) / 2) * randomSignX;
  let treeY = Math.random() * ((planeDimensions * percentage) / 2) * randomSignY;

  let distance = Math.sqrt(Math.pow(treeX, 2) + Math.pow(treeY, 2));

  if (Math.floor(distance) !== circleRadius) return renderCampsite();

  stone.position.set(treeX, 0, treeY);

  scene.add(stone);
};


const scene = new THREE.Scene();
const clock = new THREE.Clock();


// create render
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


// create control to move around scene, center fix.
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();


// create plane
const planeDimensions = 100;
const percentage = 0.97;

const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
const planeTexture = new THREE.TextureLoader().load('textures/floor.jpg');
const planeMaterial = new THREE.MeshPhongMaterial({ map: planeTexture});
planeMaterial.map.wrapS =  planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
planeMaterial.map.repeat.set(10, 10);

const grass = new THREE.Mesh(planeGeometry, planeMaterial);
grass.receiveShadow = true;
grass.rotation.x = -0.5 * Math.PI;
scene.add(grass);


// create light
// const light = new THREE.DirectionalLight(0xeeffd3, 10);
// light.castShadow = false;
// light.position.set(0, 50, 10);
// scene.add(light);

// create light from above
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add(light);


// create fire for campfire, using volumetricFire script helper.
const fire = new VolumetricFire(fireWidth = 3, fireHeight = 6, fireDepth = 3, sliceSpacing = 0.5, camera);
scene.add(fire.mesh);

// you can set position, rotation and scale
// fire.mesh accepts THREE.mesh features

fire.mesh.position.set( 0, fireHeight / 2, 0 );


// load textures a single time for trees
const trunkTexture = new THREE.TextureLoader().load('textures/trunk.jpg');
const leaveTexture = new THREE.TextureLoader().load('textures/leaves.jpg');

for (let i = 0; i < 500; i++) {
  renderTree();
}


// render campfire
for (let i = 0; i < 50; i++) {
  renderCampsite();

}


function render() {
  requestAnimationFrame(render);
  controls.update();
  fire.update(clock.getElapsedTime())
  renderer.render(scene, camera);
}

render();
