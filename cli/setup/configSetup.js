import fs from "fs";
import * as setups from "./setup.js";
import ora from "ora";
import chalk from "chalk";
import { updateThemeJSON } from "../utils.js";

export async function runConfigSetup(
  configPath,
  themeDir,
  updateDefaults,
  themeSlug,
  themeName,
  toSlug
) {
  // Read config fil
  let config = {};
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }
  console.log(chalk.green("Reading configuration file...\n"));

  const reader = ora("Reading...").start();
  await new Promise((resolve) => setTimeout(resolve, 1500));
  reader.succeed("JSON Parsed");

  console.log(chalk.green("Initializing theme files...\n"));

  const creator = ora("Creating theme files...").start();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // execute setup functions
  // sass and colors setup
  if ("sass" in config) {
    if ("colors" in config.sass) {
      const colors = config.sass.colors;
      // run sass and css setup
      await setups.runSassSetup(
        { useSass: true, scssChoice: true },
        themeDir,
        updateDefaults,
        configPath
      );

      await setups.runColorSetup(
        { colors: colors, addColorsToConfig: false },
        themeDir,
        false,
        false,
        updateThemeJSON
      );
    }
  } else {
    // just run css setup
    await setups.runSassSetup({ useSass: false, scssChoice: false }, themeDir);
  }

  if ("inc" in config) {
    // post type setup
    if ("postTypes" in config.inc) {
      const postTypes = config.inc.postTypes;
      await setups.runPostTypeSetup(
        { postTypes: postTypes, addPostTypesToConfig: false },
        themeDir,
        false,
        false,
        themeSlug
      );
    }

    // taxonomy setup
    if ("taxonomies" in config.inc) {
      const taxonomies = config.inc.taxonomies;
      await setups.runTaxonomySetup(
        { taxonomies: taxonomies, addTaxonomiesToConfig: false },
        themeDir,
        false,
        configPath,
        themeSlug
      );
    }
  }

  if ("blocks" in config) {
    // block setup
    const blocks = config.blocks;
    const useSass = "sass" in config;
    await setups.runBlockSetup(
      { blocks: blocks, addBlocksToConfig: false },
      themeDir,
      false,
      configPath,
      themeSlug,
      toSlug,
      themeName,
      useSass
    );
  }

  creator.succeed(chalk.green("Theme set up complete!"));
}
