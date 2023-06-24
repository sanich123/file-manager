import { access, constants } from "fs/promises";
import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { getArgumentsFromPath } from "../utils/utils.js";
import { pipeline } from "stream/promises";

export async function decompressFile(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;

  try {
    const [origin, destination] = clearedPath.trim().split(" ");
    await access(origin, constants.F_OK);
    const originFileRS = createReadStream(origin);
    const destinationFileWS = createWriteStream(destination);
    await pipeline(originFileRS, createBrotliDecompress(), destinationFileWS);
    console.log("We have successfully unzip your file via brotli algorythm");
  } catch ({ message }) {
    console.log(`Some error have occured, ${message}`);
  }
}
