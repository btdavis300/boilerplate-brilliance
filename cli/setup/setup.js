import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { toSlug, makeThemeDir } from "../utils.js";

export default async function runSetup({
  themeName,
  templateName,
  themeURI,
  author,
  description,
  version,
  gitInit,
}) {
  // Validate inputs
  const themeSlug = toSlug(themeName);
  const themeDir = makeThemeDir(themeSlug);

  if (fs.existsSync(themeDir)) {
    console.log(chalk.red(`❌ Directory "${themeSlug}" already exists.`));
    return;
  }

  // Create theme directory
  fs.mkdirSync(themeDir);
  console.log(chalk.green(`📁 Created theme directory: ${themeSlug}`));

  // Create style.css
  const styleCssContent = `/*
  Theme Name: ${themeName}
  ${templateName && `Template: ${templateName}`}
  ${themeURI && `Theme URI: ${themeURI}`}
  Text Domain: ${themeSlug}
  ${author && `Author: ${author}`}
  ${description && `Description: ${description}`}
  ${version && `Version: ${version}`}
  License: GNU General Public License v2 or later
  License URI: http://www.gnu.org/licenses/gpl-2.0.html
  */`;
  fs.writeFileSync(path.join(themeDir, "style.css"), styleCssContent);
  console.log(chalk.blue("✅ Created style.css"));

  // Create functions.php
  const functionsContent = `<?php
  // Theme functions

  function ${themeSlug}_scripts() {
      wp_enqueue_style('${themeSlug}_style', get_stylesheet_directory_uri() . '/css/ponyfill.css', [], filemtime(get_stylesheet_directory() . '/css/ponyfill.css'));
  }
  add_action('wp_enqueue_scripts', '${themeSlug}_scripts');
  `;

  fs.writeFileSync(path.join(themeDir, "functions.php"), functionsContent);
  console.log(chalk.blue("✅ Created functions.php"));

  const gitignoreContent = `node_modules/
  .env
  .DS_Store
  *.log
  *.tmp
  *.bak
  .vscode/
  .idea/
  `;
  fs.writeFileSync(path.join(themeDir, ".gitignore"), gitignoreContent);
  console.log(chalk.blue("✅ Created .gitignore"));

  if (gitInit) {
    try {
      execSync("git init", { cwd: themeDir });
      execSync("git add .", { cwd: themeDir });
      execSync('git commit -m "Initial theme setup"', { cwd: themeDir });
      console.log(chalk.magenta("📘 Git repository initialized."));
    } catch (err) {
      console.log(chalk.red("⚠️ Git initialization failed."));
    }
  }

  console.log(
    chalk.green(
      `\n🎉 Theme "${themeName}" created successfully at: ${themeDir}`
    )
  );
}
