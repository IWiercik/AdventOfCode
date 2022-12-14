const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").replaceAll(" ", "").split("\n");
  return string;
}
const downloadedData = syncReadFile(dataPath);

const moves = downloadedData.map((item) => item[0]);
const amountOfMoves = downloadedData.map((item) => {
  return item.slice(1, item.length);
});
class Point {
  constructor(x, y) {
    (this.x = x), (this.y = y), (this.fieldVisited = ["0,0"]);
  }
  moveHead(x, y) {
    this.x += x;
    this.y += y;
    if (!this.fieldVisited.includes(`${this.x},${this.y}`)) this.fieldVisited.push(`${this.x},${this.y}`);
  }
  moveTail(x, y) {
    this.x = x;
    this.y = y;
    if (!this.fieldVisited.includes(`${this.x},${this.y}`)) this.fieldVisited.push(`${this.x},${this.y}`);
  }
}
const head = new Point(0, 0);
const tail = new Point(0, 0);
const movingElement = () => {
  //Starting position
  for (let i = 0; i < moves.length; i++) {
    const command = moves[i][0];
    switch (command) {
      case "U":
        for (let y = 1; y <= amountOfMoves[i]; y++) {
          head.moveHead(0, 1);
          // Range of 2 pixels
          if (!(Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2)) {
            tail.moveTail(head.x, head.y - 1);
          }
        }
        break;
      case "D":
        for (let y = 1; y <= amountOfMoves[i]; y++) {
          head.moveHead(0, -1);
          // Range of 2 pixels
          if (!(Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2)) {
            tail.moveTail(head.x, head.y + 1);
          }
        }
        break;
      case "L":
        for (let x = 1; x <= amountOfMoves[i]; x++) {
          head.moveHead(-1, 0);
          // Range of 2 pixels
          if (!(Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2)) {
            tail.moveTail(head.x + 1, head.y);
          }
        }
        break;
      case "R":
        for (let x = 1; x <= amountOfMoves[i]; x++) {
          head.moveHead(1, 0);
          // Range of 2 pixels
          if (!(Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2)) {
            tail.moveTail(head.x - 1, head.y);
          }
        }
        break;
      default:
        console.error("Something went wrong");
        break;
    }
  }
};
const showingTailVisited = () => {
  console.log(tail.fieldVisited.length);
};
movingElement();

showingTailVisited();
