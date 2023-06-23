import { showCurrentPlace, sayHelloGoodbyeUser, exitHandler, goUpDirection, goToExactFolder, showFolderContent } from "./utils/utils.js";
import { readFile, addFile } from "./utils/file-operations.js";
import { stdin } from "process";

function fileManager() {
  const { userName } = sayHelloGoodbyeUser();
  showCurrentPlace();
  stdin.on("data", (userInput) => {
    const clearedData = userInput.toString().trim();
    const command = clearedData.slice(0, 3);

    if (command.includes("up")) goUpDirection();
    else if (command.includes("cd")) goToExactFolder(clearedData);
    else if (command.includes("ls")) showFolderContent();
    else if (command.includes("cat")) readFile(clearedData);
    else if (command.includes("add")) addFile(clearedData)
    exitHandler(userInput, userName);
  });
}

fileManager();
