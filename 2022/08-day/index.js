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
  let counter = 0;
  array2D.forEach((row, y) => {
    // x,y coordinates
    row.forEach((rowElement, x) => {
      if (y == 0 || y == row.length - 1 || x == 0 || x == row.length - 1) {
        // border of square
        counter++;
      } else {
        //middle of square;

        // Checking  directions and if one of them is correct we just return and not check other ones
        if (checkingXSide("north", rowElement, x, y)) return counter++;
        if (checkingXSide("east", rowElement, x, y)) return counter++;
        if (checkingXSide("south", rowElement, x, y)) return counter++;
        if (checkingXSide("west", rowElement, x, y)) return counter++;
      }
    });
  });
  console.log(counter);
};
function checkingXSide(side, element, x, y) {
    let isVisible = true;
    console.log(`Element:${element}(x:${x},y:${y})`);
    switch (side) {
      case "north":
          do {
            y -= 1;
            const itemInYPositionHigher = array2D[y][x];
            if (itemInYPositionHigher < element) isVisible = true;
            else {
              isVisible = false;
              break;
            }
          } while (y != 0);
        break;
      case "south":
          do {
            y += 1;
            const itemInYPositionLower = array2D[y][x];
            if (itemInYPositionLower < element) isVisible = true;
            else {
              isVisible = false;
              break;
            }
          } while (y != array2D.length - 1);
        break;
      case "east":
          do {
            x -= 1;
            const itemInXPositionLower = array2D[y][x];
            if (itemInXPositionLower < element) isVisible = true;
            else {
              isVisible = false;
              break;
            }
          } while (x != 0);
        break;
      case "west":
        do {
          x += 1;
          const itemInXPositionHigher = array2D[y][x];
          if (itemInXPositionHigher < element) isVisible = true;
          else {
            isVisible = false;
            break;
          }
        } while (x != array2D.length - 1);
        break;
      default:
        isVisible = "something went wrong!";
    }
    return isVisible;
  }
function partOne() {
  countingTree();
}
partOne();
