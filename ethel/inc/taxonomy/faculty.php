<?php
if ( ! function_exists( 'ethel_register_faculty_taxonomy' ) ) {

// Register Custom Taxonomy
function ethel_register_faculty_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Faculties', 'Taxonomy General Name', 'ethel' ),
		'singular_name'              => _x( 'Faculty', 'Taxonomy Singular Name', 'ethel' ),
		'menu_name'                  => __( 'Faculty', 'ethel' ),
		'all_items'                  => __( 'All Faculties', 'ethel' ),
		'parent_item'                => __( 'Parent Faculty', 'ethel' ),
		'parent_item_colon'          => __( 'Parent Faculty:', 'ethel' ),
		'new_item_name'              => __( 'New Faculty', 'ethel' ),
		'add_new_item'               => __( 'Add New Faculty', 'ethel' ),
		'edit_item'                  => __( 'Edit Faculty', 'ethel' ),
		'update_item'                => __( 'Update Faculty', 'ethel' ),
		'view_item'                  => __( 'View Faculty', 'ethel' ),
		'add_or_remove_items'        => __( 'Add or remove Faculties', 'ethel' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'ethel' ),
		'popular_items'              => __( 'Popular Faculties', 'ethel' ),
		'search_items'               => __( 'Search Faculties', 'ethel' ),
		'not_found'                  => __( 'Not Found', 'ethel' ),
		'no_terms'                   => __( 'No items', 'ethel' ),
		'items_list'                 => __( 'Faculties list', 'ethel' ),
		'items_list_navigation'      => __( 'Faculties list navigation', 'ethel' ),
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
	register_taxonomy( 'faculty', array( 'department' ), $args );

}
//run on hook after post types (posts are set to priority 15)
add_action( 'init', 'ethel_register_faculty_taxonomy', 16 );

}