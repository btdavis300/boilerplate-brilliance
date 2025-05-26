<?php
if ( ! function_exists( 'ethel_register_interests_taxonomy' ) ) {

// Register Custom Taxonomy
function ethel_register_interests_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Interestses', 'Taxonomy General Name', 'ethel' ),
		'singular_name'              => _x( 'Interests', 'Taxonomy Singular Name', 'ethel' ),
		'menu_name'                  => __( 'Interests', 'ethel' ),
		'all_items'                  => __( 'All Interestses', 'ethel' ),
		'parent_item'                => __( 'Parent Interests', 'ethel' ),
		'parent_item_colon'          => __( 'Parent Interests:', 'ethel' ),
		'new_item_name'              => __( 'New Interests', 'ethel' ),
		'add_new_item'               => __( 'Add New Interests', 'ethel' ),
		'edit_item'                  => __( 'Edit Interests', 'ethel' ),
		'update_item'                => __( 'Update Interests', 'ethel' ),
		'view_item'                  => __( 'View Interests', 'ethel' ),
		'add_or_remove_items'        => __( 'Add or remove Interestses', 'ethel' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'ethel' ),
		'popular_items'              => __( 'Popular Interestses', 'ethel' ),
		'search_items'               => __( 'Search Interestses', 'ethel' ),
		'not_found'                  => __( 'Not Found', 'ethel' ),
		'no_terms'                   => __( 'No items', 'ethel' ),
		'items_list'                 => __( 'Interestses list', 'ethel' ),
		'items_list_navigation'      => __( 'Interestses list navigation', 'ethel' ),
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
add_action( 'init', 'ethel_register_interests_taxonomy', 16 );

}