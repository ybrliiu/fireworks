import * as p5 from 'p5';
import { Firework } from './firework';

export class Fireworks {
  private fireworks: Firework[];
  private gravity: p5.Vector;
  private width: number;
  private height: number;

  constructor(private processing: p5) {
    this.fireworks = [];
    this.gravity = processing.createVector(0, 0.4);
    this.width = processing.windowWidth;
    this.height = processing.windowHeight + 200;
  }

  public update(): void {
    if (Math.random() < 0.05 && this.fireworks.length < 5) {
      const position = this.processing.createVector(
        this.processing.random(this.width),
        this.height,
      );
      const hue = Math.floor(Math.random() * 255);
      const firework = new Firework(this.processing, position, this.gravity, hue);
      this.fireworks.push(firework);
    }
  }

  public show(): void {
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const firework = this.fireworks[i];
      firework.update();
      firework.show();
      if (firework.didWentOut()) {
        this.fireworks.splice(i, 1);
      }
    }
  }

}
