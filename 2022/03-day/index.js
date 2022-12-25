const { group } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").trim().split("\n");
  return string;
}
const downloadedData = syncReadFile(dataPath);
// Part One
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
console.log(letters);
console.log(gettingSum(letters));

// PART 2

const gettingBadges = (array) => {
  let badges = [];
  //Getting group
  const groups = [];
  const itemsPerArray = 3;
  for (let i = 0; i < array.length; i += itemsPerArray) {
    groups.push(array.slice(i, i + itemsPerArray));
  }

  //Getting Badges
  for (let groupI = 0; groupI < groups.length; groupI++) {
    let charThatRepeat = "";
    const group = groups[groupI].sort((a, b) => a.length - b.length);
    const shortestElement = group[0];
    const secondElement = group[1];
    const thirdElement = group[2];
    for (let i = 0; i < shortestElement.length; i++) {
      const charOfSmallest = shortestElement[i];
      if (secondElement.includes(charOfSmallest) && thirdElement.includes(charOfSmallest))
        charThatRepeat = charOfSmallest;
    }
    badges.push(charThatRepeat);
  }
  return badges;
};

const badgesLetters = gettingBadges(downloadedData);
console.log(gettingSum(badgesLetters));
