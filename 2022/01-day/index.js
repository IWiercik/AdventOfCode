const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.replace(/\r/g, "").trim().split("\n\n");
  return arr;
}
//PART1
const gettingElves = (array) => {
  const elves = [];
  let biggestElf = {
    id: 0,
    food: "",
  };
  array.forEach((elf, index) => {
    const eachElf = elf.split("\n").map(Number);
    const sumOfFood = eachElf.reduce((previous, current) => previous + current);
    elves.push({
      id: index,
      food: sumOfFood,
    });
    if (biggestElf.food < sumOfFood || !biggestElf.food) {
      biggestElf.id = index;
      biggestElf.food = sumOfFood;
    }
  });
  return [elves, biggestElf];
};
const downloadedData = syncReadFile(dataPath);
const elves = gettingElves(downloadedData)[0];
const biggestElf = gettingElves(downloadedData)[1];

// Part2 (Getting three Biggest elves);

const gettingThreeBiggestElves = (elves) => {
  const foodsOfElves = elves.map((elf) => elf.food);
  const highestSize = {
    id: "",
    value: 0,
  };
  //Getting Highest One
  foodsOfElves.forEach((foodBag, index) => {
    if (foodBag > highestSize.value) {
      highestSize.id = index;
      highestSize.value = foodBag;
    }
  });
  const secondHighestSize = gettingLowerValue(foodsOfElves, highestSize);
  const thirdHighestSize = gettingLowerValue(foodsOfElves, secondHighestSize);
  return [highestSize, secondHighestSize, thirdHighestSize];
};

const gettingLowerValue = (array, lastHighest) => {
  let lowerValue = {
    id: "",
    value: 0,
  };
  array.forEach((item, index) => {
    if (item > lowerValue.value && index != lastHighest?.id && item < lastHighest?.value) {
      lowerValue.id = index;
      lowerValue.value = item;
    }
  });
  return lowerValue;
};

console.log(gettingThreeBiggestElves(elves));
let sumOfFood = gettingThreeBiggestElves(elves)
  .map((item) => item.value)
  .reduce((prev, current) => prev + current);
