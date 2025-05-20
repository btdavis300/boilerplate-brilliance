#!/usr/bin/env node
const { run } = require("../src/index");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 --name [your name]")
  .option("name", {
    alias: "n",
    describe: "Your name",
    type: "string",
    demandOption: true,
  })
  .help().argv;

run();
