import fs from "fs";
import inquirer from "inquirer";

export async function askSetupQuestion(configPath) {
  // Ask to add colors to sass files
  const setupMethod = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Select setup method:",
      choices: ["Manual", "Run Config File"],
      default: "Manual",
    },
  ]);

  if (setupMethod.type === "Run Config File") {
    // Validate file path
    if (fs.existsSync(configPath) && fs.statSync(configPath).isFile()) {
      console.log(`File found: ${configPath}`);
    } else {
      console.error(`File does not exist at: ${configPath}`);
      console.log("Will proceed with manual setup");
    }
  }

  return setupMethod.type;
}
