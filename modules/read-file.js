import { createReadStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { stdout } from "node:process";
import { getArgumentsFromPath } from "../utils/utils.js";

export async function readFile(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;
  try {
    await access(clearedPath, constants.F_OK);
    const readableStream = createReadStream(clearedPath, "utf-8");
    readableStream.pipe(stdout);
    readableStream.on("end", () => stdout.write("This is the end... of the file. As Jim Morrison sang earlier."));
  } catch ({ message }) {
    console.log(`Some error with existance of file or path have occured, ${message}`);
  }
}
