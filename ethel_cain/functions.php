<?php
  // Theme functions

  function ethel_cain_scripts() {
      wp_enqueue_style('ethel_cain_style', get_stylesheet_directory_uri() . '/css/ponyfill.css', [], filemtime(get_stylesheet_directory() . '/css/ponyfill.css'));
  }
  add_action('wp_enqueue_scripts', 'ethel_cain_scripts');
  
// Post Types
include_once( get_stylesheet_directory() . '/inc/post-types/program.php' );
include_once( get_stylesheet_directory() . '/inc/post-types/department.php' );
include_once( get_stylesheet_directory() . '/inc/post-types/good_news.php' );

// Taxonomies
include_once( get_stylesheet_directory() . '/inc/taxonomy/interests.php' );
include_once( get_stylesheet_directory() . '/inc/taxonomy/faculty.php' );


/**
 * Register blocks
 */

 function ethel_cain_register_blocks() {
//accordion block
    register_block_type( __DIR__ . '/blocks/accordion/block.json' );

//duotone_wave block
    register_block_type( __DIR__ . '/blocks/duotone_wave/block.json' );


}
add_action( 'init', 'ethel_cain_register_blocks' );

// ACF Fields Groups
include_once( get_stylesheet_directory() . '/blocks/accordion/accordion_field_group.php' );