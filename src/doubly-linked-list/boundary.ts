import { NodeInterface } from './node-interface';

export class Boundary<T> implements NodeInterface<T> {
  private next: NodeInterface<T>;
  private prev: NodeInterface<T>;

  constructor() {
    this.next = this;
    this.prev = this;
  }

  public getNext(): NodeInterface<T> {
    return this.next;
  }

  public setNext(inode: NodeInterface<T>): void {
    this.next = inode;
  }

  public getPrev(): NodeInterface<T> {
    return this.prev;
  }

  public setPrev(inode: NodeInterface<T>): void {
    this.prev = inode;
  }

}
