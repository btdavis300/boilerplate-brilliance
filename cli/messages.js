import ora from "ora";
import chalk from "chalk";

// Welcome Message
export async function showWelcomeMessage() {
  console.clear();
  console.log(chalk.bold.blue("Boilerplate Brilliance"));
  console.log(chalk.cyan(`🌑 The abyss stares back, as the terminal hums...`));
  console.log(
    chalk.gray(`🗝️ In the depths of deprecated libraries, you find **Boilerplate Brilliance**.
  
    This tool, ancient and near-forgotten, still shapes the bones of WordPress.
    Kindle your fire. Shall you choose to keep the flame burning or not, you determine your fate...`)
  );
  console.log(chalk.green("Setting up your WordPress theme...\n"));

  const spinner = ora("Initializing...").start();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  spinner.succeed("Ready!");
}

// Sass Message
export async function showSassMessage() {
  console.log(chalk.green("Setting up CSS and Sass configuration...\n"));

  const spinner = ora("Initializing CSS and Sass setup...").start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.succeed("Ready!");
}

// Colors Message
export async function showColorsMessage() {
  console.log(chalk.green("Setting up color configuration...\n"));

  const spinner = ora("Initializing setup...").start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.succeed("Ready!");
}

// Post Type Message
export async function showPostTypeMessage() {
  console.log(chalk.green("Setting up post type configuration...\n"));

  const spinner = ora("Initializing setup...").start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.succeed("Ready!");
}

// Taxonomy Message
export async function showTaxonomyMessage() {
  console.log(chalk.green("Setting up taxonomy configuration...\n"));

  const spinner = ora("Initializing setup...").start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.succeed("Ready!");
}

// Block Message
export async function showBlockMessage() {
  console.log(chalk.green("Setting up block configuration...\n"));

  const spinner = ora("Initializing setup...").start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.succeed("Ready!");
}
