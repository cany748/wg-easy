"use strict";

const childProcess = require("node:child_process");

module.exports = class Util {
  static isValidIPv4(str) {
    const blocks = str.split(".");
    if (blocks.length !== 4) return false;

    for (let value of blocks) {
      value = Number.parseInt(value, 10);
      if (Number.isNaN(value)) return false;
      if (value < 0 || value > 255) return false;
    }

    return true;
  }

  static async exec(cmd, { log = true } = {}) {
    if (typeof log === "string") {
      console.log(`$ ${log}`);
    } else if (log === true) {
      console.log(`$ ${cmd}`);
    }

    if (process.platform !== "linux") {
      return "";
    }

    return new Promise((resolve, reject) => {
      childProcess.exec(
        cmd,
        {
          shell: "bash",
        },
        (err, stdout) => {
          if (err) return reject(err);
          return resolve(String(stdout).trim());
        },
      );
    });
  }
};
