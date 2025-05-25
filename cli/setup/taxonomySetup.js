import fs from "fs";
import path from "path";
import chalk from "chalk";
import { buildTaxonomyFileContentFile } from "../utils.js";

export async function runTaxonomySetup(
  { taxonomies, addTaxonomiesToConfig },
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

  // create taxonomy directory
  const taxonomyDir = path.join(themeDir, "inc/taxonomy");
  if (!fs.existsSync(taxonomyDir)) {
    fs.mkdirSync(taxonomyDir);
    console.log(chalk.yellow("✅ Created taxonomy directory"));
  }

  // Add the new file into taxonomy directory as well as functions.php file
  // Read the functions.php file once before the loop
  const functionsFile = path.join(themeDir, "functions.php");
  let functionsContent = fs.existsSync(functionsFile)
    ? fs.readFileSync(functionsFile, "utf-8")
    : "";
  functionsContent += "\n\n// Taxonomies"; // Add comment before inserting post types

  // Iterate over taxonomies and append new lines to functionsContent
  taxonomies.forEach((taxonomy) => {
    const taxonomyConfig = buildTaxonomyFileContentFile(taxonomy, themeSlug);
    fs.writeFileSync(
      path.join(taxonomyDir, `${taxonomy.name}.php`),
      taxonomyConfig
    );
    console.log(chalk.yellow(`✅ Created ${taxonomy.name}.php`));

    // Append the include_once line for the current post type
    functionsContent += `\ninclude_once( get_stylesheet_directory() . '/inc/taxonomy/${taxonomy.name}.php' );`;
  });

  // Write the updated content back to functions.php once
  fs.writeFileSync(functionsFile, functionsContent, "utf-8");
  console.log(
    "✅ Updated functions.php to include all taxonomies successfully."
  );

  // Update config file
  if (addTaxonomiesToConfig) {
    updateDefaults(configPath, "inc", "taxonomies", taxonomies);
  }
}
