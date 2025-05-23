import fs from "fs";
import path from "path";
import chalk from "chalk";

export async function runSassSetup(
  { useSass, scssChoice },
  themeDir,
  updateDefaults,
  configPath
) {
  // Create css directory and ponyfill.css
  const cssDir = path.join(themeDir, "css");

  fs.mkdirSync(cssDir);
  console.log(chalk.blue("✅ Created css directory"));

  const ponyfillCssContent = `/* Ponyfill CSS */
`;
  fs.writeFileSync(path.join(cssDir, "ponyfill.css"), ponyfillCssContent);
  console.log(chalk.yellow("✅ Created ponyfill.css"));

  // Create sass directory and ponyfill.scss if useSass is true
  if (!useSass) {
    console.log(chalk.yellow("⚠️ Skipping Sass setup as per user choice."));
    return;
  }

  const sassDir = path.join(themeDir, "sass");

  fs.mkdirSync(sassDir);
  const ponyfillScssContent = `// Ponyfill SCSS
`;
  console.log(chalk.blue("✅ Created sass directory"));

  fs.writeFileSync(path.join(sassDir, "ponyfill.scss"), ponyfillScssContent);
  console.log(chalk.blue("✅ Created ponyfill.scss \n"));

  if (scssChoice) {
    const directories = [
      "archive",
      "base",
      "blocks",
      "elements",
      "global",
      "page",
      "single",
    ];

    directories.forEach((dir) => {
      // make the directory
      const dirPath = path.join(sassDir, dir);
      fs.mkdirSync(dirPath);

      // make the style.scss file inside the directory
      fs.writeFileSync(path.join(dirPath, "style.scss"), "");
      // log the creation of the file
      console.log(chalk.blue(`✅ Created ${dir}/style.scss`));

      // import the style.scss file in ponyfill.scss (already created)
      const importStatement = `@import "${dir}/style";\n`;
      const ponyfillScssPath = path.join(sassDir, "ponyfill.scss");
      const ponyfillScssContent = fs.readFileSync(ponyfillScssPath, "utf-8");
      fs.writeFileSync(ponyfillScssPath, ponyfillScssContent + importStatement);
      // log the import statement
      console.log(
        chalk.blue(
          `✅ Imported style.scss of ${dir} directory into ponyfill.scss`
        )
      );
    });

    // Update config file
    updateDefaults(configPath, "sass", "parentDir", directories);
  }
}
