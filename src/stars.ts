import * as p5 from 'p5';
import { Star } from './star';

export class Stars {
  private stars: Star[];
  private didIgnited: boolean = false;

  constructor(
    private processing: p5,
    private gravity: p5.Vector,
    private hue: number,
    private num: number = 100
  ) {
    this.stars = [];
  }

  public didWentOut(): boolean {
    return this.stars.length === 0;
  }

  // このAPI直感的でない, starにもigniteメソッド作るべき?
  public ignite(position: p5.Vector): void {
    this.didIgnited = true;
    for (let i = 0; i < this.num; i++) {
      this.stars.push(new Star(this.processing, this.gravity, position, this.hue));
    }
  }

  public update(): void {
    if ( this.didIgnited ) {
      for (let i = this.stars.length - 1; i >= 0; i--) {
        const star = this.stars[i];
        star.update();
        if ( star.didWentOut() ) {
          this.stars.splice(i, 1);
        }
      }
    }
  }

  public show(): void {
    if ( this.didIgnited ) {
      this.stars.forEach(star => star.show());
    }
  }

}
