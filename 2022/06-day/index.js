const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").trim();
  return string;
}
function hasRepeats(str) {
  return /(.).*\1/.test(str);
}
const downloadedData = syncReadFile(dataPath);
let firstMarker;
for (let index = 0; index < downloadedData.length; index++) {
  // increasing char by 1  but checking with 4 chars
    if (!hasRepeats(downloadedData.slice(index, index + 14))) {
      firstMarker = index+14;
      break;
    }
}
console.log(firstMarker);
