import { NodeInterface } from './node-interface';

export class Node<T> implements NodeInterface<T> {
  private data: T;
  private next: NodeInterface<T>;
  private prev: NodeInterface<T>;

  constructor(data: T, prev: NodeInterface<T>, next: NodeInterface<T>) {
    this.data = data;
    this.prev = prev;
    this.next = next;
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

  public getData(): T {
    return this.data;
  }

  public remove(): void {
    this.prev.setNext(this.next);
    this.next.setPrev(this.prev);
  }

}
