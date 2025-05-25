const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const scene = new THREE.Scene();

const ballMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
const floorMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc});

const ballGeometry = new THREE.SphereGeometry(0.5);
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
const ball = new THREE.Mesh(ballGeometry, ballMaterial);

ball.position.x = 0;
ball.position.y = 1;
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;

const worldWidth = 10;
const worldHeight = 10;
const worldDepth = 10;
const worldGeometry = new THREE.BoxGeometry(worldWidth, worldHeight, worldDepth);
const worldMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
const world = new THREE.Mesh(worldGeometry, worldMaterial);

const light = new THREE.PointLight(0xffffff, 1, 10);
light.position.set(5, 5, 5);

const light2 = new THREE.PointLight(0x00ff00, 0.5);
light2.position.set(0, 3, 0);

const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);

scene.add(light, light2, ambientLight, ball, floor, world);

const ballSpeed = 0.1;

function animate() {
    requestAnimationFrame(animate);

    // Roll the ball logic
    if (keyIsDown(37)) {
        // Move left
        ball.position.x -= ballSpeed;
    }
    if (keyIsDown(38)) {
        // Move forward
        ball.position.z -= ballSpeed;
    }
    if (keyIsDown(39)) {
        // Move right
        ball.position.x += ballSpeed;
    }
    if (keyIsDown(40)) {
        // Move backward
        ball.position.z += ballSpeed;
    }

    // Future features:
    // - Add physics and collision detection here
    // - Check if the ball has collected all stars
    // - Update camera position to follow the ball

    renderer.render(scene, camera);
}

function keyIsDown(keyCode) {
    return keyCode in keyStates && keyStates[keyCode] === true;
}

const keyStates = {};

function onKeyDown(event) {
    keyStates[event.keyCode] = true;
}

function onKeyUp(event) {
    keyStates[event.keyCode] = false;
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

renderer.setSize(canvas.clientWidth, canvas.clientHeight);

animate();
