import { Node } from './doubly-linked-list/node';

export class DoublyLinkedList<T> {
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor(array?: T[]) {
    if ( array !== undefined ) {
      for (let value of array) {
        this.insert(value);
      }
    }
  }

  get length(): number {
    let sizeCounter = 0;
    let node = this.head;
    while ( node !== undefined ) {
      node = node.getNext();
      sizeCounter += 1;
    }
    return sizeCounter;
  }

  public isEmpty(): boolean {
    return this.head === undefined && this.tail === undefined;
  }

  public insert(data: T): void {
    const newNode = new Node<T>(data);
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      if (this.tail !== undefined) {
        // sizeが1以上なら絶対ここ来ないけどね
        this.tail.setNext(newNode);
        this.tail = newNode;
      }
    }
  }
  
  public removeNode(node: Node<T>): void {
    if ( this.head !== undefined ) {
      if ( this.head.getNext() === undefined ) {
        this.head = this.tail = undefined;
      }
    }

    // 先頭のnode消すとバグる
    if ( this.head === node ) {
      this.head = this.head.getNext();
      if ( this.head === undefined ) {
        this.tail = undefined;
      }
    } else if ( this.tail === node ) {
      this.tail = this.tail.getPrev();
      if ( this.tail === undefined ) {
        this.head = undefined;
      }
    }

    node.remove();
  }

  public forEach(callback: (node: Node<T>) => void): void {
    let node = this.head;
    while ( node !== undefined ) {
      callback(node);
      node = node.getNext();
    }
  }

  public reverseForEach(callback: (node: Node<T>) => void): void {
    let node = this.tail;
    while ( node !== undefined ) {
      callback(node);
      node = node.getPrev();
    }
  }

}
