import { stdout, argv, exit, cwd, chdir } from "process";
import { sep } from "path";
import { readdir } from "fs";

export function sayHelloGoodbyeUser() {
  const userName = argv[3].split("=")[1];
  stdout.write(`Welcome to the File Manager, ${userName}\n`);
  process.on("SIGINT", () => {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
    exit();
  });

  return { userName };
}

export function showCurrentPlace() {
  return stdout.write(`You are currently in ${cwd()}\n`);
}

export function exitHandler(input, userName) {
  const properString = input.toString().trim();
  if (properString === "exit" || properString === ".exit") {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
    exit();
  }
}

export function goUpDirection() {
  try {
    const directoryArr = cwd().split(sep);
    const upDir = directoryArr.slice(0, -1).join(sep);
    chdir(upDir);
    stdout.write(`Now you are at ${upDir}${directoryArr.length === 2 ? ", it's a fucking root directory! Don't fucking move!" : ""}\n`);
  } catch ({ message }) {
    console.log(message);
  }
}

export function goToExactFolder(userInput) {
  const clearedPath = userInput.toString().replace("cd", "").trim();
  try {
    chdir(clearedPath);
    showCurrentPlace();
  } catch ({ message }) {
    console.log(message);
  }
}

export async function showFolderContent() {
  try {
    const fileNames = readdir(cwd(), (err, files) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(files);
      }
    });
    console.log(fileNames)
  } catch ({ message }) {
    console.log(message);
  }
}
