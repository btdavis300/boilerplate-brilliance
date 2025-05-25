<?php
if ( ! function_exists( 'ethel_cain_register_stories_taxonomy' ) ) {

// Register Custom Taxonomy
function ethel_cain_register_stories_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Storieses', 'Taxonomy General Name', 'ethel_cain' ),
		'singular_name'              => _x( 'Stories', 'Taxonomy Singular Name', 'ethel_cain' ),
		'menu_name'                  => __( 'Stories', 'ethel_cain' ),
		'all_items'                  => __( 'All Storieses', 'ethel_cain' ),
		'parent_item'                => __( 'Parent Stories', 'ethel_cain' ),
		'parent_item_colon'          => __( 'Parent Stories:', 'ethel_cain' ),
		'new_item_name'              => __( 'New Stories', 'ethel_cain' ),
		'add_new_item'               => __( 'Add New Stories', 'ethel_cain' ),
		'edit_item'                  => __( 'Edit Stories', 'ethel_cain' ),
		'update_item'                => __( 'Update Stories', 'ethel_cain' ),
		'view_item'                  => __( 'View Stories', 'ethel_cain' ),
		'add_or_remove_items'        => __( 'Add or remove Storieses', 'ethel_cain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'ethel_cain' ),
		'popular_items'              => __( 'Popular Storieses', 'ethel_cain' ),
		'search_items'               => __( 'Search Storieses', 'ethel_cain' ),
		'not_found'                  => __( 'Not Found', 'ethel_cain' ),
		'no_terms'                   => __( 'No items', 'ethel_cain' ),
		'items_list'                 => __( 'Storieses list', 'ethel_cain' ),
		'items_list_navigation'      => __( 'Storieses list navigation', 'ethel_cain' ),
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
	register_taxonomy( 'stories', array( 'program, good_news' ), $args );

}
//run on hook after post types (posts are set to priority 15)
add_action( 'init', 'ethel_cain_register_stories_taxonomy', 16 );

}