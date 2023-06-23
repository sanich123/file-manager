import { unlink } from "node:fs/promises";
import { getArgumentsFromPath } from "../utils/utils.js";

export async function removeFile(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;
  try {
    await unlink(clearedPath);
    console.log("You have just deleted a file!");
  } catch ({ message }) {
    console.log(`During deleting of the file and error occured, ${message}`);
  }
}
