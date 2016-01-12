<?php
/**
 * Booking Initializer
 *
 * Booking Related Files and Classes.
 *
 * @since 	1.0.0
 * @package VRC
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Admin/Booking.
 *
 * Booking related files.
 *
 * @since 1.0.0
 */

// Custom Post Type: `vr_booking`.
if ( file_exists( VRC_DIR . '/assets/admin/booking/cpt-booking.php' ) ) {
    require_once( VRC_DIR . '/assets/admin/booking/cpt-booking.php' );
}


/**
 * Class: `VR_Booking`.
 *
 * @since 1.0.0
 */
if ( file_exists( VRC_DIR . '/assets/admin/booking/class-booking.php' ) ) {
    require_once( VRC_DIR . '/assets/admin/booking/class-booking.php' );
}


/**
 * Class: `VR_Booking_Meta_Boxes`.
 *
 * @since 1.0.0
 */
if ( file_exists( VRC_DIR . '/assets/admin/booking/class-booking-meta-boxes.php' ) ) {
    require_once( VRC_DIR . '/assets/admin/booking/class-booking-meta-boxes.php' );
}


/**
 * Class: `VR_Booking_Custom_Columns`.
 *
 * @since 1.0.0
 */
if ( file_exists( VRC_DIR . '/assets/admin/booking/booking-custom-columns.php' ) ) {
    require_once( VRC_DIR . '/assets/admin/booking/booking-custom-columns.php' );
}


/**
 * Actions/Filters for booking.
 *
 * Classes:
 * 			1. VR_Booking
 * 			2. VR_Booking_Custom_Columns
 * 			3. VR_Booking_Meta_Boxes
 */
if ( class_exists( 'VR_Booking' ) ) {

	/**
	 * Object: VR_Booking class.
	 *
	 * @since 1.0.0
	 */
	$vr_booking_init = new VR_Booking();


	// Create booking post type
	add_action( 'init', array( $vr_booking_init, 'create_booking' ) );

	// Create fake booking content.
	add_action( 'init', array( $vr_booking_init, 'fake_booking_content' ) );

}


if ( class_exists( 'VR_Booking_Custom_Columns' ) ) {


	/**
	 * Object: VR_Booking_Custom_Columns class.
	 *
	 * @since 1.0.0
	 */
	$vr_booking_custom_columns = new VR_Booking_Custom_Columns();

	// Rental Custom Columns Registered
	add_filter( 'manage_edit-vr_booking_columns', array( $vr_booking_custom_columns, 'register' ) ) ;

	// Rental Custom Columns Display custom stuff
	add_action( 'manage_vr_booking_posts_custom_column', array( $vr_booking_custom_columns, 'display' ) ) ;

}



if ( class_exists( 'VR_Booking_Meta_Boxes' ) ) {


	/**
	 * Object: VR_Booking_Metaboxes class.
	 *
	 * @since 1.0.0
	 */
	$vr_booking_meta_boxes = new VR_Booking_Meta_Boxes();

	// Register booking meta boxes.
    add_filter( 'rwmb_meta_boxes', array( $vr_booking_meta_boxes, 'register' ) );

}

