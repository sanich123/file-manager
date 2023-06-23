import { showCurrentPlace, sayHelloGoodbyeUser, exitHandler, goUpDirection, goToExactFolder, showFolderContent } from "./utils/utils.js";
import { readFile } from "./modules/read-file.js";
import { addFile } from "./modules/add-file.js";
import { removeFile } from "./modules/remove-file.js";
import { renameFile } from "./modules/rename-file.js";
import { copyOrMoveFile } from "./modules/copy-move-file.js";
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
    else if (command.includes("add")) addFile(clearedData);
    else if (command.includes("rm")) removeFile(clearedData);
    else if (command.includes("rn")) renameFile(clearedData);
    else if (command.includes("cp")) copyOrMoveFile(clearedData, "copy");
    else if (command.includes("mv")) copyOrMoveFile(clearedData, "move");
    exitHandler(userInput, userName);
  });
}

fileManager();
