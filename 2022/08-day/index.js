const { count } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").split("\n");
  return string;
}
const downloadedData = syncReadFile(dataPath);

function getting2DArray(data) {
  const array2D = [];
  data.forEach((row) => {
    const rowElements = [...row];
    array2D.push(rowElements);
  });
  return array2D;
}
const array2D = getting2DArray(downloadedData);

const countingTree = () => {
  let highestScore = 0;
  array2D.forEach((row, y) => {
    // x,y coordinates
    row.forEach((rowElement, x) => {
      // not border
      if (!(y == 0 || y == row.length - 1 || x == 0 || x == row.length - 1)) {
        // middle of square
        let score = 1;
        score *= checkingXSide("north", rowElement, x, y);
        score *= checkingXSide("east", rowElement, x, y);
        score *= checkingXSide("south", rowElement, x, y);
        score *= checkingXSide("west", rowElement, x, y);
        if (score > highestScore) highestScore = score;
      }
    });
  });
  console.log(highestScore);
};
function checkingXSide(side, element, x, y) {
  let amountOfTreeCanSee = 0;
  switch (side) {
    case "north":
      do {
        y -= 1;
        const itemInYPositionHigher = array2D[y][x];
        amountOfTreeCanSee += 1;
        if (itemInYPositionHigher >= element) break;
      } while (y != 0);
      break;
    case "south":
      do {
        y += 1;
        const itemInYPositionLower = array2D[y][x];
        amountOfTreeCanSee += 1;
        if (itemInYPositionLower >= element) break;
      } while (y != array2D.length - 1);
      break;
    case "east":
      do {
        x -= 1;
        const itemInXPositionLower = array2D[y][x];
        amountOfTreeCanSee += 1;
        if (itemInXPositionLower >= element) break;
      } while (x != 0);
      break;
    case "west":
      do {
        x += 1;
        const itemInXPositionHigher = array2D[y][x];
        amountOfTreeCanSee += 1;
        if (itemInXPositionHigher >= element) break;
      } while (x != array2D.length - 1);
      break;
    default:
      console.error("something went wrong!");
  }
  return amountOfTreeCanSee;
}
countingTree();
