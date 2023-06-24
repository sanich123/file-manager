import { getArgumentsFromPath } from "../utils/utils.js";
import { access, constants } from "fs/promises";
const { createHash } = await import("crypto");

export async function hashCalculator(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
    console.log(clearedPath)
  if (!hasArguments) return;

  await access(clearedPath, constants.F_OK);

  console.log(createHash("sha256").update(clearedPath).digest("hex"));
}
