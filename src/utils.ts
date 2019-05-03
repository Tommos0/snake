import { Snake } from './snake';
import * as Three from 'three';

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getMeshes(snake: Snake): Three.Mesh[] {
  const meshes: Three.Mesh[] = [];
  for (let i=0; i<snake.bodies.length; i++) {
    const geometry = new Three.BoxGeometry(snake.segmentLength, snake.segmentWidth, snake.segmentWidth);
    const r = 255 - Math.floor(255 * i / snake.bodies.length);
    const g = 0;
    const b = Math.floor(255 * i / snake.bodies.length);
    const material = new Three.MeshBasicMaterial({color: rgbToHex(r, g, b), wireframe: true});
    const mesh = new Three.Mesh(geometry, material);
    meshes.push(mesh);
  }
  return meshes
}

export function syncMeshesWithBodies(meshes: Three.Mesh[], snake: Snake) {
  for (let i = 0; i < snake.bodies.length; i++) {
    const mesh = meshes[i];
    const body = snake.bodies[i];
    mesh.position.x = body.position.x;
    mesh.position.y = body.position.y;
    mesh.position.z = body.position.z;
    mesh.quaternion.x = body.quaternion.x;
    mesh.quaternion.y = body.quaternion.y;
    mesh.quaternion.z = body.quaternion.z;
    mesh.quaternion.w = body.quaternion.w;
  }
}