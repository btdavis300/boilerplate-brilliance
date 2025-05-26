import inquirer from "inquirer";
import chalk from "chalk";

export async function askPostTypeQuestions(toSlug) {
  const postTypes = [];
  let addMore = true;

  // Ask to add colors to sass files
  const usePostTypes = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmUsage",
      message: "Need to add custom post types?",
      default: true,
    },
  ]);

  // skip process if user declines
  if (usePostTypes.confirmUsage !== true) {
    return { postTypes: false, addPostTypesToConfig: false };
  }

  // add the post types
  while (addMore) {
    const { postTypeName } = await inquirer.prompt([
      {
        type: "input",
        name: "postTypeName",
        message:
          "Enter a post type name (all spaces will be converted to '_'):",
        validate: (input) => (input ? true : "Please enter a post type name."),
      },
    ]);

    postTypes.push(toSlug(postTypeName, "_"));

    const { continueAdding } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueAdding",
        message: "Do you want to add another post type?",
        default: true,
      },
    ]);

    addMore = continueAdding;
  }

  if (postTypes.length >= 1) {
    //display the colors
    console.log("\nYou entered these post types:");
    console.log(postTypes);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ask to add to config file
    const addPostTypesToConfig = await inquirer.prompt([
      {
        type: "confirm",
        name: "addPostTypesToConfig",
        message:
          "Do you want to update your config file with these post types?",
        default: true,
      },
    ]);

    return { postTypes, addPostTypesToConfig };
  } else {
    return { postTypes, addPostTypesToConfig: false };
  }
}
