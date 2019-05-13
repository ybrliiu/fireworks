import * as p5 from 'p5';
import { Star } from './star';
import { Node } from './doubly-linked-list/node';
import { DoublyLinkedList } from './doubly-linked-list';

export class Stars {
  private stars: DoublyLinkedList<Star>;
  private didIgnited: boolean = false;

  constructor(
    private processing: p5,
    private gravity: p5.Vector,
    private hue: number,
    private num: number = 100
  ) {
    this.stars = new DoublyLinkedList();
  }

  public didWentOut(): boolean {
    return this.stars.isEmpty();
  }

  // このAPI直感的でない, starにもigniteメソッド作るべき?
  public ignite(position: p5.Vector): void {
    this.didIgnited = true;
    const stars = Array.from(new Array(this.num).keys()).map(() => {
      return new Star(this.processing, this.gravity, position, this.hue);
    });
    this.stars = new DoublyLinkedList(stars);
  }

  public update(): void {
    if ( this.didIgnited ) {
      this.stars.forEach((node: Node<Star>) => {
        const star = node.getData();
        star.update();
        if ( star.didWentOut() ) {
          this.stars.removeNode(node);
        }
      });
      console.log(this.stars.length);
    }
  }

  public show(): void {
    if ( this.didIgnited ) {
      this.stars.forEach((node: Node<Star>) => node.getData().show());
    }
  }

}
