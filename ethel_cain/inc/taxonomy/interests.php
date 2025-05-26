<?php
if ( ! function_exists( 'ethel_cain_register_interests_taxonomy' ) ) {

// Register Custom Taxonomy
function ethel_cain_register_interests_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Interestses', 'Taxonomy General Name', 'ethel_cain' ),
		'singular_name'              => _x( 'Interests', 'Taxonomy Singular Name', 'ethel_cain' ),
		'menu_name'                  => __( 'Interests', 'ethel_cain' ),
		'all_items'                  => __( 'All Interestses', 'ethel_cain' ),
		'parent_item'                => __( 'Parent Interests', 'ethel_cain' ),
		'parent_item_colon'          => __( 'Parent Interests:', 'ethel_cain' ),
		'new_item_name'              => __( 'New Interests', 'ethel_cain' ),
		'add_new_item'               => __( 'Add New Interests', 'ethel_cain' ),
		'edit_item'                  => __( 'Edit Interests', 'ethel_cain' ),
		'update_item'                => __( 'Update Interests', 'ethel_cain' ),
		'view_item'                  => __( 'View Interests', 'ethel_cain' ),
		'add_or_remove_items'        => __( 'Add or remove Interestses', 'ethel_cain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'ethel_cain' ),
		'popular_items'              => __( 'Popular Interestses', 'ethel_cain' ),
		'search_items'               => __( 'Search Interestses', 'ethel_cain' ),
		'not_found'                  => __( 'Not Found', 'ethel_cain' ),
		'no_terms'                   => __( 'No items', 'ethel_cain' ),
		'items_list'                 => __( 'Interestses list', 'ethel_cain' ),
		'items_list_navigation'      => __( 'Interestses list navigation', 'ethel_cain' ),
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
	register_taxonomy( 'interests', array( 'program, good_news, post' ), $args );

}
//run on hook after post types (posts are set to priority 15)
add_action( 'init', 'ethel_cain_register_interests_taxonomy', 16 );

}