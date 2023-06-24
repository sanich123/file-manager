import { access, constants } from "fs/promises";
import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { getArgumentsFromPath } from "../utils/utils.js";

export async function compressFile(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;

  try {
    const [origin, destination] = clearedPath.trim().split(" ");
    await access(origin, constants.F_OK);
    const originFileRS = createReadStream(origin, "utf-8");
    const destinationFileWS = createWriteStream(destination, "utf-8");
    const stream = originFileRS.pipe(createBrotliCompress()).pipe(destinationFileWS);
    stream.on("finish", () => console.log("We have just successfully compress your file!"));
  } catch ({ message }) {
    console.log(`Some error with existance of file or path have occured, ${message}`);
  }
}
