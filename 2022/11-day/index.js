const { Console } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").replaceAll(" ", "").split("\n");
  //Getting single Elements
  const amountsOfMonkeys = Math.ceil(string.length / 7);
  let startingItems = [];
  let operations = [];
  let tests = [];
  let ifTrue = [];
  let ifFalse = [];
  for (let i = 0; i < amountsOfMonkeys; i++) {
    startingItems.push(string[1 + 7 * i]);
    operations.push(string[2 + 7 * i]);
    tests.push(string[3 + 7 * i]);
    ifTrue.push(string[4 + 7 * i]);
    ifFalse.push(string[5 + 7 * i]);
  }
  // Cleaning Items
  startingItems = startingItems.map((element) => element.replace("Startingitems:", ""));
  operations = operations.map((element) => element.replace("Operation:new=", ""));
  tests = tests.map((element) => Number(element.replace("Test:divisibleby", "")));
  ifTrue = ifTrue.map((element) => element.replace("Iftrue:throwtomonkey", ""));
  ifFalse = ifFalse.map((element) => element.replace("Iffalse:throwtomonkey", ""));

  return [startingItems, operations, tests, ifTrue, ifFalse];
}

const downloadedData = syncReadFile(dataPath);

// PROGRAM
class Monkey {
  constructor(name, items, operation, test, iftrue, iffalse) {
    this.name = name;
    this.operation = operation;
    this.test = Number(test);
    this.iftrue = Number(iftrue);
    this.iffalse = Number(iffalse);
    this.amountsOfItemsInspected = 0;
    this.items = items.split(",").map(Number);
  }
}
function creatingMonkeys() {
  const cageForMonkeys = [];
  for (let i = 0; i < downloadedData[0].length; i++) {
    // 0 starting item
    // 1-operation
    // 2-tests(divisible by value)
    // 3-ifTrue
    // 4-ifFalse
    cageForMonkeys.push(
      new Monkey(
        `Monkey${i}`,
        downloadedData[0][i],
        downloadedData[1][i],
        downloadedData[2][i],
        downloadedData[3][i],
        downloadedData[4][i]
      )
    );
  }
  return cageForMonkeys;
}

const cageOfMonkeys = creatingMonkeys();
function itemShuffeling(divider) {
  for (let i = 0; i < cageOfMonkeys.length; i++) {
    const monkey = cageOfMonkeys[i];
    let amountsOfMonkeyItems = monkey.items.length;
    while (amountsOfMonkeyItems > 0) {
      let worryAfterOperation = Math.floor(eval(monkey.operation.replaceAll("old", monkey.items[0])) % divider);
      monkey.items.shift();
      if (worryAfterOperation % monkey.test == 0) {
        const toMonkey = monkey.iftrue;
        cageOfMonkeys[toMonkey].items.push(worryAfterOperation);
      } else {
        const toMonkey = monkey.iffalse;
        cageOfMonkeys[toMonkey].items.push(worryAfterOperation);
      }
      amountsOfMonkeyItems--;
      monkey.amountsOfItemsInspected++;
    }
  }
}
function repeatXTimesAndGetMonkeyBusiness(amountOfRound) {
  const divider = cageOfMonkeys.map(item => item.test).reduce((a,b) => a*b);
  for (let i = 0; i < amountOfRound; i++) itemShuffeling(divider);
  //Getting two biggest Monkeys
  const inspectedItems = cageOfMonkeys.map((monkey) => monkey.amountsOfItemsInspected);
  const highestOne = Math.max(...inspectedItems);
  let secondHighest = 0;
  inspectedItems.forEach((number) => {
    if (number > secondHighest && number < highestOne) secondHighest = number;
  });
  console.log(cageOfMonkeys);
  console.log(highestOne, secondHighest);
  return highestOne * secondHighest;
}
console.log(repeatXTimesAndGetMonkeyBusiness(10000));