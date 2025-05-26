import inquirer from "inquirer";

export async function askJavaScriptQuestion() {
  // Ask to add colors to sass files
  const useJavaScript = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmUsage",
      message: "Would you like to use webpack for any JavaScript?",
      default: true,
    },
    {
      type: "confirm",
      name: "addJavaScriptToConfig",
      message: "Add javascript settings to default configuration?",
      default: true,
    },
  ]);

  return useJavaScript;
}
