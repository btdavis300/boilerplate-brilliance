import fs from "fs";
import path from "path";
import chalk from "chalk";
import { buildPostTypeFileContentFile } from "../utils.js";

export async function runPostTypeSetup(
  { postTypes, addPostTypesToConfig },
  themeDir,
  updateDefaults,
  configPath,
  themeSlug
) {
  // Check if inc directory exists, if not, make it exist.
  const incDir = path.join(themeDir, "inc");
  if (!fs.existsSync(incDir)) {
    fs.mkdirSync(incDir);
    console.log(chalk.yellow("✅ Created inc directory"));
  }

  // Check if post-type directory exists, if not, make it exist.
  const postTypeDir = path.join(themeDir, "inc/post-types");
  if (!fs.existsSync(postTypeDir)) {
    fs.mkdirSync(postTypeDir);
    console.log(chalk.yellow("✅ Created post-types directory"));
  }

  // Add the new file into post-types directory as well as functions.php file
  // Read the functions.php file once before the loop
  const functionsFile = path.join(themeDir, "functions.php");
  let functionsContent = fs.existsSync(functionsFile)
    ? fs.readFileSync(functionsFile, "utf-8")
    : "";
  functionsContent += "\n// Post Types"; // Add comment before inserting post types

  // Iterate over post types and append new lines to functionsContent
  postTypes.forEach((postType) => {
    const postTypeConfig = buildPostTypeFileContentFile(postType, themeSlug);
    fs.writeFileSync(path.join(postTypeDir, `${postType}.php`), postTypeConfig);
    console.log(chalk.yellow(`✅ Created ${postType}.php`));

    // Append the include_once line for the current post type
    functionsContent += `\ninclude_once( get_stylesheet_directory() . '/inc/post-types/${postType}.php' );`;
  });

  // Write the updated content back to functions.php once
  fs.writeFileSync(functionsFile, functionsContent, "utf-8");
  console.log(
    "✅ Updated functions.php to include all post types successfully."
  );

  // Update config file
  //   if (addColorsToConfig) {
  //     updateDefaults(configPath, "sass", "colors", themeColors.palette);
  //   }
}
