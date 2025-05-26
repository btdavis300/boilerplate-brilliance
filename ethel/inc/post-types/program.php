<?php

if (! function_exists('ethel_register_program')) {
    // Register Custom Post Type
    function ethel_register_program()
    {
        $labels = array(
          'name' => _x('Program', 'post type general name', 'ethel'),
          'singular_name' => _x('Program', 'post type singular name', 'ethel'),
          'menu_name' => _x('Program', 'admin menu', 'ethel'),
          'name_admin_bar' => _x('Program', 'add new on admin bar', 'ethel'),
          'add_new' => _x('Add New', 'Program', 'ethel'),
          'add_new_item' => __('Add New Program', 'ethel'),
          'new_item' => __('New Program', 'ethel'),
          'edit_item' => __('Edit Program', 'ethel'),
          'view_item' => __('View Program', 'ethel'),
          'all_items' => __('All Programs', 'ethel'),
          'search_items' => __('Search Programs', 'ethel'),
          'not_found' => __('No Programs found.', 'ethel'),
          'not_found_in_trash' => __('No Programs found in Trash.', 'ethel'),
          'archives' => __('Program Catalog', 'ethel'),
          'item_published' => __('Program Published', 'ethel'),
          'item_published_privately' => __('Program Published Privately', 'ethel'),
          'item_reverted_to_draft' => __('Program Reverted to Draft', 'ethel'),
          'item_scheduled' => __('Program Scheduled', 'ethel'),
          'item_updated' => __('Program Updated', 'ethel'),
          'item_link' => __('Program Link', 'ethel'),
          'item_link_description' => __('A link to a Program', 'ethel')
        );
        $rewrite = array(
          'slug'                  => 'program',
          'with_front'            => true,
          'pages'                 => true,
          'feeds'                 => true,
        );
        $args = array(
          'labels' => $labels,
          'description' => __('A Program', 'upup'),
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
        register_post_type('program', $args);
    }
    add_action('init', 'ethel_register_program', 15);
  }