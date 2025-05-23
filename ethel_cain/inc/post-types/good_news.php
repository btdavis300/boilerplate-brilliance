<?php

if (! function_exists('ethel_cain_register_good_news')) {
    // Register Custom Post Type
    function ethel_cain_register_good_news()
    {
        $labels = array(
          'name' => _x('Good News', 'post type general name', 'ethel_cain'),
          'singular_name' => _x('Good News', 'post type singular name', 'ethel_cain'),
          'menu_name' => _x('Good News', 'admin menu', 'ethel_cain'),
          'name_admin_bar' => _x('Good News', 'add new on admin bar', 'ethel_cain'),
          'add_new' => _x('Add New', 'Good News', 'ethel_cain'),
          'add_new_item' => __('Add New Good News', 'ethel_cain'),
          'new_item' => __('New Good News', 'ethel_cain'),
          'edit_item' => __('Edit Good News', 'ethel_cain'),
          'view_item' => __('View Good News', 'ethel_cain'),
          'all_items' => __('All Good Newses', 'ethel_cain'),
          'search_items' => __('Search Good Newses', 'ethel_cain'),
          'not_found' => __('No Good Newses found.', 'ethel_cain'),
          'not_found_in_trash' => __('No Good Newses found in Trash.', 'ethel_cain'),
          'archives' => __('Good News Catalog', 'ethel_cain'),
          'item_published' => __('Good News Published', 'ethel_cain'),
          'item_published_privately' => __('Good News Published Privately', 'ethel_cain'),
          'item_reverted_to_draft' => __('Good News Reverted to Draft', 'ethel_cain'),
          'item_scheduled' => __('Good News Scheduled', 'ethel_cain'),
          'item_updated' => __('Good News Updated', 'ethel_cain'),
          'item_link' => __('Good News Link', 'ethel_cain'),
          'item_link_description' => __('A link to a Good News', 'ethel_cain')
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
    add_action('init', 'ethel_cain_register_good_news', 15);
}