"use strict";
module.exports = {
  ignoreFiles: [
    "./**",
    "!./client/views/**/*.vue",
    "!./client/views/**/*.scss",
    "!./client/styles/**/*.scss",
    "!./client/plugin/**/*.vue",
    "!./client/plugin/**/*.scss"
  ],
  extends: ["stylelint-config-standard"],
  rules: {
      // 这里可以覆盖一些配置
  }
};