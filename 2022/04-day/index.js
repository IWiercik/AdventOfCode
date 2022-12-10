const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").trim().split("\n");
  return string;
}
const downloadedData = syncReadFile(dataPath);
function gettingOverWorked(array) {
  let overWork = 0;
  array.forEach((team) => {
    // Getting cleaning ids
    const rangeArray = team.replace(",", "-").split("-").map(Number);
    const firstPair = [rangeArray[0], rangeArray[1]];
    const secondPair = [rangeArray[2], rangeArray[3]];
    const sortedByAmountOfItems = [firstPair, secondPair].sort((a, b) => {
      // we sort by substracting amount of elements
      const firstDiff = b[1] - b[0];
      const secondDiff = a[1] - a[0];
      return firstDiff - secondDiff;
    });
    let hasEveryItem = true;
    const arrayWithEveryItem = [];

    //filling array
    for (let i = sortedByAmountOfItems[0][0]; i <= sortedByAmountOfItems[0][1]; i++) {
      arrayWithEveryItem.push(i);
    }

    //checking if has every item
    for (let j = sortedByAmountOfItems[1][0]; j <= sortedByAmountOfItems[1][1]; j++) {
      if (!arrayWithEveryItem.includes(j)) hasEveryItem = false;
    }
    if (hasEveryItem) overWork += 1;
  });
  return overWork;
}

console.log(gettingOverWorked(downloadedData));
