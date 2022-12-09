const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.replace(/\r/g, "").trim().split("\n\n");
  return arr;
}
const gettingElves = (array) => {
  const elves = [];
  let biggestElf = {
    id: 0,
    food: undefined,
  };
  array.forEach((elf, index) => {
    const eachElf = elf.split("\n").map(Number);
    const sumOfFood = eachElf.reduce((previous, current) => previous + current);
    if (biggestElf.food < sumOfFood || !biggestElf.food) {
      biggestElf.id == index;
      biggestElf.food = sumOfFood;
    }
  });
  return [elves, biggestElf];
};

const downloadedData = syncReadFile(dataPath);
console.log(gettingElves(downloadedData));
