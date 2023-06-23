import { showCurrentPlace, sayHelloGoodbyeUser, exitHandler, goUpDirection, goToExactFolder, showFolderContent } from "./utils/utils.js";
import { stdin, stdout } from "process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function fileManager() {
  const { userName } = sayHelloGoodbyeUser();
  showCurrentPlace();
  stdin.on("data", (userInput) => {
    const clearData = userInput.toString().trim();
    if (clearData.includes("up")) goUpDirection();
    else if (clearData.includes("cd")) goToExactFolder(clearData);
    else if (clearData.includes("ls")) showFolderContent();
    exitHandler(userInput, userName);
  });
}

fileManager();
