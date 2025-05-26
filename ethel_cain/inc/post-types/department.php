<?php

if (! function_exists('ethel_cain_register_department')) {
    // Register Custom Post Type
    function ethel_cain_register_department()
    {
        $labels = array(
          'name' => _x('Department', 'post type general name', 'ethel_cain'),
          'singular_name' => _x('Department', 'post type singular name', 'ethel_cain'),
          'menu_name' => _x('Department', 'admin menu', 'ethel_cain'),
          'name_admin_bar' => _x('Department', 'add new on admin bar', 'ethel_cain'),
          'add_new' => _x('Add New', 'Department', 'ethel_cain'),
          'add_new_item' => __('Add New Department', 'ethel_cain'),
          'new_item' => __('New Department', 'ethel_cain'),
          'edit_item' => __('Edit Department', 'ethel_cain'),
          'view_item' => __('View Department', 'ethel_cain'),
          'all_items' => __('All Departments', 'ethel_cain'),
          'search_items' => __('Search Departments', 'ethel_cain'),
          'not_found' => __('No Departments found.', 'ethel_cain'),
          'not_found_in_trash' => __('No Departments found in Trash.', 'ethel_cain'),
          'archives' => __('Department Catalog', 'ethel_cain'),
          'item_published' => __('Department Published', 'ethel_cain'),
          'item_published_privately' => __('Department Published Privately', 'ethel_cain'),
          'item_reverted_to_draft' => __('Department Reverted to Draft', 'ethel_cain'),
          'item_scheduled' => __('Department Scheduled', 'ethel_cain'),
          'item_updated' => __('Department Updated', 'ethel_cain'),
          'item_link' => __('Department Link', 'ethel_cain'),
          'item_link_description' => __('A link to a Department', 'ethel_cain')
        );
        $rewrite = array(
          'slug'                  => 'department',
          'with_front'            => true,
          'pages'                 => true,
          'feeds'                 => true,
        );
        $args = array(
          'labels' => $labels,
          'description' => __('A Department', 'upup'),
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
        register_post_type('department', $args);
    }
    add_action('init', 'ethel_cain_register_department', 15);
  }