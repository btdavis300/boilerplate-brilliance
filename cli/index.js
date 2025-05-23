#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import * as messages from "./messages.js";
import * as prompts from "./prompts/prompts.js";
import * as setups from "./setup/setup.js";

import {
  toSlug,
  makeThemeDir,
  loadDefaults,
  saveDefaults,
  updateDefaults,
  updateThemeJSON,
} from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(
  __dirname,
  "..",
  ".boilerplate-brilliance-config.json"
);

async function runCLI() {
  let themeDir = "";

  await messages.showWelcomeMessage();
  const initialAnswers = await prompts.askInitialQuestions(
    loadDefaults,
    saveDefaults,
    configPath
  );
  await setups.runInitialSetup(initialAnswers);

  let themeSlug = toSlug(initialAnswers.themeName, "_");
  themeDir = makeThemeDir(themeSlug);

  // check if setup. was successful with making the theme directory
  if (!fs.existsSync(themeDir)) {
    console.error(
      chalk.red(
        `❌ Failed to create theme directory: ${initialAnswers.themeName}`
      )
    );
    return;
  }

  // CSS and Sass setup
  await messages.showSassMessage();
  const stylingAnswers = await prompts.askSassQuestions();
  await setups.runSassSetup(
    stylingAnswers,
    themeDir,
    updateDefaults,
    configPath
  );

  // add Colors to Sass files
  if (stylingAnswers.useSass) {
    await messages.showColorsMessage(toSlug);
    const colorAnswers = await prompts.askColorQuestions();
    await setups.runColorSetup(
      colorAnswers,
      themeDir,
      updateDefaults,
      configPath,
      updateThemeJSON
    );
  }
}

runCLI();
