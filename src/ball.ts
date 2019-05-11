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
    this.stars.ignite();
  }

  public update(): void {
    this.vector.add(this.launchSpeed);
    this.position.add(this.vector);
    if ( this.position.y >= 0 && !this.didExploded ) {
      this.explode();
    }
  }

  public didWentOut(): boolean {
    return this.didExploded && this.stars.didWentOut();
  }

  public show(): void {
    this.processing.colorMode(this.processing.HSB);
    this.processing.strokeWeight(6);
    this.processing.stroke(this.hue, 255, 255);
    this.processing.point(this.position.x, this.position.y);
  }

}
