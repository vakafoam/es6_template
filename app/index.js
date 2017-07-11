let limit = 100;
console.log(limit);

let a = [10, 20, 30];
let b = [0, ...a, 40, 50];
console.log(b);

function collect (...a) {
  console.log(a);
}
collect (1,2,3,4,5);

let z = [5,6,7,8];
let [one, two] = z;
console.log(one,two);  // gives 5 6

let king = {name:"Mumba", kids: 1};
let {name, kids} = king;
console.log(name, kids); // gives Numba 1

let son = {nick: "Simba", parents: 1};
let nick, parents;
({ nick, parents } = son);   // () to split the declaration
console.log(nick, parents);

// ------------------------------------------------
setTimeout(function() {
  console.log("11111");
});

setTimeout (() => {
  console.log(111112);
});

// ------------------------------------------------
let items = [1,2,3,4];

let doubled = items.map((n) => n*2);
// the same as:
// let doubled = items.map((n) => {
//   return n*2;
// });
console.log(doubled);

// ------------------------------------------------

let points = [1,23,12,21,11,0,16];
let highPoint = points.filter((n) => n>15);
console.log(highPoint);

// ------------------------------------------------

let c = "woo" + "o".repeat(50);
console.log(c);

let d = `w ${"oo".repeat(50)}`;
console.log(d);

console.log("butter".startsWith("b")); // endsWith() is there too
console.log("butterfly".includes("er"));

// ------------------------------------------------

import { names, total } from "./newModule";
console.log(names, total);

// ------------------------------------------------

import { Animal, Lion } from "./classes";
let animal = new Animal("Mufasa", 4.5);
animal.hello();

let small = new Lion ("Simba", 2, "golden");
small.hello();
Lion.roar();

// ------------------------------------------------

import { Laptop } from "./classes";

let l1 = new Laptop ("124 Mb", "Intel", "89%");
console.log(l1.welcome());

Laptop.prototype.wifi;  //creating a new property
let l2 = new Laptop ("256 Mb", "Dell", "54%");
l2.wifi = "ON";

Laptop.prototype.checkBattery = function() {    // => won't work here (scope)
  return `The battery is ${this.battery}`;
}
console.log(l2.wifi);
console.log(l2.checkBattery());

// -----------------------------------------------
// Data Structures

let ass = new Set();
ass.add(1);
ass.add(2);
ass.add("www");
ass.add({x:50, y:40});
console.log(ass);
console.log(ass.size);
console.log(ass.has(1));

// --

let numList = [1,2,3,56,1];
let numSet = new Set(numList);
console.log(numSet);

for (let i of numSet.values()) {
  console.log(i);
}

// ---

let mapp = new Map();
let key_1 = "string key";
let key_2 = { 'a': 'key'};
let key_3 = function() {};

mapp.set(key_1, 'return for a string key');
mapp.set(key_2, 'return for an object key');
mapp.set(key_3, 'return for a function key');
console.log(mapp);

// ---

let numbers = [[1,'one'], [2,'two'], [3, 'three']];
let numMap = new Map (numbers);
console.log(numMap);

for (let [k, v] of numMap.entries()) {
  console.log(`${k} points to ${v}`);
}

// ------------------------------------------------------
// Closures

let call = () => {
  let secret = "Super secret inside a closure";
  let reveal = () => {
    console.log(secret);
  }
  return reveal;  // no brackets!
}

let unveil = call();   // does not work without assignment to closure return,
                      // that allows to access the variable inside
unveil();

// ---------- Function factory

const addSuffix = (x) => {
  const concat = (y) => {
    return x+y;
  }
  return concat;
}

let add_ful = addSuffix('ful');
let f = add_ful('fruit');
console.log("Function factory created: " + f);

// ---

const product = (x) => {
  return y => {
    return x*y;
  }
}

// let product = x => y => x*y;   // the same, just in one line

let mult5 = product(5);
console.log(mult5);
console.log("Function factory multiplication result: " + mult5(3));

// --------------------------------------------------------
// Private methods within Closures

const budget = () => {
  let balance = 0;
  let changeBal = (val) => {
    return balance += val;
  }

  const deposit = (x) => changeBal(x);
  const withdraw = (x) => changeBal(-x);
  const check = () => balance;

  return { deposit, withdraw, check }
}

let wallet = budget();
wallet.deposit(20);
wallet.withdraw(30);
wallet.deposit(50);
console.log("Acessing private field balance: " + wallet.check());
console.log("Acessing private field balance: " + wallet.balance); // undefined

// -------------------------------------------------------------------
// GENERATORS
// require("babel-core/register");
// require("babel-polyfill");

function* letterMaker() {
  let count = 0;
  while (count < 5) {
    yield 'a'.repeat(count);
    count++;
  }
}

let letterG = letterMaker();
console.log(letterG.next().value);
console.log(letterG.next().value);
console.log(letterG.next().value);
console.log(letterG.next().value);

// ----

function* evens() {
  let count = 0;
  while (true) {
    count += 2;
    let reset = yield count;    // reset value
    if (reset) {
      count = 0;
    }
  }
}

let seq = evens();
console.log(seq.next().value);
console.log(seq.next().value);
console.log(seq.next().value);
console.log(seq.next(true).value);
console.log(seq.next().value);

// Iterator using a GENERATOR

// const arrayIter = (array) => {
//   let i = 0;
//
//   return {
//     next: () => {
//       if (i < array.length) {
//         let next = array[i];
//         i++;
//         return next;
//       }
//     }
//   }
// }
//
// var it = arrayIter ([1,2,3,4]);
// console.log("ArrayIterator: " + it.next());
// console.log("ArrayIterator: " + it.next());
// console.log("ArrayIterator: " + it.next());
// console.log("ArrayIterator: " + it.next());

function* arrayIterator() {
  yield* arguments;

  // the same as:
  // for (let arg of arguments) {
  //   yield arg;
  // }
}

var it = arrayIterator(1,2,3);
console.log("Array Iterator Generator: "+it.next().value);
console.log("Array Iterator Generator: "+it.next().value);
console.log("Array Iterator Generator: "+it.next().value);

// -------------------------------------------------------------
// PROMISES

let p = new Promise((resolve, reject) => {
  //resolve('Resolved promise data');
  setTimeout(() => reject('Rejected promise data'), 3000);
});

p.then(response => console.log(response))
  .catch(error => console.log(error));

// ---

const root = 'http://jsonplaceholder.typicode.com/posts/1';

fetch (root, { method: "GET" })
  .then(response => response.json())
  .then(json => console.log(json));

  //-------------------------------------------------------------
  // ES7 new features
  // ------------------------------------------------------------

  let mult = 2**5;
  console.log(mult);

  let arr = [12,32,4,345,3456];
  console.log(arr.includes(4));

  let obj = {'a': 'one', 'b': 'two', 'c':'three'};
  let keys = Object.keys(obj);
  let vals = Object.values(obj);
  let entrs = Object.entries(obj);
  console.log(keys + " " + vals + " " + entrs);

  // ---

  async function async_1() {
    return 'one';
  }

  async function async_2() {
    return 'two';
  }

  async function async_3() {
    throw new Error('Issues with async!');
  }

  async function async_4() {
    const one = await async_1();  // wait for the result until resolved
    const two = await async_2();
    console.log(one);
    console.log(two);
  }

  async_1().then(response => console.log(response));
  async_3().catch(err => console.log(err));

  async_4();

  async function async_5() {
    const [res_one, res_two] = await Promise.all(
      [async_1(), async_2()]
    )
    console.log(res_one, res_two);
  }

  async_5();

  