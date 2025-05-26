<?php
  // Theme functions

  function ethel_cain_scripts() {
      wp_enqueue_style('ethel_cain_style', get_stylesheet_directory_uri() . '/css/ponyfill.css', [], filemtime(get_stylesheet_directory() . '/css/ponyfill.css'));
  }
  add_action('wp_enqueue_scripts', 'ethel_cain_scripts');
  
// Post Types
include_once( get_stylesheet_directory() . '/inc/post-types/program.php' );
include_once( get_stylesheet_directory() . '/inc/post-types/directory.php' );
include_once( get_stylesheet_directory() . '/inc/post-types/good_news.php' );

/**
    * Add ethel cain Block Category
    */
    add_filter('block_categories_all', function ($categories) {
        // Adding a new category.
        $categories[] = array(
            'slug'  => 'ethel_cain_blocks_category',
            'title' => 'ethel cain Blocks'
        );

        return $categories;
    });


/**
 * Register blocks
 */

 function ethel_cain_register_blocks() {
//duotone_wave block
    register_block_type( __DIR__ . '/blocks/duotone_wave/block.json' );


}
add_action( 'init', 'ethel_cain_register_blocks' );

// ACF Fields Groups
include_once( get_stylesheet_directory() . '/blocks/duotone_wave/duotone_wave_field_group.php' );