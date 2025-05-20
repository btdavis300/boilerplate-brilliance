import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(
  __dirname,
  "..",
  ".boilerplate-brilliance-config.json"
);

function loadDefaults() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    }
  } catch (err) {
    console.warn("⚠️ Couldn't read config file.");
  }
  return {};
}

function saveDefaults(defaults) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(defaults, null, 2), "utf-8");
  } catch (err) {
    console.error("❌ Failed to save default config.");
  }
}

export default async function askInitialQuestions() {
  const defaults = loadDefaults();

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
      name: "author",
      message: "Author name:",
      default: defaults.author || "Your Name",
    },
    {
      type: "input",
      name: "description",
      message: "Theme description:",
      default: defaults.description || "A custom WordPress theme.",
    },
    {
      type: "input",
      name: "version",
      message: "Version:",
      default: defaults.version || "1.0.0",
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
    saveDefaults({ author, description, version });
  }

  return answers;
}
