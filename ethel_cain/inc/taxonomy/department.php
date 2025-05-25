<?php
if ( ! function_exists( 'ethel_cain_register_department_taxonomy' ) ) {

// Register Custom Taxonomy
function ethel_cain_register_department_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Departments', 'Taxonomy General Name', 'ethel_cain' ),
		'singular_name'              => _x( 'Department', 'Taxonomy Singular Name', 'ethel_cain' ),
		'menu_name'                  => __( 'Department', 'ethel_cain' ),
		'all_items'                  => __( 'All Departments', 'ethel_cain' ),
		'parent_item'                => __( 'Parent Department', 'ethel_cain' ),
		'parent_item_colon'          => __( 'Parent Department:', 'ethel_cain' ),
		'new_item_name'              => __( 'New Department', 'ethel_cain' ),
		'add_new_item'               => __( 'Add New Department', 'ethel_cain' ),
		'edit_item'                  => __( 'Edit Department', 'ethel_cain' ),
		'update_item'                => __( 'Update Department', 'ethel_cain' ),
		'view_item'                  => __( 'View Department', 'ethel_cain' ),
		'add_or_remove_items'        => __( 'Add or remove Departments', 'ethel_cain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'ethel_cain' ),
		'popular_items'              => __( 'Popular Departments', 'ethel_cain' ),
		'search_items'               => __( 'Search Departments', 'ethel_cain' ),
		'not_found'                  => __( 'Not Found', 'ethel_cain' ),
		'no_terms'                   => __( 'No items', 'ethel_cain' ),
		'items_list'                 => __( 'Departments list', 'ethel_cain' ),
		'items_list_navigation'      => __( 'Departments list navigation', 'ethel_cain' ),
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
	register_taxonomy( 'department', array( 'program' ), $args );

}
//run on hook after post types (posts are set to priority 15)
add_action( 'init', 'ethel_cain_register_department_taxonomy', 16 );

}