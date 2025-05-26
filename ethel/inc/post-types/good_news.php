<?php

if (! function_exists('ethel_register_good_news')) {
    // Register Custom Post Type
    function ethel_register_good_news()
    {
        $labels = array(
          'name' => _x('Good News', 'post type general name', 'ethel'),
          'singular_name' => _x('Good News', 'post type singular name', 'ethel'),
          'menu_name' => _x('Good News', 'admin menu', 'ethel'),
          'name_admin_bar' => _x('Good News', 'add new on admin bar', 'ethel'),
          'add_new' => _x('Add New', 'Good News', 'ethel'),
          'add_new_item' => __('Add New Good News', 'ethel'),
          'new_item' => __('New Good News', 'ethel'),
          'edit_item' => __('Edit Good News', 'ethel'),
          'view_item' => __('View Good News', 'ethel'),
          'all_items' => __('All Good Newses', 'ethel'),
          'search_items' => __('Search Good Newses', 'ethel'),
          'not_found' => __('No Good Newses found.', 'ethel'),
          'not_found_in_trash' => __('No Good Newses found in Trash.', 'ethel'),
          'archives' => __('Good News Catalog', 'ethel'),
          'item_published' => __('Good News Published', 'ethel'),
          'item_published_privately' => __('Good News Published Privately', 'ethel'),
          'item_reverted_to_draft' => __('Good News Reverted to Draft', 'ethel'),
          'item_scheduled' => __('Good News Scheduled', 'ethel'),
          'item_updated' => __('Good News Updated', 'ethel'),
          'item_link' => __('Good News Link', 'ethel'),
          'item_link_description' => __('A link to a Good News', 'ethel')
        );
        $rewrite = array(
          'slug'                  => 'good_news',
          'with_front'            => true,
          'pages'                 => true,
          'feeds'                 => true,
        );
        $args = array(
          'labels' => $labels,
          'description' => __('A Good News', 'upup'),
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
        register_post_type('good_news', $args);
    }
    add_action('init', 'ethel_register_good_news', 15);
  }