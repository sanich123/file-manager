import { showCurrentPlace, sayHelloGoodbyeUser, exitHandler } from "./utils/utils.js";
import process, { stdin, stdout, exit } from "process";

(function fileManager() {
  const { userName } = sayHelloGoodbyeUser();
  showCurrentPlace();
  stdin.on("data", (data) => exitHandler(data, userName));
})()

