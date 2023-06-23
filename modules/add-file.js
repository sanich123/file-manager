import { writeFile } from "node:fs/promises";
import { getArgumentsFromPath } from "../utils/utils.js";

export async function addFile(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;
  try {
    await writeFile(clearedPath, "");
    console.log("You've just created a new file! Congratulations!");
  } catch ({ message }) {
    console.log(`During creation of the file and error occured, ${message}`);
  }
}
