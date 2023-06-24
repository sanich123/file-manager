import { stdout, argv, exit, cwd, chdir } from "process";
import { sep } from "path";
import { readdir } from "fs/promises";
import { cliOutputFormatter } from "./output-formatter.js";

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
  const { clearedPath, hasArguments } = getArgumentsFromPath(userInput);
  if (!hasArguments) return;
  try {
    chdir(clearedPath);
    showCurrentPlace();
  } catch ({ message }) {
    console.log(message);
  }
}

export async function showFolderContent() {
  try {
    const filesDirents = await readdir(cwd(), { withFileTypes: true });
    const folders = [];
    const files = [];

    filesDirents.forEach((file) => {
      if (file.isDirectory()) {
        folders.push(["directory", file.name]);
      }
      if (file.isFile()) {
        files.push(["file", file.name]);
      }
    });

    const finalList = [...folders.sort(), ...files.sort()];
    console.log(cliOutputFormatter(finalList));
  } catch ({ message }) {
    console.log(message);
  }
}

export function getArgumentsFromPath(path) {
  const hasArguments = path.indexOf(" ") !== -1;
  let clearedPath;
  if (hasArguments) {
    clearedPath = path.slice(path.indexOf(" ")).trim();
  } else {
    console.log("You haven't pass arguments to our app. Try with arguments!");
  }
  return { clearedPath, hasArguments };
}

export function getClearedCommand(userInput) {
  const clearedData = userInput.toString().trim();
  const commandZone = clearedData.slice(0, 10);
  const command = commandZone.includes(" ") ? clearedData.slice(0, clearedData.indexOf(" ")) : commandZone;
  return { clearedData, command };
}
