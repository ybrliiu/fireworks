export class Node<T> {
  private data: T;
  private next?: Node<T>;
  private prev?: Node<T>;

  constructor(data: T) {
    this.data = data;
    this.prev = undefined;
    this.next = undefined;
  }

  public getNext(): Node<T> | undefined {
    return this.next;
  }

  public setNext(node: Node<T>): void {
    this.next = node;
    node.prev = this;
  }

  public getPrev(): Node<T> | undefined {
    return this.prev;
  }

  public setPrev(node: Node<T>): void {
    this.prev = node;
    node.next = this;
  }

  public getData(): T {
    return this.data;
  }

  public remove(): void {
    if (this.prev === undefined) {
      if (this.next !== undefined) {
        this.next.prev = undefined;
      }
    } else {
      this.prev.next = this.next;
      if (this.next !== undefined) {
        this.next.prev = this.prev;
      }
    }
    this.next = this.prev = undefined;
  }

}
