import * as Cannon from "cannon";

export class Snake {
  segmentLength: number;
  segmentWidth: number;
  segmentSpacing: number;
  bodies: Cannon.Body[];
  constraints: Cannon.Constraint[];

  constructor(segmentLength: number,
              segmentWidth: number,
              segmentSpacing: number,
              startPosition: Cannon.Vec3,
              segmentVectors: Cannon.Vec3[]) {
    this.segmentLength = segmentLength;
    this.segmentWidth = segmentWidth;
    this.segmentSpacing = segmentSpacing;
    this.bodies = [];
    this.constraints = [];

    for (let i = 0; i < segmentVectors.length; i++) {
      const box = new Cannon.Box(new Cannon.Vec3(segmentLength / 2, segmentWidth / 2, segmentWidth / 2));
      const body = new Cannon.Body({mass: 1});
      body.addShape(box);
      this.bodies.push(body);

      // set initial rotation
      body.quaternion.setFromVectors(
        new Cannon.Vec3(1, 0, 0),
        segmentVectors[i],
      );

      const start = this.segmentBase(i);
      if (i == 0) {
        body.position = startPosition.vsub(start);
      } else {
        const lastSegmentEnd = this.segmentEnd(i - 1);

        // unit vector from previous segment start pointing at segment end.
        const directionFromLastSegment = lastSegmentEnd.vsub(this.segmentBase(i - 1)).unit();

        // multiply with segmentSpacing to get offset vector
        const offset = directionFromLastSegment.scale(this.segmentSpacing);
        body.position = lastSegmentEnd.vsub(start).vadd(offset);

        const constraint = new Cannon.PointToPointConstraint(
          body,
          new Cannon.Vec3(-(this.segmentLength + this.segmentSpacing) / 2, 0, 0),
          this.bodies[i - 1],
          new Cannon.Vec3((this.segmentLength + this.segmentSpacing) / 2, 0, 0),
        );
        constraint.collideConnected = true;
        this.constraints.push(
          constraint
        );
      }
    }
  }

  segmentBase(segment: number = 0): Cannon.Vec3 {
    return this.bodies[segment].pointToWorldFrame(
      new Cannon.Vec3(-this.segmentLength/2, 0, 0)
    );
  }

  segmentEnd(segment: number = 0): Cannon.Vec3 {
    return this.bodies[segment].pointToWorldFrame(
      new Cannon.Vec3(+this.segmentLength/2, 0, 0)
    );
  }

}