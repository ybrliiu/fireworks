import { Node } from './doubly-linked-list/node';
import { Boundary } from './doubly-linked-list/boundary';
import { NodeInterface } from './doubly-linked-list/node-interface';

export class DoublyLinkedList<T> {
  private boundary: Boundary<T>;

  constructor(array?: T[]) {
    this.boundary = new Boundary<T>();
    if ( array !== undefined ) {
      for (let value of array) {
        this.insertTail(value);
      }
    }
  }

  get length(): number {
    let sizeCounter = 0;
    let inode = this.boundary.getNext();
    while ( inode instanceof Node ) {
      inode = inode.getNext();
      sizeCounter += 1;
    }
    return sizeCounter;
  }

  public isEmpty(): boolean {
    return this.boundary.getNext() === this.boundary && this.boundary.getPrev() === this.boundary;
  }

  public insertBefore(inode: NodeInterface<T>, data: T): void {
    const newNode = new Node<T>(data, inode.getPrev(), inode);
    inode.getPrev().setNext(newNode);
    inode.setPrev(newNode);
  }

  public insertHead(data: T): void {
    this.insertBefore(this.boundary, data);
  }

  public insertAfter(inode: NodeInterface<T>, data: T): void {
    const newNode = new Node<T>(data, inode, inode.getNext());
    inode.getNext().setPrev(newNode);
    inode.setNext(newNode);
  }

  public insertTail(data: T): void {
    this.insertAfter(this.boundary, data);
  }

  public removeNode(inode: NodeInterface<T>): void {
    if ( inode instanceof Node ) {
      inode.remove();
    }
  }

  public forEach(callback: (node: Node<T>) => void): void {
    let inode = this.boundary.getNext();
    while ( inode instanceof Node ) {
      callback(inode);
      inode = inode.getNext();
    }
  }

  public reverseForEach(callback: (node: Node<T>) => void): void {
    let inode = this.boundary.getPrev();
    while ( inode instanceof Node ) {
      callback(inode);
      inode = inode.getPrev();
    }
  }

}
