import Node from "./node.js";

export default class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  // Creates a new node, checks if head of list is empty and assigns it, else assigns it after the current node
  append(value) {
    const node = new Node(value);
    if (this.#head === null) {
      this.#head = node;
      this.#tail = node;
      this.#size++;
    } else {
      this.#tail.setNextNode(node);
      this.#tail = node;
      this.#size++;
    }
  }
  // Creates a new node and puts it at the head of the list, pointing the previous head as the next node
  prepend(value) {
    const node = new Node(value);
    if (this.#head === null) {
      this.#head = node;
      this.#size++;
    } else {
      node.setNextNode(this.#head);
      this.#head = node;
      this.#size++;
    }
  }

  size() {
    return this.#size;
  }
  // Returns node at index
  at(index) {
    let result = LinkedList.traverse(this.#head, (cursor, currentIndex) => {
      if (currentIndex === index) return cursor;
      return false;
    });
    if (result === null) return "Out of bounds";
    return result.result;
  }

  head() {
    return this.#head;
  }
  tail() {
    return this.#tail;
  }
  // Traverse list and remove the last element. If there's only 1 element, remove the head and empty the list
  pop() {
    LinkedList.traverse(this.#head, (cursor) => {
      if (cursor.getNextNode() === null) {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
        return true;
      }
      if (cursor.getNextNode().getNextNode() === null) {
        cursor.setNextNode(null);
        this.#tail = cursor;
        this.#size--;
        return true;
      }
    });
  }
  // Traverse the list and return true if item is found in list, otherwise return false
  contains(value) {
    let contains = LinkedList.traverse(this.#head, (cursor) => {
      if (cursor.value === value) return true;
      return false;
    });
    if (contains) return true;
    return false;
  }
  // Traverse the list and find a value and return its index or null if not found
  find(value) {
    let contains = LinkedList.traverse(this.#head, (cursor) => {
      if (cursor.value === value) return true;
      return false;
    });
    if (contains) return contains.index;
    return null;
  }
  // Convert list to string and return it in a ( value ) -> ( value ) -> null format
  toString() {
    let string = "";
    LinkedList.traverse(this.#head, (cursor) => {
      string = string.concat(`( ${cursor.value} ) -> `);
      if (cursor.getNextNode() === null) {
        string = string.concat(" null");
      }
    });
    return string;
  }
  // Inserts a new node at specific index
  insertAt(value, index) {
    if (index >= this.#size) return "Out of bounds";
    let node = new Node(value);
    node.setNextNode(this.at(index));
    this.at(index - 1).setNextNode(node);
    this.#size++;
  }
  // Remove node at specific index
  removeAt(index) {
    if (index === 0) {
      this.#head = this.#head.getNextNode();
      this.#size--;
      return;
    }
    if (index >= this.#size) return "Out of bounds";
    this.at(index - 1).setNextNode(this.at(index).getNextNode());
    this.#size--;
  }
  // Function to traverse the list and call a function to check for conditions
  static traverse(head, cb) {
    if (head !== null) {
      let cursor = head;
      let index = 0;
      while (cursor !== null) {
        let result = cb(cursor, index);
        if (result) return { result, index };
        cursor = cursor.getNextNode();
        index++;
      }
      return null;
    }
  }
}

