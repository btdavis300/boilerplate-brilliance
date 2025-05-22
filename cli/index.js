#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import * as Messages from "./messages.js";
import askInitialQuestions from "./prompts/initialPrompt.js";
import askSassQuestions from "./prompts/sassPrompt.js";
import askColorQuestions from "./prompts/colorPrompt.js";

import runSetup from "./setup/setup.js";
import runSassSetup from "./setup/sassSetup.js";

import {
  toSlug,
  makeThemeDir,
  loadDefaults,
  saveDefaults,
  updateDefaults,
} from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(
  __dirname,
  "..",
  ".boilerplate-brilliance-config.json"
);

async function runCLI() {
  let themeDir = "";

  await Messages.showWelcomeMessage();
  const initialAnswers = await askInitialQuestions(
    loadDefaults,
    saveDefaults,
    configPath
  );
  await runSetup(initialAnswers);

  let themeSlug = toSlug(initialAnswers.themeName);
  themeDir = makeThemeDir(themeSlug);

  // check if runSetup was successful with making the theme directory
  if (!fs.existsSync(themeDir)) {
    console.error(
      chalk.red(
        `❌ Failed to create theme directory: ${initialAnswers.themeName}`
      )
    );
    return;
  }

  // CSS and Sass setup
  await Messages.showCSSMessage();
  const stylingAnswers = await askSassQuestions();
  await runSassSetup(stylingAnswers, themeDir, updateDefaults, configPath);

  // add Colors to Sass files
  await Messages.showColorsMessage();
  const colorAnswers = await askColorQuestions();
  console.log(colorAnswers);
}

runCLI();
