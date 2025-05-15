const { formatGreeting } = require("./utils");

function run(name) {
  const message = formatGreeting(name);
  console.log(message);
}

module.exports = { run };
