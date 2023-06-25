import { rename } from "node:fs/promises";
import { getArgumentsFromPath } from "../utils/utils.js";

export async function renameFile(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;
  try {
    const [oldName, newName] = clearedPath.trim().split(" ");
    await rename(oldName, newName);
    console.log("You have just renamed a file!");
  } catch ({ message }) {
    console.log(`During deleting of the file and error occured, ${message}`);
  }
}
