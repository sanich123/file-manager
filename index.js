import { showCurrentPlace, sayHelloGoodbyeUser, exitHandler, goUpDirection, goToExactFolder, showFolderContent } from "./utils/utils.js";
import { stdin } from "process";

function fileManager() {
  const { userName } = sayHelloGoodbyeUser();
  showCurrentPlace();
  stdin.on("data", (userInput) => {
    const clearedData = userInput.toString().trim()
    const command = clearedData.slice(0, 2);

    if (command === "up") goUpDirection();
    else if (command === "cd") goToExactFolder(clearedData);
    else if (command === "ls") showFolderContent();
    else if (command === 'cat') {
      readFile();
    }
    exitHandler(userInput, userName);
  });
}

fileManager();
