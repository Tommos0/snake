import * as Cannon from "cannon";

export interface ISnake {
  bodies: Cannon.Body[];
  constraints: Cannon.Constraint[];
  segmentLength: number;
  segmentWidth: number;
  segmentSpacing: number;
}

export function segmentBase(snake: ISnake, segment: number = 0): Cannon.Vec3 {
  return snake.bodies[segment].pointToWorldFrame(
    new Cannon.Vec3(-snake.segmentLength/2, 0, 0)
  );
}

export function segmentEnd(snake: ISnake, segment: number = 0): Cannon.Vec3 {
  return snake.bodies[segment].pointToWorldFrame(
    new Cannon.Vec3(+snake.segmentLength/2, 0, 0)
  );
}

export function createSnake(
  segmentLength: number,
  segmentWidth: number,
  segmentSpacing: number,
  startPosition: Cannon.Vec3,
  angles: Cannon.Vec3[],
): ISnake {
  const snake: ISnake = {
    segmentLength,
    segmentWidth,
    segmentSpacing,
    bodies: [],
    constraints: [],
  };

  for (let i=0; i<angles.length; i++) {
    const box = new Cannon.Box(new Cannon.Vec3(segmentLength/2, segmentWidth/2, segmentWidth/2));
    const body = new Cannon.Body({ mass: 1 });
    body.addShape(box);
    snake.bodies.push(body);

    // set initial rotation
    body.quaternion.setFromVectors(
      new Cannon.Vec3(1,0,0),
      angles[i],
    );

    body.position.set(0,0,0);

    const start = segmentBase(snake, i);
    if (i == 0) {
      body.position = startPosition.vsub(start);
    } else {
      const lastSegmentEnd = segmentEnd(snake, i-1);

      // unit vector from previous segment start pointing at segment end.
      const directionFromLastSegment = lastSegmentEnd.vsub(segmentBase(snake, i-1)).unit();

      // multiply with segmentSpacing to get offset vector
      const offset = directionFromLastSegment.scale(snake.segmentSpacing);
      body.position = lastSegmentEnd.vsub(start).vadd(offset);

      const constraint = new Cannon.PointToPointConstraint(
        body,
        new Cannon.Vec3(-(snake.segmentLength + snake.segmentSpacing) / 2, 0, 0),
        snake.bodies[i-1],
        new Cannon.Vec3((snake.segmentLength + snake.segmentSpacing) / 2, 0, 0),
      );
      constraint.collideConnected = true;
      snake.constraints.push(
        constraint
      );
    }

    // c.collideConnected = false;

  }




  // const test: Cannon.Vec3 = new Three.Vector3(1,2,3);
  // body.quaternion.set
  // mesh.quaternion.setFromEuler(new Three.Euler(angles[0].x, angles[0].y));
  // mesh.rotateX(Math.PI/2);
  // mesh.quaternion.setFromEuler(new Three.Euler(5, 5));
  return snake;
  // for (const angle of angles) {
  //
  // }
}