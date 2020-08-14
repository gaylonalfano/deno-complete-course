const sum = (a: number, b: number) => {
  return a + b;
};
const answer = sum(4, 3);

console.log(answer);

// types
// boolean
let isCool: boolean = true;

let age: number = 56;

let eyeColor: string = "brown";
let favoriteQuote: string = `I'm not old, I'm only ${age}`;
console.log(favoriteQuote);

// array
let pets: string[] = ["cat", "dog", "pig"];
let pets2: Array<string> = ["lion", "snake", "chimera"];
console.log(pets);
console.log(pets2);

// object
let wizard: object = {
  name: "Jon",
};

let meh: undefined = undefined;
let noo: null = null;

// Tuple
let basket: [string, number];
basket = ["basketball", 3];

// Enum -- usually capitalized
enum Size {
  Small = 1,
  Medium = 2,
  Large = 3,
}
let sizeName: string = Size[2];
console.log(sizeName);

// Any !!!! Be careful!
let whatever: any = "aggghhhh no!!!";
whatever = true; // basket, Size.small, etc.

// void - Nothing returned so can assign type void
let sing = (): void => {
  console.log("lalalala");
  // if we return anything then we get error
  //return 'hahaha'  // Type '"hahaha"' is not assignable to type 'void'
};

// never - func never returns AND var type is NEVER TRUE
// the function never has an endpoint (i.e., reaches some end like console.log()
let error = (): never => {
  throw Error("Oops!");
  // return 'hello'   -- errors because can't return
};

// interface -- Capital names. Good with Objects
// Good for React and Props. Kinda like creating a new type
// similar to 'type RobotArmy' but interface is recommended
// For OPTIONAL parameters we add '?' at the end.
interface RobotArmy {
  count: number;
  type: string;
  magic: string;
}

let fightRobotArmy = (robots: RobotArmy) => {
  console.log("FIGHT!");
};

// fightRobotArmy = ({count: 1, type: 'dragon'}) - errors for some reason...
// Above is same as below, just simplified
let fightRobotArmy2 = (robots: {
  count: number;
  type: string;
  magic: string;
}) => {
  console.log("FIGHT!");
};

// Type Assertions - Override the type so be careful
interface CatArmy {
  count: number;
  type: string;
  magic: string;
}

let dog = {} as CatArmy;
dog.count;

// Function
let fightRobotArmy3 = (robots: RobotArmy): void => {
  console.log("FIGHT!");
};

let fightRobotArmy4 = (robots: {
  count: number;
  type: string;
  magic: string;
}): number => {
  console.log("FIGHT!");
  return 5;
};

// Classes
class Animal {
  // private sing: ... will error if we try lion.sing
  sing: string = "lalalalala";
  constructor(sound: string) {
    this.sing = sound;
  }

  greet(): string {
    return `Hello ${this.sing}`;
  }
}

let lion = new Animal("RAWRRRR!");
console.log(lion.greet()); // Hello RAWRRRR!
console.log(lion.sing);

// Union using '|' separator for OR
let confused: string | number | boolean = "hello";
