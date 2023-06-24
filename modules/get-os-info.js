import { getArgumentsFromPath } from "../utils/utils.js";
import { EOL, cpus, homedir, userInfo, arch } from "os";

export function getOsInfo(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  if (!hasArguments) return;
  if (clearedPath.includes("EOL")) {
    EOL.includes("\r")
      ? console.log("You have a windows os, and your end-of-line is \\r\\n ")
      : console.log("You have a POSIX os, and your end-of-line is \\n ");
  }
  if (clearedPath.includes("cpus")) {
    console.log(`Info about your cpu  - ${cpus()}`);
  }
  if (clearedPath.includes("homedir")) {
    console.log(`Your home directory is ${homedir()}`);
  }
  if (clearedPath.includes("username")) {
    console.log(`Your user info is`, userInfo());
  }
  if (clearedPath.includes("architecture")) {
    console.log(`Your architecture is`, arch());
  }
}
