const { readFileSync, promises: fsPromises } = require("fs");
const dataPath = "./data.txt";
//Getting Data from TXT
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const string = contents.replace(/\r/g, "").split("\n");
  const commands = string.map((item) => item.slice(0, 4));
  const values = string.map((item) => {
    const indexOfSpace = item.indexOf(" ");
    if (indexOfSpace == -1) {
      return 0;
    } else {
      return Number(item.slice(indexOfSpace + 1));
    }
  });

  return [commands, values];
}
const commands = syncReadFile(dataPath)[0];
const values = syncReadFile(dataPath)[1];

function instructionReader() {
  let x = 1;
  let amountOfCycles = 1;
  const signalStrength = []; // CYCLE NUMBER * X  (EVERY 40 CYCLES AFTER 20TH)
  commands.forEach((command, index) => {
    // CYCLES + REGISTER VALUE
    if (signalStrength.length == 6) return 0;
    if (command == "noop") amountOfCycles += 1;
    else {
      amountOfCycles += 1;
      if (amountOfCycles % 40 == 20) signalStrength.push(amountOfCycles * x);
      amountOfCycles += 1;
      x += values[index];
    }
    if (amountOfCycles % 40 == 20) {
      signalStrength.push(amountOfCycles * x);
    }
  });
  console.log(signalStrength.reduce((a, b) => a + b, 0));
}
instructionReader();
