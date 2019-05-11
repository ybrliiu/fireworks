import * as p5 from 'p5';
import { Stars } from './stars';

export class Ball {
  private vector: p5.Vector;
  private didExploded: boolean = false;

  constructor(
    private processing: p5,
    private position: p5.Vector,
    private hue: number,
    private launchSpeed: p5.Vector, // 打ち上げ速度
    private stars: Stars,
  ) {
    this.position = processing.createVector(position.x, position.y);
    this.vector = processing.createVector(0, processing.random(-29, -15));
  }

  private explode(): void {
    this.didExploded = true;
    this.stars.ignite(this.position);
  }

  public update(): void {
    if ( this.didExploded ) {
      this.stars.update();
    } else {
      this.vector.add(this.launchSpeed);
      this.position.add(this.vector);
      // 速度が0(=頂点に来た時)に爆発
      if ( this.vector.y >= 0 ) {
        this.explode();
      }
    }
  }

  public didWentOut(): boolean {
    return this.didExploded && this.stars.didWentOut();
  }

  public show(): void {
    if ( this.didExploded ) {
      this.stars.show();
    } else {
      this.processing.colorMode(this.processing.HSB);
      this.processing.strokeWeight(6);
      this.processing.stroke(this.hue, 255, 255);
      this.processing.point(this.position.x, this.position.y);
    }
  }

}
