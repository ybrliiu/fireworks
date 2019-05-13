import * as p5 from 'p5';
import { Firework } from './firework';
import { Node } from './doubly-linked-list/node';
import { DoublyLinkedList } from './doubly-linked-list';

export class Fireworks {
  private fireworks: DoublyLinkedList<Firework>;
  private gravity: p5.Vector;
  private width: number;
  private height: number;

  constructor(private processing: p5) {
    this.fireworks = new DoublyLinkedList();
    this.gravity = processing.createVector(0, 0.4);
    this.width = processing.windowWidth;
    this.height = processing.windowHeight + 200;
  }

  public update(): void {
    if (Math.random() < 0.03 && this.fireworks.length < 1) {
      const position = this.processing.createVector(
        this.processing.random(this.width),
        this.height,
      );
      const hue = Math.floor(Math.random() * 255);
      const firework = new Firework(this.processing, position, this.gravity, hue);
      this.fireworks.insert(firework);
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
