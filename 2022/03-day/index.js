const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").trim().split("\n");
  return string;
}
const downloadedData = syncReadFile(dataPath);

function rearrangementItems(array) {
  const letters = [];
  array.forEach((item) => {
    const firstHalf = item.slice(0, item.length / 2);
    const secondHalf = item.slice(item.length / 2);
    let letterThatRepeat;

    // Getting the char that repeat
    for (let i = 0; i < firstHalf.length; i++) {
      //xChar compare to every char in secondHalf String
      if (!letterThatRepeat) {
        const charFirstHalf = firstHalf[i];
        for (let j = 0; j < secondHalf.length; j++) {
          const charSecondHalf = secondHalf[j];
          if (charFirstHalf === charSecondHalf) {
            letterThatRepeat = charFirstHalf;
            break;
          }
        }
      } else {
        break;
      }
    }

    letters.push(letterThatRepeat);
  });
  return letters;
}
function isLowerCase(str) {
  return str == str.toLowerCase() && str != str.toUpperCase();
}
function gettingSum(array) {
  let sum = 0;
  array.forEach((letter) => {
    if (isLowerCase(letter)) {
      // Lower Case Schema
      sum += letter.charCodeAt(0) - 96;
    } else {
      // UpperCase Schema
      sum += letter.charCodeAt(0) - 38;
    }
  });
  return sum;
}
const letters = rearrangementItems(downloadedData);
console.log(gettingSum(letters));
