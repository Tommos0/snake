import * as Three from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

const renderer = new Three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(60, 0, 10);
camera.up = new Three.Vector3(0,0,1);

const axesHelper = new Three.AxesHelper( 5 );

const controls = new TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.target = new Three.Vector3(0, 0, 10);

export { controls, scene, axesHelper, renderer, camera }