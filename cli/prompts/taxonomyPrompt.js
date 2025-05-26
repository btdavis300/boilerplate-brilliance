import inquirer from "inquirer";
import chalk from "chalk";

export async function askTaxonomyQuestions(toSlug, postType) {
  const taxonomies = [];
  let addMore = true;

  // Ask to add colors to sass files
  const useTaxonomies = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmUsage",
      message: "Need to add taxonomies?",
      default: true,
    },
  ]);

  // skip process if user declines
  if (useTaxonomies.confirmUsage !== true) {
    return { taxonomies: false, addTaxonomiesToConfig: false };
  }

  // add the post types
  while (addMore) {
    const { taxonomyName, postTypes } = await inquirer.prompt([
      {
        type: "input",
        name: "taxonomyName",
        message: "Enter a taxonomy name (all spaces will be converted to '_'):",
        validate: (input) => (input ? true : "Please enter a taxonomy name."),
      },
      {
        type: "checkbox",
        name: "postTypes",
        message:
          "Please choose a taxonomy to associate taxonomy (select all that apply):",
        choices: postType,
        validate: function (answer) {
          if (answer.length < 1) {
            return "You must choose at least one option.";
          }
          return true;
        },
      },
    ]);

    taxonomies.push({ name: toSlug(taxonomyName, "_"), postTypes: postTypes });

    const { continueAdding } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueAdding",
        message: "Do you want to add another taxonomy?",
        default: true,
      },
    ]);

    addMore = continueAdding;
  }

  if (taxonomies.length >= 1) {
    //display the colors
    console.log("\nYou entered these taxonomies:");
    console.log(taxonomies);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ask to add to config file
    const addTaxonomiesToConfig = await inquirer.prompt([
      {
        type: "confirm",
        name: "addTaxonomiesToConfig",
        message:
          "Do you want to update your config file with these taxonomies?",
        default: true,
      },
    ]);

    return { taxonomies, addTaxonomiesToConfig };
  } else {
    return { taxonomies, addTaxonomiesToConfig: false };
  }
}
