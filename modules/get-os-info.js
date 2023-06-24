import { EOL, cpus, homedir, userInfo, arch } from "os";
import { getArgumentsFromPath } from "../utils/utils.js";
import { COMMANDS } from "../utils/const.js";

export function getOsInfo(path) {
  const { clearedPath, hasArguments } = getArgumentsFromPath(path);
  const { eol, cpuInfo, homedirInfo, username, architecture } = COMMANDS;

  if (!hasArguments) return;
  if (clearedPath === eol) {
    EOL.includes("\r")
      ? console.log("You have a windows os, and your end-of-line is \\r\\n ")
      : console.log("You have a POSIX os, and your end-of-line is \\n ");
  } else if (clearedPath === cpuInfo) {
    console.log(`Info about your cpu  - `, cpus());
  } else if (clearedPath === homedirInfo) {
    console.log(`Your home directory is ${homedir()}`);
  } else if (clearedPath === username) {
    console.log(`Your user info is`, userInfo());
  } else if (clearedPath === architecture) {
    console.log(`Your architecture is`, arch());
  } else {
    console.log("We didn't recognize your command");
  }
}
