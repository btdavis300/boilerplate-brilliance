<?php

if (! function_exists('ethel_register_directory')) {
    // Register Custom Post Type
    function ethel_register_directory()
    {
        $labels = array(
          'name' => _x('Directory', 'post type general name', 'ethel'),
          'singular_name' => _x('Directory', 'post type singular name', 'ethel'),
          'menu_name' => _x('Directory', 'admin menu', 'ethel'),
          'name_admin_bar' => _x('Directory', 'add new on admin bar', 'ethel'),
          'add_new' => _x('Add New', 'Directory', 'ethel'),
          'add_new_item' => __('Add New Directory', 'ethel'),
          'new_item' => __('New Directory', 'ethel'),
          'edit_item' => __('Edit Directory', 'ethel'),
          'view_item' => __('View Directory', 'ethel'),
          'all_items' => __('All Directories', 'ethel'),
          'search_items' => __('Search Directories', 'ethel'),
          'not_found' => __('No Directories found.', 'ethel'),
          'not_found_in_trash' => __('No Directories found in Trash.', 'ethel'),
          'archives' => __('Directory Catalog', 'ethel'),
          'item_published' => __('Directory Published', 'ethel'),
          'item_published_privately' => __('Directory Published Privately', 'ethel'),
          'item_reverted_to_draft' => __('Directory Reverted to Draft', 'ethel'),
          'item_scheduled' => __('Directory Scheduled', 'ethel'),
          'item_updated' => __('Directory Updated', 'ethel'),
          'item_link' => __('Directory Link', 'ethel'),
          'item_link_description' => __('A link to a Directory', 'ethel')
        );
        $rewrite = array(
          'slug'                  => 'directory',
          'with_front'            => true,
          'pages'                 => true,
          'feeds'                 => true,
        );
        $args = array(
          'labels' => $labels,
          'description' => __('A Directory', 'upup'),
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
        register_post_type('directory', $args);
    }
    add_action('init', 'ethel_register_directory', 15);
  }