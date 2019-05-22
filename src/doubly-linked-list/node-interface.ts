export interface NodeInterface<T> {

  getNext(): NodeInterface<T>;

  setNext(inode: NodeInterface<T>): void;

  getPrev(): NodeInterface<T>;

  setPrev(inode: NodeInterface<T>): void;

}
