import inquirer from "inquirer";

export async function askInitialQuestions(
  loadDefaults,
  saveDefaults,
  configPath
) {
  const defaults = loadDefaults(configPath);

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "themeName",
      message: "Theme name/text domain:",
      validate: (input) =>
        input.trim() ? true : "Theme name cannot be empty.",
    },
    {
      type: "input",
      name: "templateName",
      message: "Template Name (for child themes only):",
    },
    {
      type: "input",
      name: "themeURI",
      message: "Theme URI:",
    },
    {
      type: "input",
      name: "author",
      message: "Author name:",
      default: defaults.themeSetup.author || "Your Name",
    },
    {
      type: "input",
      name: "description",
      message: "Theme description:",
      default: defaults.themeSetup.description || "A custom WordPress theme.",
    },
    {
      type: "input",
      name: "version",
      message: "Version:",
      default: defaults.themeSetup.version || "1.0.0",
    },
    {
      type: "confirm",
      name: "gitInit",
      message: "Initialize a Git repository?",
      default: true,
    },
    {
      type: "confirm",
      name: "saveDefaults",
      message: "Save these values as defaults for future themes?",
      default: false,
    },
  ]);

  if (answers.saveDefaults) {
    const { author, description, version } = answers;
    saveDefaults(configPath, { themeSetup: { author, description, version } });
  }

  return answers;
}
