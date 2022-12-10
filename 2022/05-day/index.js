const { Console } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "");
  //Getting Operations
  const firstMoveWord = string.indexOf("m");
  const operations = string.slice(firstMoveWord).split("\n");
  // Getting crates
  const crates = string.slice(0, firstMoveWord - 2).split("\n");
  const sortedCrates = changingColumnRowString(crates)
    .replaceAll(/ $|\[|]|\s|/g, "")
    .split(/[0-9]/g)
    .filter((item) => item.length > 0);
  return [operations, sortedCrates];
}

const changingColumnRowString = (array) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const row = array[i];
    for (let j = 0; j < row.length; j++) {
      const char = array[i][j];
      if (!newArray[j]) newArray[j] = ""; // we fill with "" to not get undefined
      newArray[j] += char;
    }
  }
  return newArray.join("");
};

const downloadedData = syncReadFile(dataPath);
const operations = downloadedData[0];
let crates = downloadedData[1].map((item) => [...item]);
function moveOperation(amount, from, to) {
  // amount of elements we take
  for (let i = 1; i <= amount; i++) {
    crates[to - 1].unshift(crates[from - 1][0]); // adding every first element from 'from'  (we use -1 cause array start from 0)
    crates[from - 1].shift();
  }
}

const popOperations = (operations) => {
  const operationsOnlyNumbers = operations.map((item) => item.split(" ").filter(Number));
  operationsOnlyNumbers.forEach((operation) => {
    const amount = Number(operation[0]);
    const from = Number(operation[1]);
    const to = Number(operation[2]);
    moveOperation(amount, from, to);
  });
};
popOperations(operations);
const everyFistItem = crates.map((item) => item[0]);
console.log(everyFistItem);
