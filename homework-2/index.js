const fs = require("fs");
const os = require("os");
const childProcess = require("child_process");

let cmd;
const cmdUnixLikeOS = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
const cmdWindows = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

const timeUnit = 10;
const timeProcess = 1000 / timeUnit; // ten times per second
const timeLog = 60 * timeUnit; // once per minute

let count = 0;

const execProcess = (command, timeLog) => {
  count++;
  childProcess.exec(command, (error, stdout, stderr) => {
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    if (error !== null) {
      console.log(`error: ${error}`);
      return;
    }
    const result = stdout.trim();
    // process.stdout.clearLine();
    // process.stdout.cursorTo(0);
    process.stdout.write(`${result} \r`);
    if (count === timeLog) {
      addLogToFile(stdout);
      count = 0;
    }
  });
};

const addLogToFile = (processInfo) => {
  const unixTime = new Date() / 1000;
  fs.appendFile(
    "activityMonitor.log",
    `${unixTime} : ${processInfo}`,
    (err) => {
      if (err) throw err;
    }
  );
};

if (process.platform === 'darwin' || process.platform === 'linux') {
  cmd = cmdUnixLikeOS ;
} else if (process.platform === 'win32') {
  cmd = cmdWindows;
}

setInterval(() => execProcess(cmd, timeLog), timeProcess);
