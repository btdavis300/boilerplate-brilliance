import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { buildWebPackConfig, buildWebPackConfigProd } from "../utils.js";

export function runJavaScriptSetup(
  addJavaScriptToConfig,
  themeDir,
  updateDefaults,
  configPath
) {
  // check if js directory exists, if not, make it exist.
  const jsDir = path.join(themeDir, "js");
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir);
    console.log(chalk.yellow("✅ Created js directory"));
  }

  // make src and dist directories inside js
  const srcDir = path.join(jsDir, "src");
  const distDir = path.join(jsDir, "dist");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
    console.log(chalk.yellow("✅ Created src directory inside js"));
  }
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
    console.log(chalk.yellow("✅ Created dist directory inside js"));
  }

  // setup package.json file using npm init
  console.log(chalk.blue("Setting up package.json file..."));
  execSync("npm init -y", { cwd: jsDir });
  console.log(chalk.yellow("✅ Created package.json file with default values"));

  // install dependencies: terser, webpack, webpack-cli, webpack-dev-server, webpack-merge
  console.log(chalk.blue("Installing dev dependencies..."));
  execSync(
    "npm install --save-dev terser webpack webpack-cli webpack-dev-server webpack-merge",
    { cwd: jsDir }
  );
  console.log(
    chalk.yellow(
      "✅ Installed dependencies: terser, webpack, webpack-cli, webpack-dev-server, webpack-merge"
    )
  );

  // create webpack.config.js file
  const webpackConfigContent = buildWebPackConfig();
  fs.writeFileSync(path.join(jsDir, "webpack.config.js"), webpackConfigContent);
  console.log(chalk.cyan("\n✅ Created webpack.config.js file"));
  // create webpack.prod.js file
  const webpackProdConfigContent = buildWebPackConfigProd();
  fs.writeFileSync(
    path.join(jsDir, "webpack.prod.js"),
    webpackProdConfigContent
  );
  console.log(chalk.cyan("✅ Created webpack.prod.js file"));

  // add scripts to package.json
  const packageJsonPath = path.join(jsDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  packageJson.scripts = {
    ...packageJson.scripts,
    "js-dev":
      "npm run clean-cache && webpack --config webpack.config.js --watch",
    js: "webpack --config webpack.prod.js",
    "clean-cache": "rm -rf node_modules/.cache/webpack",
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(
    chalk.yellow("\n✅ Added scripts to package.json: js-dev, js, clean-cache")
  );

  // Update config file
  if (addJavaScriptToConfig) {
    updateDefaults(configPath, "webpack", false, true);
  }
}
