<?php
  // Theme functions

  function ethel_cain_scripts() {
      wp_enqueue_style('ethel_cain_style', get_stylesheet_directory_uri() . '/css/ponyfill.css', [], filemtime(get_stylesheet_directory() . '/css/ponyfill.css'));
  }
  add_action('wp_enqueue_scripts', 'ethel_cain_scripts');
  
include_once( get_stylesheet_directory() . '/inc/post-types/program.php' );
include_once( get_stylesheet_directory() . '/inc/post-types/good_news.php' );