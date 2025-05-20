#!/usr/bin/env node

import showWelcomeMessage from "./welcome.js";
import askInitialQuestions from "./prompts.js";
import runSetup from "./setup.js";

async function runCLI() {
  await showWelcomeMessage();
  const answers = await askInitialQuestions();
  await runSetup(answers);
}

runCLI();
