// const repl = require('repl');
// const local = repl.start('$ ');
// local.on('exit', () => {
//   console.log('exiting repl');
//   process.exit();
// });

function getRandomNumber() {
  return Math.floor(Math.random() * 11);
}

console.log(`Your random number for the first ${__dirname.split('/').pop()} homework is ${getRandomNumber()}`);

