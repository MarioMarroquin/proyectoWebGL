// Sky world
const skyBox = () => {
  // render Skybox
  let SkyCube = [];
  let texture_ft = new THREE.TextureLoader().load( 'sky/sleepyhollow_ft.jpg');
  let texture_bk = new THREE.TextureLoader().load( 'sky/sleepyhollow_bk.jpg');
  let texture_up = new THREE.TextureLoader().load( 'sky/sleepyhollow_up.jpg');
  let texture_dn = new THREE.TextureLoader().load( 'sky/sleepyhollow_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( 'sky/sleepyhollow_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( 'sky/sleepyhollow_lf.jpg');

  SkyCube.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  SkyCube.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  SkyCube.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  SkyCube.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  SkyCube.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  SkyCube.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++)
    SkyCube[i].side = THREE.BackSide;

  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, SkyCube );
  scene.add(skybox);
};

// Spawn árboles
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
  trunk.scale.set(1.5, 12, 1.5);

  leave.position.set(treeX, 12, treeY);
  leave.scale.set(3, 5, 3);

  scene.add(trunk);
  scene.add(leave);
};

// Spawn fogata (piedras)
const renderCampsite = () => {
  const circleRadius = 2;

  let randomSignX = Math.round(Math.random()) === 1 ? 1 : -1;
  let randomSignY = Math.round(Math.random()) === 1 ? 1 : -1;
  let treeX = Math.random() * ((planeDimensions * percentage) / 2) * randomSignX;
  let treeY = Math.random() * ((planeDimensions * percentage) / 2) * randomSignY;

  let distance = Math.sqrt(Math.pow(treeX, 2) + Math.pow(treeY, 2));

  if (Math.floor(distance) !== circleRadius) return renderCampsite();

  // Se cargan el objeto y el material (creados con vectary).
  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('textures/Stone.mtl', function (materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('textures/Stone.obj', function (object) {
      object.scale.set(0.1, 0.1, 0.1);
      object.position.set(treeX, -0.1, treeY + 1);
      scene.add(object);
    });
  });
};

// Crea los 4 troncos debajo del fuego. (creado con vectary).
const renderCoal = () => {
  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('textures/matWood.mtl', function (materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load('textures/wood.obj', function (object) {
      object.scale.set(0.3, 0.3, 0.3);
      object.position.set(0, -0.1, -1);

      const text = new THREE.TextureLoader().load('textures/grad.jpg');
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = text;
        }
      });
      scene.add(object);
    });

    objLoader.load('textures/wood.obj', function (object) {
      object.scale.set(0.3, 0.3, 0.3);
      object.position.set(0.5, -0.1, -1);

      const text = new THREE.TextureLoader().load('textures/grad.jpg');
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = text;
        }
      });
      scene.add(object);
    });

    objLoader.load('textures/wood.obj', function (object) {
      object.scale.set(0.3, 0.3, 0.3);
      object.position.set(0.5, -0.1, -1);
      object.rotation.x = 50;
      object.rotation.y = 50;

      const text = new THREE.TextureLoader().load('textures/grad.jpg');
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = text;
        }
      });
      scene.add(object);
    });

    objLoader.load('textures/wood.obj', function (object) {
      object.scale.set(0.3, 0.3, 0.3);
      object.position.set(-0.5, -0.1, -1);
      object.rotation.x = 0;
      object.rotation.y = 0;
      object.rotation.z = 0;

      const text = new THREE.TextureLoader().load('textures/grad.jpg');
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = text;
        }
      });
      scene.add(object);
    });

  });
};

const musica = () => {
  // Pone la música de fondo.
  const soundM = new THREE.Audio(listener);
  const audioLoaderM = new THREE.AudioLoader();
  audioLoaderM.load('sound/STAY.wav', function(buffer) {
    soundM.setBuffer(buffer);
    soundM.setLoop(true);
    soundM.setVolume(0.2);
    soundM.play();
  });
};

const bosqueEfectos = () => {
  // Pone los efectos del bosque con grillos.
  const soundF = new THREE.Audio(listener);
  const audioLoaderF = new THREE.AudioLoader();
  audioLoaderF.load('sound/forest.wav', function(buffer) {
    soundF.setBuffer(buffer);
    soundF.setLoop(true);
    soundF.setVolume(0.3);
    soundF.play();
  });
};

const fuegoEfectos = () => {
  // Audio posicional, de acuerdo a distancia se oye más o menos la fogata.
  const soundC = new THREE.PositionalAudio(listener);
  const audioLoaderC = new THREE.AudioLoader();
  audioLoaderC.load('sound/fire.wav', function(buffer) {
    soundC.setBuffer(buffer);
    soundC.setLoop(true);
    soundC.setVolume(1);
    soundC.setRefDistance(10);
    soundC.play();
  });

  // La esfera simula la fogata para que el sonido parta de ahí.
  const sphere = new THREE.SphereGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
  const mesh = new THREE.Mesh( sphere, material );
  scene.add( mesh );
  mesh.add( soundC );
};

// create scene
const scene = new THREE.Scene();
const clock = new THREE.Clock();


// create render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 25;
camera.position.y = 40;
camera.position.x = 0;

// create control to move around scene, center fix.
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Limitar lo que se puede mover la cámara
controls.minDistance = 7;
controls.maxDistance = 40;
controls.minPolarAngle = 0.6;
controls.maxPolarAngle = 1.44;
controls.update();

// create listener added to cam.
const listener = new THREE.AudioListener();
camera.add(listener);

// Start sound effects and music
musica();
bosqueEfectos();
fuegoEfectos();

// create plane and render sky
const planeDimensions = 100;
const percentage = 0.97;

const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
const planeTexture = new THREE.TextureLoader().load('textures/floor.jpg');
const planeMaterial = new THREE.MeshLambertMaterial({ map: planeTexture});
planeMaterial.map.wrapS =  planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
planeMaterial.map.repeat.set(10, 10);

const grass = new THREE.Mesh(planeGeometry, planeMaterial);
grass.receiveShadow = true;
grass.rotation.x = -0.5 * Math.PI;
scene.add(grass);
skyBox();


const lightGeneral = new THREE.AmbientLight( 0x545252 ); // iluminate scene
scene.add(lightGeneral);

const lightMoon = new THREE.PointLight( 0xB2B2B2, 2, 85 ); // Simular la luz de la luna
lightMoon.position.set( 50, 50, 15 );
scene.add(lightMoon);

const lightFire = new THREE.PointLight( 0xE58300, 2, 30 ); // Luz que simula luz de fuego.
lightFire.position.set(0, 2, 0);
scene.add(lightFire);


// create fire for campfire, using volumetricFire script helper.
const fire = new VolumetricFire(fireWidth = 3, fireHeight = 6, fireDepth = 3, sliceSpacing = 0.5, camera);
scene.add(fire.mesh);
fire.mesh.position.set( 0, fireHeight / 2, 0 );


// load textures a single time for trees
const trunkTexture = new THREE.TextureLoader().load('textures/trunk.jpg');
const leaveTexture = new THREE.TextureLoader().load('textures/leafes.jpg');

for (let i = 0; i < 500; i++) {
  renderTree();
}

// render campfire
for (let i = 0; i < 50; i++) {
  renderCampsite();
}

// render fire wood.
renderCoal();


function render() {
  requestAnimationFrame(render);
  controls.update();
  fire.update(clock.getElapsedTime())
  renderer.render(scene, camera);
}

render();
