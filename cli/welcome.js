import ora from "ora";
import chalk from "chalk";

export default async function showWelcomeMessage() {
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
