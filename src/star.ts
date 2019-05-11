import * as p5 from 'p5';

export class Star {
  public vector: p5.Vector;
  private acceleration: p5.Vector;

  constructor(
    private processing: p5,
    private gravity: p5.Vector,
    private position: p5.Vector,
    private hue: number,
    private lifespan: number = 255,
  ) {
    this.lifespan;
    this.position = processing.createVector(position.x, position.y);
    this.vector = (() => {
      const vector = p5.Vector.random2D();
      vector.mult(processing.random(5, 35));
      return vector;
    })();
    this.acceleration = processing.createVector(0, 0);
  }

  private applyGravity(): void {
    this.acceleration.add(this.gravity);
    this.vector.mult(0.85);
    this.vector.add(this.acceleration);
    this.position.add(this.vector);
    this.acceleration.mult(0);
  }

  public update(): void {
    this.applyGravity();
    this.lifespan -= 6;
  }

  public didWentOut(): boolean {
    return this.lifespan < 0;
  }

  public show(): void {
    this.processing.colorMode(this.processing.HSB);
    this.processing.strokeWeight(6);
    // HSBの定義で線を描画
    this.processing.stroke(this.hue, 255, 255);
    // 点を描画
    this.processing.point(this.position.x, this.position.y);
  }

}
