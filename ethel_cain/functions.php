<?php
  // Theme functions

  function ethel_cain_scripts() {
      wp_enqueue_style('ethel_cain_style', get_stylesheet_directory_uri() . '/css/ponyfill.css', [], filemtime(get_stylesheet_directory() . '/css/ponyfill.css'));
  }
  add_action('wp_enqueue_scripts', 'ethel_cain_scripts');
  


/**
 * Register blocks
 */

 function ethel_cain_register_blocks() {
//accordion block
    register_block_type( __DIR__ . '/blocks/accordion/block.json' );

//content_with_ctas block
    register_block_type( __DIR__ . '/blocks/content_with_ctas/block.json' );


}
add_action( 'init', 'ethel_cain_register_blocks' );

// ACF Fields Groups
include_once( get_stylesheet_directory() . '/blocks/accordion/accordion_field_group.php' );
include_once( get_stylesheet_directory() . '/blocks/content_with_ctas/content_with_ctas_field_group.php' );