const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").split("\n");
  return string;
}
const downloadedData = syncReadFile(dataPath);
const clearedCommands = downloadedData.filter((item) => item != "$ ls");
const root = {
  name: "/",
  isDirectory: true,
  children: [],
};
const addingDataToRoot = (object) => {
  const root = object;
  let currentElement = root;
  clearedCommands.forEach((data) => {
    const typeOfCommand = data[0];
    const indexOfSpace = data.indexOf(" ");
    switch (typeOfCommand) {
      case "d":
        //DIR
        const directoryName = data.slice(indexOfSpace + 1, data.length);
        currentElement.children.push({
          name: directoryName,
          isDirectory: true,
          parent: currentElement,
          children: [],
        });
        break;
      case "$":
        //cd
        const indexOfSecondSpace = data.lastIndexOf(" ");
        const dirName = data.slice(indexOfSecondSpace + 1, data.length);
        if (dirName == "..") {
          // cd..
          currentElement = currentElement.parent;
        } else {
          // cd folderName
          currentElement = currentElement.children.find((file) => file.isDirectory && file.name === dirName);
        }
        break;
      default:
        const nameOfFile = data.slice(indexOfSpace + 1, data.length);
        const valueOfFile = Number(data.slice(0, indexOfSpace));
        currentElement.children.push({
          name: nameOfFile,
          isDirectory: false,
          parent: currentElement,
          size: valueOfFile,
        });
        break;
    }
  });
};
console.log(clearedCommands);
addingDataToRoot(root);
const printTree = (element, depthLevel = 0) => {
  console.log(
    `${" ".repeat(depthLevel * 2)} - ${element.name} (${element.isDirectory ? "dir" : `file, size= ${element.size}`})`
  );
  if (element.isDirectory) {
    element.children.forEach((child) => printTree(child, depthLevel + 1));
  }
};
const getSize = (element, directoryCallback) => {
  if (!element.isDirectory) return element.size;
  const directorySize = element.children.map((child) => getSize(child, directoryCallback)).reduce((a, b) => a + b, 0);
  directoryCallback(element.name, directorySize);
  return directorySize;
};
const gettingSums = (root) => {
  const sizes = [];
  root.children.forEach((child) => {
    getSize(child, (name, size) => {
      sizes.push(size);
    });
  });
  return sizes.filter((item) => item < 100000).reduce((a, b) => a + b, 0);
};
console.log(gettingSums(root));
