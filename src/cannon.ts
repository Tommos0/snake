import * as CANNON from 'cannon';
import Vec3 = CANNON.Vec3;

// Setup our world
var world = new CANNON.World();
world.gravity.set(0, 0, -9.82); // m/s²

export const boxes: CANNON.Body[] = [];

for (let i=0; i<3; i++) {
  var size = .5; // m
  var boxShape = new CANNON.Box(new CANNON.Vec3(size,size*4,size));
  var boxBody = new CANNON.Body({ mass: 1 });
  boxBody.addShape(boxShape);
  boxBody.position.set(0, size*10*i, 3);
  boxes.push(boxBody);
  world.addBody(boxBody);
}

for (let i=0; i<boxes.length -1; i++) {
  const c = new CANNON.PointToPointConstraint(boxes[i], new Vec3(0, size*5, 0), boxes[i+1], new Vec3(0,-size*5,0));
  // c.collideConnected = false;
  world.addConstraint(c);
}

// Create a sphere


// Create a plane
var groundBody = new CANNON.Body({
  mass: 0 // mass == 0 makes the body static
});
var groundShape = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

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
boxes[0].preStep = () => {
  // boxes[0].applyLocalForce(new Vec3(4, 0, 0), new Vec3(0, 5, 0));
};


console.log(boxBody);