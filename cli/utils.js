import path from "path";
import fs from "fs";

// changes text to slug. Replaces spaces with character given. Removes all non-word characters.
export function toSlug(text, character) {
  return text
    .toLowerCase()
    .replace(/\s+/g, character)
    .replace(/[^\w\-]/g, "");
}

// Reeturns directory path with theme will live.
export function makeThemeDir(themeSlug) {
  return path.join(process.cwd(), themeSlug);
}

// loads config file. If file does not exist, make one.
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

// Initial save for config file.
//TODO: refactor to remove this function, unecessary
export function saveDefaults(defaults, configPath) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(defaults, null, 2), "utf-8");
  } catch (err) {
    console.error("❌ Failed to save default config.");
  }
}

// Updates config path. Will create nested property if given.
export function updateDefaults(
  configPath,
  property,
  subproperty = false,
  updates
) {
  try {
    if (fs.existsSync(configPath)) {
      let json = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (subproperty) {
        // if property does not exist, make it exist first.
        if (!json[property]) {
          json[property] = {};
        }
        json[property][subproperty] = updates; // update the JSON
      } else {
        json[property] = updates; // update the JSON
      }

      // update config file
      fs.writeFile(configPath, JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        console.log("✅ Default config file updated successfully.");
      });
    }
  } catch (err) {
    console.warn("⚠️ Couldn't read config file: ", err);
  }
}

// Updates theme.json file
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

// pluralize given word
export function pluralize(word) {
  if (word.match(/[^aeiou]y$/i)) {
    return word.replace(/y$/i, "ies");
  } else if (word.match(/(s|x|z|ch|sh)$/i)) {
    return word + "es";
  } else if (word.match(/(f|fe)$/i)) {
    return word.replace(/(f|fe)$/i, "ves");
  } else {
    return word + "s";
  }
}

// adds default post types to array. If array does not exist, create one.
export function addDefaultPostTypes(postTypes) {
  if (!postTypes) {
    postTypes = [];
  }
  postTypes.push("page");
  postTypes.push("post");

  return postTypes;
}

// builds necessary configuration boiler plate for post types.
export function buildPostTypeFileContentFile(postType, themeSlug) {
  const slug = postType;
  const singluarName = postType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const pluralName = pluralize(singluarName);
  const functionName = `${themeSlug}_register_${slug}`;

  const fileContent = `<?php

if (! function_exists('${functionName}')) {
    // Register Custom Post Type
    function ${functionName}()
    {
        $labels = array(
          'name' => _x('${singluarName}', 'post type general name', '${themeSlug}'),
          'singular_name' => _x('${singluarName}', 'post type singular name', '${themeSlug}'),
          'menu_name' => _x('${singluarName}', 'admin menu', '${themeSlug}'),
          'name_admin_bar' => _x('${singluarName}', 'add new on admin bar', '${themeSlug}'),
          'add_new' => _x('Add New', '${singluarName}', '${themeSlug}'),
          'add_new_item' => __('Add New ${singluarName}', '${themeSlug}'),
          'new_item' => __('New ${singluarName}', '${themeSlug}'),
          'edit_item' => __('Edit ${singluarName}', '${themeSlug}'),
          'view_item' => __('View ${singluarName}', '${themeSlug}'),
          'all_items' => __('All ${pluralName}', '${themeSlug}'),
          'search_items' => __('Search ${pluralName}', '${themeSlug}'),
          'not_found' => __('No ${pluralName} found.', '${themeSlug}'),
          'not_found_in_trash' => __('No ${pluralName} found in Trash.', '${themeSlug}'),
          'archives' => __('${singluarName} Catalog', '${themeSlug}'),
          'item_published' => __('${singluarName} Published', '${themeSlug}'),
          'item_published_privately' => __('${singluarName} Published Privately', '${themeSlug}'),
          'item_reverted_to_draft' => __('${singluarName} Reverted to Draft', '${themeSlug}'),
          'item_scheduled' => __('${singluarName} Scheduled', '${themeSlug}'),
          'item_updated' => __('${singluarName} Updated', '${themeSlug}'),
          'item_link' => __('${singluarName} Link', '${themeSlug}'),
          'item_link_description' => __('A link to a ${singluarName}', '${themeSlug}')
        );
        $rewrite = array(
          'slug'                  => '${slug}',
          'with_front'            => true,
          'pages'                 => true,
          'feeds'                 => true,
        );
        $args = array(
          'labels' => $labels,
          'description' => __('A ${singluarName}', 'upup'),
          'public' => true,
          'publicly_queryable' => true, // needed for archive page
          'show_ui' => true,
          'show_in_menu' => true,
          'menu_icon' => '',
          'query_var' => false,
          'capability_type' => 'post',
          'has_archive' => true,
          'hierarchical' => false,
          'menu_position' => null,
          'rewrite'       => $rewrite,
          'show_in_nav_menus' => true,
          'show_in_rest' => true, // required for Block Editor
          'template' => array(), //Array of blocks to use as the default initial state for an editor session. Each item should be an array containing block name and optional attributes.
          'template_lock' => false, //Can also be set to 'all' or 'insert'
          'taxonomies' => array('post_tag'), //You only need to define default WP taxonomies you want to include the post type in. Others are registered along when custom taxonomies are declared (see functions.php)
          'supports' => array('title', 'excerpt', 'editor', 'author', 'thumbnail')
        );
        register_post_type('${slug}', $args);
    }
    add_action('init', '${functionName}', 15);
  }`;

  return fileContent;
}

// builds necessary boilerplate for taxonomy
export function buildTaxonomyFileContentFile(taxonomy, themeSlug) {
  const { name, postTypes } = taxonomy;
  const slug = name;
  const singluarName = name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const pluralName = pluralize(singluarName);
  const functionName = `${themeSlug}_register_${slug}_taxonomy`;

  const fileContent = `<?php
if ( ! function_exists( '${functionName}' ) ) {

// Register Custom Taxonomy
function ${functionName}() {

	$labels = array(
		'name'                       => _x( '${pluralName}', 'Taxonomy General Name', '${themeSlug}' ),
		'singular_name'              => _x( '${singluarName}', 'Taxonomy Singular Name', '${themeSlug}' ),
		'menu_name'                  => __( '${singluarName}', '${themeSlug}' ),
		'all_items'                  => __( 'All ${pluralName}', '${themeSlug}' ),
		'parent_item'                => __( 'Parent ${singluarName}', '${themeSlug}' ),
		'parent_item_colon'          => __( 'Parent ${singluarName}:', '${themeSlug}' ),
		'new_item_name'              => __( 'New ${singluarName}', '${themeSlug}' ),
		'add_new_item'               => __( 'Add New ${singluarName}', '${themeSlug}' ),
		'edit_item'                  => __( 'Edit ${singluarName}', '${themeSlug}' ),
		'update_item'                => __( 'Update ${singluarName}', '${themeSlug}' ),
		'view_item'                  => __( 'View ${singluarName}', '${themeSlug}' ),
		'add_or_remove_items'        => __( 'Add or remove ${pluralName}', '${themeSlug}' ),
		'choose_from_most_used'      => __( 'Choose from the most used', '${themeSlug}' ),
		'popular_items'              => __( 'Popular ${pluralName}', '${themeSlug}' ),
		'search_items'               => __( 'Search ${pluralName}', '${themeSlug}' ),
		'not_found'                  => __( 'Not Found', '${themeSlug}' ),
		'no_terms'                   => __( 'No items', '${themeSlug}' ),
		'items_list'                 => __( '${pluralName} list', '${themeSlug}' ),
		'items_list_navigation'      => __( '${pluralName} list navigation', '${themeSlug}' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => false,
		'show_in_rest'               => true,
	);
	register_taxonomy( '${slug}', array( '${postTypes.join(", ")}' ), $args );

}
//run on hook after post types (posts are set to priority 15)
add_action( 'init', '${functionName}', 16 );

}`;

  return fileContent;
}

// build block.json file for block
export function buildBlockJSONConfig(block, slug, themeSlug) {
  let arrayOfKeywords = [];
  let keyWords = block.name.toLowerCase();
  keyWords = keyWords.split(" ");
  keyWords = keyWords.forEach((word) => arrayOfKeywords.push(`"${word}"`));
  const fileContents = `{
  "name": "${themeSlug}/${slug}",
  "title": "${block.name} Block",
  "description": "${block.name} Block",
  "style": "",
  "script": "",
  "category": "${themeSlug}_blocks_category",
  "icon": "",
  "apiVersion": 2,
  "keywords": [${arrayOfKeywords}],
  "acf": {
    "mode": "preview",
    "renderTemplate": "${slug}.php"
  },
  "styles": [],
  "supports": {
    "anchor": true,
    "jsx": ${block.jsx},
    "customClassName": true,
    "className": true
  },
  "attributes": {}
}`;

  return fileContents;
}

export function buildBlockConfig(blockName) {
  const blockClass = toSlug(blockName, "-");
  const blockContents = `<?php 
$anchor = '';
if( !empty( $block['anchor'] ) ){
	$anchor = ' id="' . sanitize_title( $block['anchor'] ) . '"';
}

$class_name = 'block';
if (! empty($block['className'])) {
    $class_name .= ' ' . sanitize_title( $block['className'] );
}
?>

<section <?= $anchor ?> class="${blockClass} <?= $class_name ?>">
<h1>${blockName} Block</h1>
</section>
  `;

  return blockContents;
}
