import * as Three from 'three';
import './style.css';

import * as dat from 'dat.gui';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { world, step } from './cannon';
import { createSnake, ISnake } from './snake';
import * as Cannon from "cannon";


const scene = new Three.Scene();
const camera = window.camera =  new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(20, 0, 10);
camera.up = new Three.Vector3(0,0,1);
// camera.lookAt(new Three.Vector3(100,0,100));
// camera.rotation.set(3, 0, 3);
const renderer = new Three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var axesHelper = new Three.AxesHelper( 5 );
// scene.add( axesHelper );

const controls = new TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.target = new Three.Vector3(0, 0, 10);
controls.addEventListener( 'change', render );

const snake = createSnake(2, 0.4, 1, new Cannon.Vec3(0, 0, 1), [
  new Cannon.Vec3(0, 1, 1),
  new Cannon.Vec3(0, 0, 1),
  ...Array.from(Array(100).keys()).map(a => new Cannon.Vec3(Math.random()-.5, Math.random()-.4, Math.random()-.5))
]);

snake.bodies.forEach(body => world.addBody(body));
snake.constraints.forEach(constraint => world.addConstraint(constraint));

function getMeshes(snake: ISnake): Three.Mesh[] {
  const meshes: Three.Mesh[] = [];
  for (const body of snake.bodies) {
    const geometry = new Three.BoxGeometry( snake.segmentLength, snake.segmentWidth, snake.segmentWidth );
    const material = new Three.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    const mesh = new Three.Mesh( geometry, material );
    meshes.push(mesh);
  }
  return meshes
}

const snakeWithMeshes = {
  snake,
  meshes: getMeshes(snake),
};

snakeWithMeshes.meshes.forEach(mesh => scene.add(mesh));

let t = 0;
function animate() {
  t += 1;
  requestAnimationFrame( animate );

  controls.update();
  render();
  step();

  for (let i=0; i<snake.bodies.length; i++) {
    const mesh = snakeWithMeshes.meshes[i];
    const body = snakeWithMeshes.snake.bodies[i];
    mesh.position.x   = body.position.x;
    mesh.position.y   = body.position.y;
    mesh.position.z   = body.position.z;
    mesh.quaternion.x = body.quaternion.x;
    mesh.quaternion.y = body.quaternion.y;
    mesh.quaternion.z = body.quaternion.z;
    mesh.quaternion.w = body.quaternion.w;
  }
}

function render() {
  renderer.render( scene, camera );
}
animate();

//
// var gui = new dat.GUI();
// gui.add(cube.position, 'x', -10, 10).listen();
//
//
// // THREE.Camera
//
// document.addEventListener('keypress', e => {
//   if (e.key === 'r') {
//     for (let box of boxes) {
//       // box.position.x = 0;
//       // box.position.y = 0;
//       box.position.z = 5;
//
//     }
//   }
//   if (e.key === 't') {
//       boxes[0].position.z = 5;
//   }
// });