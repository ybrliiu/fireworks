import * as p5 from 'p5';

export class Particle {
  public processing: p5;
  public position: p5.Vector;
  public vector: p5.Vector;
  private acceleration: p5.Vector;
  public hue: number;
  private firework: boolean = true;
  private lifespan: number = 255;

  constructor(
    processing: p5,
    position: p5.Vector,
    hue: number,
    firework: boolean
  ) {
    this.processing = processing;
    this.position = processing.createVector(position.x, position.y);
    this.hue = hue;
    this.firework = firework;

    if (this.firework) {
      this.vector = processing.createVector(0, processing.random(-29, -15));
    } else {
      const vector = p5.Vector.random2D();
      vector.mult(processing.random(5, 35));
      this.vector = vector;
    }

    this.acceleration = processing.createVector(0, 0);
  }

  public applyForce(force: p5.Vector): void {
    this.acceleration.add(force);
  }

  public update(): void {
    if (!this.firework) {
      this.vector.mult(0.85);
      this.lifespan -= 6;
    }
    this.vector.add(this.acceleration);
    this.position.add(this.vector);
    this.acceleration.mult(0);
  }

  public done(): boolean {
    return this.lifespan < 0;
  }

  public show(): void {
    this.processing.colorMode(this.processing.HSB);

    if (!this.firework) {
      this.processing.strokeWeight(3);
      // HSBの定義で線を描画
      this.processing.stroke(this.hue, 255, 255, this.lifespan);
    } else {
      this.processing.strokeWeight(6);
      // HSBの定義で線を描画
      this.processing.stroke(this.hue, 255, 255);
    }

    // 点を描画
    this.processing.point(this.position.x, this.position.y);
  }
}
