import * as Cannon from 'cannon';

// Setup our world
const world = new Cannon.World();
// world.gravity.set(0, 0, -9.82); // m/s²

// Create a plane
const groundBody = new Cannon.Body({
  mass: 0 // mass == 0 makes the body static
});
const groundShape = new Cannon.Plane();

groundBody.addShape(groundShape);

// world.addBody(groundBody);

const fixedTimeStep = 1.0 / 60.0; // seconds
const maxSubSteps = 3;

// Start the simulation loop
let lastTime = Date.now();

export function step() {
  if(lastTime !== undefined){
    const dt = (Date.now() - lastTime) / 1000;
    world.step(fixedTimeStep, dt, maxSubSteps);
  }
  lastTime = Date.now();
}
// boxes[0].preStep = () => {
//   boxes[0].applyLocalForce(new Vec3(4, 0, 0), new Vec3(0, 5, 0));
// };

export { world, groundBody };