import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");
}

export default async function runSetup({
  themeName,
  author,
  description,
  version,
  gitInit,
}) {
  const themeSlug = toSlug(themeName);
  const themeDir = path.join(process.cwd(), themeSlug);

  if (fs.existsSync(themeDir)) {
    console.log(chalk.red(`❌ Directory "${themeSlug}" already exists.`));
    return;
  }

  fs.mkdirSync(themeDir);
  console.log(chalk.green(`📁 Created theme directory: ${themeSlug}`));

  const styleCssContent = `/*
Theme Name: ${themeName}
Text Domain: ${themeSlug}
Author: ${author}
Description: ${description}
Version: ${version}
*/`;
  fs.writeFileSync(path.join(themeDir, "style.css"), styleCssContent);
  console.log(chalk.blue("✅ Created style.css"));

  const functionsContent = `<?php
// Theme functions

function ${themeSlug}_scripts() {
    wp_enqueue_style('${themeSlug}-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', '${themeSlug}_scripts');
`;
  fs.writeFileSync(path.join(themeDir, "functions.php"), functionsContent);
  console.log(chalk.blue("✅ Created functions.php"));

  const indexContent = `<?php get_header(); ?>

<h1>Welcome to ${themeName}</h1>

<?php get_footer(); ?>`;
  fs.writeFileSync(path.join(themeDir, "index.php"), indexContent);
  console.log(chalk.blue("✅ Created index.php"));

  fs.writeFileSync(path.join(themeDir, "screenshot.png"), "");
  console.log(chalk.blue("✅ Created screenshot.png"));

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
