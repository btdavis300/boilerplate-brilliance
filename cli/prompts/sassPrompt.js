import inquirer from "inquirer";

export async function askSassQuestions() {
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
      when: (answers) => answers.useSass === true, // Only ask if "useSass" is true
    },
  ]);

  return answers;
}
