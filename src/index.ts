import * as THREE from 'three';
import './style.css';

import * as dat from 'dat.gui';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { boxes, step } from './cannon';




const scene = new THREE.Scene();
const camera = window.camera =  new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(5, 5, 0);
camera.up = new THREE.Vector3(0,0,1);
camera.lookAt(1, 0, 21);
// camera.rotation.set(3, 0, 3);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );





var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );








const controls = new TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.addEventListener( 'change', render );



const threeBoxes = [];
for (let box of boxes) {
  var geometry = new THREE.BoxGeometry( 1, 4, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
// var material = new THREE.LineDashedMaterial( { color: 0x00ff00, linewidth: 0.01 } );
  var cube = new THREE.Mesh( geometry, material );
  threeBoxes.push(cube);
  scene.add( cube );
}



let t = 0;
function animate() {
  t += 1;
  requestAnimationFrame( animate );
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
  render();
  step();


  for (let i=0; i<boxes.length; i++) {
    threeBoxes[i].position.x = boxes[i].position.x;
    threeBoxes[i].position.y = boxes[i].position.y;
    threeBoxes[i].position.z = boxes[i].position.z;
    threeBoxes[i].quaternion.x = boxes[i].quaternion.x;
    threeBoxes[i].quaternion.y = boxes[i].quaternion.y;
    threeBoxes[i].quaternion.z = boxes[i].quaternion.z;
    threeBoxes[i].quaternion.w = boxes[i].quaternion.w;
  }

  // cube.position.x = 0.01*(t%100);
}
function render() {
  renderer.render( scene, camera );
}
animate();


var gui = new dat.GUI();
gui.add(cube.position, 'x', -10, 10).listen();


// THREE.Camera

document.addEventListener('keypress', e => {
  if (e.key === 'r') {
    for (let box of boxes) {
      // box.position.x = 0;
      // box.position.y = 0;
      box.position.z = 5;

    }
  }
  if (e.key === 't') {
      boxes[0].position.z = 5;
  }
});