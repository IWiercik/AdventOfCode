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
    A: "rock,", // we use comma to split it later
    B: "paper,",
    C: "scissors,",
    X: "lose,",
    Y: "draw,",
    Z: "win,",
  };
  data = data.replace(/A|B|C|X|Y|Z/g, (matched) => schema[matched]);
  data = data.split(",");
  data = data.slice(0, -1); // remove last comma
  //Next we take out the enemy and user shapes
  const opponentShapes = [];
  const resultsOfRounds = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2) {
      resultsOfRounds.push(data[i]);
    } else opponentShapes.push(data[i]);
  }

  // Rounds and couting points

  //points
  let userPoints = 0;
  const pointsWages = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  //counters
  const shapes = {
    rock: {
      draw: "rock",
      loseAgainst: "paper",
      winAgainst: "scissors",
    },
    paper: {
      draw: "paper",
      winAgainst: "rock",
      loseAgainst: "scissors",
    },
    scissors: {
      draw: "scissors",
      winAgainst: "paper",
      loseAgainst: "rock",
    },
  };

  //Rounds
  for (let round = 0; round < opponentShapes.length; round++) {
    let pointsForRound = 0;
    const enemyShape = opponentShapes[round];
    const resultOfRound = resultsOfRounds[round];
    let userShape;
    switch (resultOfRound) {
      case "win":
        userShape = shapes[enemyShape].loseAgainst;
        pointsForRound += 6;
        break;
      case "draw":
        userShape = shapes[enemyShape].draw;
        pointsForRound += 3;
        break;
      case "lose":
        userShape = shapes[enemyShape].winAgainst;
        break;
    }
    userPoints += pointsWages[userShape];
    userPoints += pointsForRound;
  }
  console.log(userPoints);
  return userPoints;
}
strategy(downloadedData);
