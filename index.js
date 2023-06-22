import { showCurrentPlace, sayHelloGoodbyeUser, exitHandler, goUpDirection, goToExactFolder, showFolderContent } from "./utils/utils.js";
import { stdin, stdout } from "process";

function fileManager() {
  const { userName } = sayHelloGoodbyeUser();
  showCurrentPlace();
  stdin.on("data", (userInput) => {
    const clearData = userInput.toString().trim();
    if (clearData.includes("up")) goUpDirection();
    if (clearData.includes("cd")) goToExactFolder(clearData);
    if (clearData.includes("ls")) showFolderContent();
    exitHandler(userInput, userName);
  });
}

fileManager();
