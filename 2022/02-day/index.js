const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\s/g, "").trim();
  return string;
}
const downloadedData = syncReadFile(dataPath);

function strategy(downloadedData) {
  //First we changed weirdSignature to normal values paper,rock,scissors
  let data = downloadedData;
  const schema = {
    A: "Rock,", // we use comma to split it later
    B: "Paper,",
    C: "Scissors,",
    X: "Rock,",
    Y: "Paper,",
    Z: "Scissors,",
  };
  data = data.replace(/A|B|C|X|Y|Z/g, (matched) => schema[matched]);
  data = data.split(",");
  data = data.slice(0, -1); // remove last comma
  
  //Next we take out the enemy and user shapes
  const opponentShapes = [];
  const myShapes = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2) {
      myShapes.push(data[i]);
    } else opponentShapes.push(data[i]);
  }

  // Rounds and couting points
  let userPoints = 0;
  const pointsWages = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };
  for (let round = 0; round < opponentShapes.length; round++) {
    let pointsForRound = 0;
    const enemyShape = opponentShapes[round];
    const userShape = myShapes[round];
    //Getting Points
    switch (userShape) {
      case "Paper":
        pointsForRound += 2;
        if (enemyShape == "Rock") pointsForRound += 6; // win for user
        break;
      case "Rock":
        pointsForRound += 1;
        if (enemyShape == "Scissors") pointsForRound += 6; // win for user
        break;
      case "Scissors":
        pointsForRound += 3;
        if (enemyShape == "Paper") pointsForRound += 6; // win for user
        break;
      default:
        console.log("something went wrong!");
        break;
    }
    if (enemyShape == userShape) pointsForRound += 3; // draw
    userPoints += pointsForRound;
  }
  console.log(userPoints);
  return userPoints;
}
strategy(downloadedData);
