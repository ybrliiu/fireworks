import * as p5 from 'p5';
import { Firework } from './firework';
import { Node } from './doubly-linked-list/node';
import { DoublyLinkedList } from './doubly-linked-list';

export class Fireworks {
  private readonly fireworks: DoublyLinkedList<Firework>;
  private readonly gravity: p5.Vector;
  private readonly width: number;
  private readonly height: number;
  
  constructor(private processing: p5) {
    this.fireworks = new DoublyLinkedList();
    this.gravity = processing.createVector(0, 0.4);
    this.width = processing.windowWidth;
    this.height = processing.windowHeight;
  }

  public update(): void {
    if ( Math.random() < 0.05 ) {
      const position = this.processing.createVector(
        this.processing.random(this.width),
        this.height,
      );
      const hue = Math.floor(Math.random() * 255);
      const firework = new Firework(this.processing, position, this.gravity, hue);
      this.fireworks.insertTail(firework);
    }
  }

  public show(): void {
    this.fireworks.forEach((node: Node<Firework>) => {
      const firework = node.getData();
      firework.update();
      firework.show();
      if (firework.didWentOut()) {
        this.fireworks.removeNode(node);
      }
    });
  }

}
