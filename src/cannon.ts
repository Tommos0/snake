import * as Cannon from 'cannon';

// Setup our world
const world = new Cannon.World();
// world.gravity.set(0, 0, -9.82); // m/s²

// Create a plane
var groundBody = new Cannon.Body({
  mass: 0 // mass == 0 makes the body static
});
var groundShape = new Cannon.Plane();
groundBody.addShape(groundShape);
// world.addBody(groundBody);

var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

// Start the simulation loop
var lastTime = Date.now();
export function step() {
  if(lastTime !== undefined){
    var dt = (Date.now() - lastTime) / 1000;
    world.step(fixedTimeStep, dt, maxSubSteps);
  }
  // console.log("Sphere z position: " + boxBody.position.z);
  lastTime = Date.now();
  // boxes[0].force;
  // console.log(boxes[0].pointToWorldFrame(new Vec3(0, 0, 0))) //.quaternion.w = 0.5;
}
// boxes[0].preStep = () => {
//   boxes[0].applyLocalForce(new Vec3(4, 0, 0), new Vec3(0, 5, 0));
// };


// console.log(boxBody);
export { world };