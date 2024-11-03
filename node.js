export default class Node {
  value;
  #nextNode;

  constructor(value = null, nextNode = null) {
    this.value = value;
    this.#nextNode = nextNode;
  }

  setNextNode(nextNode) {
    this.#nextNode = nextNode;
  }

  getNextNode() {
    return this.#nextNode;
  }
}
