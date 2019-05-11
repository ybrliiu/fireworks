import * as p5 from 'p5';

export class Star {
  public vector: p5.Vector;

  constructor(
    private processing: p5,
    private position: p5.Vector,
    private hue: number,
  ) {
    this.position = processing.createVector(position.x, position.y);
    this.vector = (() => {
      const vector = p5.Vector.random2D();
      vector.mult(processing.random(5, 35));
      return vector;
    })();
  }

  public applyGravity(gravity: p5.Vector): void {
    this.vector.add(gravity);
    this.position.add(this.vector);
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
