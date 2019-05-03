import './style.css';

import { groundBody, step, world } from './world';
import { Snake } from './snake';
import * as Cannon from 'cannon';
import { camera, controls, renderer, scene } from './scene';
import { getMeshes, syncMeshesWithBodies } from './utils';

import * as dat from 'dat.gui';
import * as Three from 'three';

let snake;
let meshes;

const settings = {
  floor: true,
  gravity: true,
  segments: 100,
  reset: () => {
    snake.bodies.forEach(body => world.remove(body));
    snake.constraints.forEach(constraint => world.removeConstraint(constraint));
    meshes.forEach(mesh => scene.remove(mesh));
    init();
  },
  fly: () => {
    snake.bodies[0].velocity.set(
      (Math.random() - .5) * 50,
      (Math.random() - .5) * 50,
      (Math.random() - .5) * 50
    );
  }
};

function init() {
  snake = new Snake(2, 0.4, 1, new Cannon.Vec3(0, 0, 1), [
    ...Array.apply(null, {length: settings.segments}).map(
      _ => new Cannon.Vec3(Math.random()-.5, Math.random()-.5, Math.random()-.5)
    ),
  ]);

  snake.bodies.forEach(body => world.addBody(body));
  snake.constraints.forEach(constraint => world.addConstraint(constraint));

  meshes = getMeshes(snake);
  meshes.forEach(mesh => scene.add(mesh));

  controls.target = new Three.Vector3(0, settings.segments / 10, 10);

  world.remove(groundBody);
  if (settings.floor) {
    world.addBody(groundBody)
  }
  world.gravity.set(0, 0, settings.gravity ? -9.82 : 0)
}

init();

let t = 0;
function animate() {
  t += 1;
  requestAnimationFrame( animate );
  syncMeshesWithBodies(meshes, snake);
  controls.update();
  renderer.render( scene, camera );
  step();
}
animate();

const gui = new dat.GUI();

gui.add(settings, 'gravity');
gui.add(settings, 'floor');
gui.add(settings, 'segments');
gui.add(settings, 'fly');
gui.add(settings, 'reset');

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