const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 20;
camera.position.y = 40;
camera.position.x = 0;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// create plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0x61904});
const grass = new THREE.Mesh(planeGeometry, planeMaterial);
grass.receiveShadow = true;
grass.rotation.x = -0.5 * Math.PI;
scene.add(grass);

// create light
const light = new THREE.DirectionalLight( 0xEEFFD3, 10);
light.castShadow = true;
light.position.set(0, 50, 10);
scene.add( light );




for(let i = 0; i < 10; i++) {
    const trunkGeometry = new THREE.BoxGeometry( 1, 1, 1);
    const trunkMaterial = new THREE.MeshPhongMaterial( { color: 0x3f330c} );
    const trunk = new THREE.Mesh( trunkGeometry, trunkMaterial );
    trunk.position.set(Math.random() * 20 * Math.PI, 0.5, (Math.random() * 20 * Math.PI));
    scene.add(trunk);
}


function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

render();
