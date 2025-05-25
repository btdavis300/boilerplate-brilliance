<?php
if ( ! function_exists( 'ethel_cain_register_faculty_taxonomy' ) ) {

// Register Custom Taxonomy
function ethel_cain_register_faculty_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Faculties', 'Taxonomy General Name', 'ethel_cain' ),
		'singular_name'              => _x( 'Faculty', 'Taxonomy Singular Name', 'ethel_cain' ),
		'menu_name'                  => __( 'Faculty', 'ethel_cain' ),
		'all_items'                  => __( 'All Faculties', 'ethel_cain' ),
		'parent_item'                => __( 'Parent Faculty', 'ethel_cain' ),
		'parent_item_colon'          => __( 'Parent Faculty:', 'ethel_cain' ),
		'new_item_name'              => __( 'New Faculty', 'ethel_cain' ),
		'add_new_item'               => __( 'Add New Faculty', 'ethel_cain' ),
		'edit_item'                  => __( 'Edit Faculty', 'ethel_cain' ),
		'update_item'                => __( 'Update Faculty', 'ethel_cain' ),
		'view_item'                  => __( 'View Faculty', 'ethel_cain' ),
		'add_or_remove_items'        => __( 'Add or remove Faculties', 'ethel_cain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'ethel_cain' ),
		'popular_items'              => __( 'Popular Faculties', 'ethel_cain' ),
		'search_items'               => __( 'Search Faculties', 'ethel_cain' ),
		'not_found'                  => __( 'Not Found', 'ethel_cain' ),
		'no_terms'                   => __( 'No items', 'ethel_cain' ),
		'items_list'                 => __( 'Faculties list', 'ethel_cain' ),
		'items_list_navigation'      => __( 'Faculties list navigation', 'ethel_cain' ),
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
	register_taxonomy( 'faculty', array( 'directory' ), $args );

}
//run on hook after post types (posts are set to priority 15)
add_action( 'init', 'ethel_cain_register_faculty_taxonomy', 16 );

}