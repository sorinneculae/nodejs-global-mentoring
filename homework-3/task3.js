import * as fs from "fs";
import * as events from "events";
import readline from "readline";
import pkg from "csvtojson";
const { csv } = pkg;

const csvFilePath = "./homework-3/csvdirectory/nodejs-hw1-ex1.csv";
const jsonFilePath = "./homework-3/books.txt";

const readableStream = fs.createReadStream(csvFilePath);
const writableStream = fs.createWriteStream(jsonFilePath);

readableStream.pipe(csv()).pipe(writableStream);

readableStream.on("error", (err) => {
  console.error("Error reading CSV file:", err);
});

writableStream.on("error", (err) => {
  console.error("Error writing to text file:", err);
});

// ----------------------------------------------------------------------------------------------

// {"book":"The Compound Effect","author":"Darren Hardy","price":9.48}
// {"book":"The 7 Habits of Highly Effective People","author":"Stephen R. Covey","price":23.48}
// {"book":"The Miracle Morning","author":"Hal Elrod","price":21.34}
// {"book":"Influence: The Psychology of Persuasion","author":"Robert B. Cialdini","price":12.99}
// {"book":"The ONE Thing","author":"Gary Keller","price":11.18}

// ----------------------------------------------------------------------------------------------

// async function logChunks(readable) {
//     for await (const chunk of readable) {
//         console.log(chunk);
//     }
// }

// const readable = fs.createReadStream(csvFilePath, {encoding: 'utf8'});
// logChunks(readable);

// ----------------------------------------------------------------------------------------------

// async function processLineByLine() {
//   try {
//     const rl = readline.createInterface({
//       input: fs.createReadStream(csvFilePath),
//     });

//     rl.on('line', (line) => {
//       console.log(`Line from file: ${line}`);
//     });

//     await events.once(rl, 'close');
//   } catch (err) {
//     console.error(err);
//   }
// };

// processLineByLine();
