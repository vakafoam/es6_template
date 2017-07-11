class Animal {
  constructor (name, height) {
    this.name = name;
    this.height = height;
  }

  hello() {
    console.log(`Hello, I am ${this.name}!`);
  }
}

class Lion extends Animal {
  constructor (name, height, color) {
    super (name, height);
    this.color = color;
  }
  hello() {
    console.log(`Hello there, I am ${this.name}`);
  }

  static roar() {
    console.log("Harrrrrr!");
  }
}

// --------------------------------------------------------------
// Prototype:
function Laptop (memory, processor, battery) {
  this.memory = memory;
  this.processor = processor;
  this.battery = battery;

  this.welcome = () => `Welcome from ${processor}!`
}

export {Animal, Lion, Laptop};
