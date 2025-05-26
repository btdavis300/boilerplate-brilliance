import inquirer from "inquirer";
import chalk from "chalk";

export async function askBlockQuestions() {
  const blocks = [];
  let addMore = true;

  // Ask to add colors to sass files
  const useBlocks = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmUsage",
      message: "Need to add blocks?",
      default: true,
    },
  ]);

  // skip process if user declines
  if (useBlocks.confirmUsage !== true) {
    return { blocks: false, addBlocksToConfig: false };
  }

  // add the post types
  while (addMore) {
    const { blockName, customFields, jsx, javaScript } = await inquirer.prompt([
      {
        type: "input",
        name: "blockName",
        message: "Enter a block name:",
        validate: (input) => (input ? true : "Please enter a block name."),
      },
      {
        type: "confirm",
        name: "customFields",
        message: "Will this block need custom fields?",
        default: false,
      },
      {
        type: "confirm",
        name: "jsx",
        message: "Will this block use JSX (InnerBlocks)?",
        default: false,
      },
      {
        type: "confirm",
        name: "javaScript",
        message: "Will this block need a JavaScript file?",
        default: false,
      },
    ]);

    blocks.push({
      name: blockName,
      customFields: customFields,
      jsx: jsx,
      javaScript: javaScript,
    });

    const { continueAdding } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueAdding",
        message: "Do you want to add another block?",
        default: true,
      },
    ]);

    addMore = continueAdding;
  }

  if (blocks.length >= 1) {
    //display the colors
    console.log("\nYou entered these blocks:");
    console.log(blocks);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ask to add to config file
    const addBlocksToConfig = await inquirer.prompt([
      {
        type: "confirm",
        name: "addBlocksToConfig",
        message: "Do you want to update your config file with these blocks?",
        default: true,
      },
    ]);

    return { blocks, addBlocksToConfig };
  } else {
    return { blocks, addBlocksToConfig: false };
  }
}
