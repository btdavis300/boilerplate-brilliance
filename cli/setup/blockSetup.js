import fs from "fs";
import path from "path";
import chalk from "chalk";
import { buildBlockJSONConfig } from "../utils.js";
import { buildBlockConfig } from "../utils.js";

export async function runBlockSetup(
  { blocks, addBlocksToConfig },
  themeDir,
  updateDefaults,
  configPath,
  themeSlug,
  toSlug,
  themeName,
  useSass
) {
  if (!blocks) {
    console.log(chalk.yellow("⚠️ Skipping block setup as per user choice."));
    return;
  }

  // Check if blocks directory exists, if not, make it exist.
  const blocksDir = path.join(themeDir, "blocks");
  if (!fs.existsSync(blocksDir)) {
    fs.mkdirSync(blocksDir);
    console.log(chalk.yellow("✅ Created blocks directory"));
  }

  // Read the functions.php file once before the loop
  // Declare block registration variable
  // Add this variable into functions.php after the loop
  const functionsFile = path.join(themeDir, "functions.php");
  let functionsContent = fs.existsSync(functionsFile)
    ? fs.readFileSync(functionsFile, "utf-8")
    : "";

  let blockRegistrations = `\n\n
/**
 * Register blocks
 */

 function ${themeSlug}_register_blocks() {`;
  let blockFieldGroups = "\n\n// ACF Fields Groups";

  // iterate over blocks to set up all files
  blocks.forEach((block) => {
    // make block slug
    const slug = toSlug(block.name, "_");

    // create block directory
    const blockDir = path.join(themeDir, `blocks/${slug}`);
    if (!fs.existsSync(blockDir)) {
      fs.mkdirSync(blockDir);
      console.log(chalk.blue(`\nCreating ${block.name} block...`));
      console.log(chalk.cyan(`✅ Created ${block.name}  directory`));
    }

    // make block.json file
    const blockJSONConfig = buildBlockJSONConfig(block, slug, themeSlug);
    fs.writeFileSync(path.join(blockDir, "block.json"), blockJSONConfig);
    console.log(chalk.cyan(`✅ Created block.json`));

    // make block file.
    const blockConfig = buildBlockConfig(block.name);
    fs.writeFileSync(path.join(blockDir, `${slug}.php`), blockConfig);
    console.log(chalk.cyan(`✅ Created ${slug}.php`));
    // Append this registration line to blockRegistrations (will be added to functions.php after this loop)
    blockRegistrations += `\n//${slug} block
    register_block_type( __DIR__ . '/blocks/${slug}/block.json' );\n`;

    // if block requires custom fields, create field group file.
    if (block.customFields) {
      fs.writeFileSync(path.join(blockDir, `${slug}_field_group.php`), " ");
      console.log(chalk.cyan(`✅ Created ${slug}_field_group.php`));
      // add include_once to blockFieldGroups (will be added to functions.php after this loop)
      blockFieldGroups += `\ninclude_once( get_stylesheet_directory() . '/blocks/${slug}/${slug}_field_group.php' );`;
    }

    // Add sass file for block, if useSass is true
    // If style.scss exists in sass/blocks, add sass file. Otherwise create the file.
    // import style into ponyfill.scss
    if (useSass) {
      fs.writeFileSync(
        path.join(path.join(themeDir, "sass/blocks"), `_${slug}.scss`),
        `// ${block.name} Styling`
      );
      console.log(chalk.cyan(`✅ Created _${slug}.scss`));

      const blockStyleFile = path.join(themeDir, "sass/blocks/style.scss");
      let blockStyleContent = fs.existsSync(blockStyleFile)
        ? fs.readFileSync(blockStyleFile, "utf-8")
        : "";
      blockStyleContent += `\n@import "${slug}";`;
      fs.writeFileSync(blockStyleFile, blockStyleContent, "utf-8");
      console.log(chalk.cyan(`✅ Updated sass files for ${block.name}.`));
    }
  });

  // if blocks exist, make block category
  // TODO: put this above block iteration loop
  if (blocks) {
    const blockPatternRegistry = `\n\n/**
    * Add ${themeName} Block Category
    */
    add_filter('block_categories_all', function ($categories) {
        // Adding a new category.
        $categories[] = array(
            'slug'  => '${themeSlug}_blocks_category',
            'title' => '${themeName} Blocks'
        );

        return $categories;
    });`;

    functionsContent += blockPatternRegistry;
  }

  // close out the function for blockRegistrations
  blockRegistrations += `\n\n}
add_action( 'init', '${themeSlug}_register_blocks' );`;

  // add blockRegistrations and blockFieldGroups to functionsContent

  functionsContent += blockRegistrations + blockFieldGroups;

  // Write the updated content back to functions.php once
  fs.writeFileSync(functionsFile, functionsContent, "utf-8");
  console.log(
    chalk.green(
      "\n✅ Updated functions.php to include all block configurations successfully."
    )
  );
  console.log(chalk.green("✅ All blocks have been created successfully!"));

  //   // Update config file
  if (addBlocksToConfig) {
    updateDefaults(configPath, "blocks", false, blocks);
  }
}
