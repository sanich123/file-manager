import { createReadStream, createWriteStream } from "node:fs";
import { access, constants, unlink, writeFile } from "node:fs/promises";
import { getArgumentsFromPath } from "../utils/utils.js";

export async function copyOrMoveFile(path, action) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;
  try {
    const [origin, destination] = clearedPath.trim().split(" ");
    await access(origin, constants.F_OK);
    await writeFile(destination, "");
    const readableStream = createReadStream(origin, "utf-8");
    const writableStream = createWriteStream(destination, "utf-8");
    readableStream.pipe(writableStream);
    readableStream.on("end", async () => {
      console.log("The file was successfully recorded");
      if (action === "move") {
        await unlink(origin);
      }
    });
  } catch ({ message }) {
    console.log(`During deleting of the file and error occured, ${message}`);
  }
}
