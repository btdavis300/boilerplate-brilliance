import inquirer from "inquirer";
import chalk from "chalk";

export async function askColorQuestions(toSlug) {
  const colors = [];
  let addMore = true;

  // Ask to add colors to sass files
  const useColors = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmUsage",
      message: "Add colors to sass files?",
      default: true,
    },
  ]);

  // skip process if user declines
  if (useColors.confirmUsage !== true) {
    console.log(chalk.yellow("⚠️ Skipping colors setup as per user choice."));
    return { colors, addColorsToConfig: false };
  }

  // add the colors
  while (addMore) {
    const { colorName, hexCode } = await inquirer.prompt([
      {
        type: "input",
        name: "colorName",
        message: "Enter a color name:",
        validate: (input) => (input ? true : "Please enter a color name."),
      },
      {
        type: "input",
        name: "hexCode",
        message: "Enter the hex code for this color (e.g., #FF5733):",
        validate: (input) =>
          /^#([0-9A-Fa-f]{3,8})$/.test(input) ||
          "Please enter a valid hex code (e.g., #A1B2C3).",
      },
    ]);

    colors.push({ name: toSlug(colorName, "_"), color: hexCode });

    const { continueAdding } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueAdding",
        message: "Do you want to add another color?",
        default: true,
      },
    ]);

    addMore = continueAdding;
  }

  if (colors.length >= 1) {
    //display the colors
    console.log("\nYou entered these colors:");
    console.log(colors);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ask to add to config file
    const addColorsToConfig = await inquirer.prompt([
      {
        type: "confirm",
        name: "addColorsToConfig",
        message: "Do you want to update your config file with these colors?",
        default: true,
      },
    ]);

    return { colors, addColorsToConfig };
  } else {
    return { colors, addColorsToConfig: false };
  }
}
