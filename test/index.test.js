const { formatGreeting } = require("../src/utils");

function testFormatGreeting() {
  const result = formatGreeting("Alice");
  const expected = "Hello, Alice! Nice to meet you.";

  console.assert(
    result === expected,
    `Expected "${expected}", got "${result}"`
  );
  console.log("✅ testFormatGreeting passed.");
}

testFormatGreeting();
