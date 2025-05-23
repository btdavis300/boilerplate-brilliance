import fs from "fs";
import path from "path";
import chalk from "chalk";

export async function runColorSetup(
  { colors, addColorsToConfig },
  themeDir,
  updateDefaults,
  configPath,
  updateThemeJSON
) {
  // Create color variables for scss file
  let colorVariables = "";
  colors.forEach((color) => {
    colorVariables += `$${color.name}: ${color.color}; \n`;
  });

  // Make colors scss file and insert variables into file
  const globalScssFile = path.join(themeDir, "sass/global");
  // create the file
  fs.writeFileSync(path.join(globalScssFile, "_colors.scss"), colorVariables);
  console.log(chalk.yellow("✅ Created _colors.scss"));

  // Import newly created file into style.scss
  const importColors = '@import "colors";';
  fs.writeFileSync(path.join(globalScssFile, "style.scss"), importColors);

  // Update theme.json
  let themeColors = {
    defaultPalette: false,
    defaultGradients: false,
    palette: [],
  };
  colors.forEach((color) => {
    themeColors.palette.push({
      slug: color.name,
      color: color.color,
      name: color.name,
    });
  });
  const themeFile = path.join(themeDir, "theme.json");
  updateThemeJSON(themeFile, "settings", { color: themeColors });

  // Update config file
  if (addColorsToConfig) {
    updateDefaults(configPath, "sass", "colors", themeColors.palette);
  }
}
