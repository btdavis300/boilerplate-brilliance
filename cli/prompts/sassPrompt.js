import inquirer from "inquirer";

export default async function askSassQuestions() {
  //   const defaults = loadStylingDefaults();

  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "useSass",
      message: "Use Sass for styling?",
      default: true,
    },
    {
      type: "confirm",
      name: "scssChoice",
      message: "Implement default Scss scaffold?:",
      default: true,
    },
  ]);

  return answers;
}
