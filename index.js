import {
  showCurrentPlace,
  sayHelloGoodbyeUser,
  exitHandler,
  goUpDirection,
  goToExactFolder,
  showFolderContent,
  getClearedCommand,
} from "./utils/utils.js";
import { readFile } from "./modules/read-file.js";
import { addFile } from "./modules/add-file.js";
import { removeFile } from "./modules/remove-file.js";
import { renameFile } from "./modules/rename-file.js";
import { copyOrMoveFile } from "./modules/copy-move-file.js";
import { getOsInfo } from "./modules/get-os-info.js";
import { hashCalculator } from "./modules/hash-calculator.js";
import { compressFile } from "./modules/compress-file.js";
import { decompressFile } from "./modules/decompress-file.js";
import { ACTIONS, COMMANDS } from "./utils/const.js";
import { stdin } from "process";

function fileManager() {
  const { userName } = sayHelloGoodbyeUser();
  const { up, cd, ls, cat, add, rm, rn, cp, mv, os, hash, compress, decompress } = COMMANDS;
  const { copy, move } = ACTIONS;
  showCurrentPlace();
  stdin.on("data", (userInput) => {
    const { command, clearedData } = getClearedCommand(userInput);
    if (command === up) goUpDirection();
    else if (command === cd) goToExactFolder(clearedData);
    else if (command === ls) showFolderContent();
    else if (command === cat) readFile(clearedData);
    else if (command === add) addFile(clearedData);
    else if (command === rm) removeFile(clearedData);
    else if (command === rn) renameFile(clearedData);
    else if (command === cp) copyOrMoveFile(clearedData, copy);
    else if (command === mv) copyOrMoveFile(clearedData, move);
    else if (command === os) getOsInfo(clearedData);
    else if (command === hash) hashCalculator(clearedData);
    else if (command === compress) compressFile(clearedData);
    else if (command === decompress) decompressFile(clearedData);
    else console.log("We have not recognized your command!");
    exitHandler(userInput, userName);
  });
}

fileManager();
