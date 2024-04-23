class Stack {
  stack: string[];
  top: null | number;

  constructor() {
    this.stack = [];
    this.top = null;
  }

  push(value: string) {
    const i = (this.top ?? -1) + 1;
    this.stack[i] = value;
    this.top = i;
  }

  pop() {
    if (this.top !== null) {
      this.stack.length = this.top;
      this.top = this.top === 0 ? null : this.top - 1;
    }
  }

  isEmpty() {
    // return this.stack.length === 0;
    return this.top === null;
  }

  getTop() {
    if (this.top) {
      return this.stack[this.top];
    }
  }

  length() {
    return this.stack.length;
  }
}

//////////

const s = new Stack();
s.push("A");
s.push("B");
s.push("C");
s.push("D");
s.push("E");
// console.log(s.stack);

// s.pop();
// s.pop();
// s.pop();
// s.pop();
// s.pop();
// s.pop();
// s.push("F");

console.log(s.length());

// console.log(s.stack);
// console.log(s.top);
