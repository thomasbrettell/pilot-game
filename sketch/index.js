import { Vector } from 'p5';

const NOT_STARTED = 'NOT_STARTED';
const STARTED = 'STARTED';
const GAME_OVER = 'GAME_OVER';

const sketch = (p) => {
  class Point {
    constructor() {
      this.pos = p.createVector(
        p.int(p.random(p.width)),
        p.int(p.random(p.height))
      );
      this.radius = 16;
    }

    display() {
      p.noStroke();
      p.fill(255, 0, 0);
      p.circle(this.pos.x, this.pos.y, this.radius);
    }

    reset() {
      this.pos = p.createVector(
        p.int(p.random(p.width)),
        p.int(p.random(p.height))
      );
    }

    reposition() {
      onGetPoint();
      this.pos = p.createVector(
        p.int(p.random(p.width)),
        p.int(p.random(p.height))
      );
    }
  }

  class Ship {
    constructor() {
      this.pos = p.createVector(p.width / 2, p.height / 2);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.radius = 16;
      this.r = 0;
      this.theta = 0;
      this.topSpeed = 15;
    }

    reset() {
      this.pos = p.createVector(p.width / 2, p.height / 2);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.radius = 16;
      this.r = 0;
      this.theta = 0;
      this.topSpeed = 15;
    }

    display() {
      p.fill(0);
      p.push();
      this.r = p.constrain(this.r, 0, this.topSpeed);
      this.pos.x += this.r * p.cos(this.theta);
      this.pos.y += this.r * p.sin(this.theta);
      p.translate(this.pos.x, this.pos.y);

      p.rotate(this.theta);
      p.triangle(
        -this.radius,
        -this.radius / 2,
        -this.radius,
        this.radius / 2,
        this.radius,
        0
      );
      p.pop();
    }

    turn(t) {
      this.theta += t;
    }

    accelerate(a) {
      this.r += a;
    }

    checkEdges() {
      if (this.pos.x > p.width) {
        this.pos.x = 0;
      } else if (this.pos.x < 0) {
        this.pos.x = p.width;
      }

      if (this.pos.y > p.height) {
        this.pos.y = 0;
      } else if (this.pos.y < 0) {
        this.pos.y = p.height;
      }
    }
  }

  let gameState;
  let onGetPoint;
  let points;
  let timer;

  p.updateWithProps = (props) => {
    points = props.points;
    timer = props.timer;
    gameState = props.gameState;
    if (props.onGetPoint) {
      onGetPoint = props.onGetPoint;
    }
  };

  p.setup = () => {
    p.createCanvas(600, 600);
    p.ship = new Ship();
    p.point = new Point();
  };

  p.draw = () => {
    p.background(255, 100);
    p.textSize(12);
    p.textAlign(p.LEFT);

    if (gameState === STARTED) {
      p.point.display();
      p.fill(0, 0, 0);
      if (timer <= 1) {
        p.fill(255, 0, 0);
      }
      p.textAlign(p.CENTER);
      p.textSize(16 * (5 - timer));
      p.text(timer, p.width / 2, 60);
      p.fill(0, 0, 0);
      p.textSize(12);
      p.textAlign(p.LEFT);
      p.text(`Score: ${points}`, 20, 20);

      let d = Vector.dist(p.ship.pos, p.point.pos);
      if (d < p.ship.radius + p.point.radius) {
        p.point.reposition();
      }

      if (p.keyIsDown(p.UP_ARROW)) {
        p.ship.accelerate(0.1);
      } else if (p.keyIsDown(p.DOWN_ARROW)) {
        p.ship.accelerate(-0.35);
      } else {
        p.ship.accelerate(-0.05);
      }

      if (p.keyIsDown(p.LEFT_ARROW)) {
        p.ship.turn(-0.1);
      }
      if (p.keyIsDown(p.RIGHT_ARROW)) {
        p.ship.turn(0.1);
      }
      p.ship.checkEdges();
      p.ship.display();
    } else if (gameState === GAME_OVER) {
      p.ship.reset();
      p.point.reset();
      p.textSize(16);
      p.textAlign(p.CENTER);
      p.text(
        `You scored ${points} ${points === 1 ? 'point' : 'points'}`,
        p.width / 2,
        65
      );
    }
  };
};

export default sketch;
