import { getArgumentsFromPath } from "../utils/utils.js";
import { access, constants } from "fs/promises";
const { createHash } = await import("crypto");

export async function hashCalculator(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;

  try {
    await access(clearedPath, constants.F_OK);
    console.log(createHash("sha256").update(clearedPath).digest("hex"));
  } catch ({ message }) {
    console.log(message);
  }
}
