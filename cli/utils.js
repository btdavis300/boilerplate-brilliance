import path from "path";
import fs from "fs";

export function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");
}

export function makeThemeDir(themeSlug) {
  return path.join(process.cwd(), themeSlug);
}

export function loadDefaults(configPath) {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } else {
      const configContent = {
        themeSetup: {
          author: "Author",
          description: "This is your Wordpress theme",
          version: "1.0.0",
        },
      };

      fs.writeFileSync(
        configPath,
        JSON.stringify(configContent, null, 2),
        "utf-8"
      );
    }

    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch (err) {
    console.warn("⚠️ Couldn't read config file.");
  }
  return {};
}

export function saveDefaults(defaults, configPath) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(defaults, null, 2), "utf-8");
  } catch (err) {
    console.error("❌ Failed to save default config.");
  }
}

export function updateDefaults(configPath, property, subproperty, updates) {
  try {
    if (fs.existsSync(configPath)) {
      let json = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      json[property][subproperty] = updates; // update the JSON

      // update config file
      fs.writeFile(configPath, JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        console.log("✅ Default config file updated successfully.");
      });
    }
  } catch (err) {
    console.warn("⚠️ Couldn't read config file.");
  }
}

export function updateThemeJSON(themePath, property, updates) {
  try {
    if (fs.existsSync(themePath)) {
      let theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));
      theme[property] = updates; // update the JSON

      // update config file
      fs.writeFile(themePath, JSON.stringify(theme, null, 2), (err) => {
        if (err) throw err;
        console.log("✅ theme.json file updated successfully.");
      });
    }
  } catch (err) {
    console.warn("⚠️ Couldn't read theme.json file.");
  }
}
