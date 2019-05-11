import * as p5 from 'p5';
import { Ball } from './ball';
import { Stars } from './stars';

/* 花火クラス
 * 独自ロジックないし Ball を Firework に renameして、
 * FireworkFactory を作る形で良さそう・・・
 */
export class Firework {
  private ball: Ball;

  constructor(processing: p5, position: p5.Vector, gravity: p5.Vector, hue: number) {
    const stars = new Stars(processing, gravity, hue);
    this.ball = new Ball(processing, position, hue, gravity, stars);
  }

  public update(): void {
    this.ball.update();
  }

  public didWentOut(): boolean {
    return this.ball.didWentOut();
  }

  public show(): void {
    this.ball.show();
  }

}
