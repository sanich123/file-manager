import { stdout, argv, exit } from "process";

export function sayHelloGoodbyeUser() {
  const userName = argv[3].split("=")[1];
  stdout.write(`Welcome to the File Manager, ${userName}\n`);
  process.on("SIGINT", () => stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`));
  return { userName };
}

export function showCurrentPlace() {
  return stdout.write(`You are currently in ${argv[1]}\n`);
}

export function exitHandler(input, userName) {
  const properString = input.toString().trim();
  if (properString === "exit" || properString === ".exit") {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
    exit();
  }
}
