<?php
/**
 * Register and render the response for the REST API.
 *
 * @package    soi_srbu
 * @author     soivigol <david@davidvina.es>
 */

defined( 'ABSPATH' ) || exit;
/**
 * Registers a custom REST API endpoint to handle search and replace requests.
 *
 * Hooked to `rest_api_init`.
 *
 * @since x.x.x
 */
function soi_srbu_register_rest_route() {
	register_rest_route(
		'soi_srbu/v2',
		'/search_replace',
		array(
			'methods'             => 'POST',
			'callback'            => 'soi_srbu_handle_post_request',
			'permission_callback' => function( $request ) {
				return current_user_can( 'manage_options' );
			},
		),
	);
}
add_action( 'rest_api_init', 'soi_srbu_register_rest_route' );

/**
 * Handles POST requests to the custom REST API endpoint.
 *
 * @since x.x.x
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response The response object.
 */
function soi_srbu_handle_post_request( WP_REST_Request $request ) {
	global $wpdb;
	$data = $request->get_json_params();

	// Sanitize each URL received in the request.
	$url = isset( $data['url'] ) ? esc_url_raw( $data['url'] ) : '';

	// Sanitize and validate other parameters (if any).
	$to_search             = isset( $data['toSearch'] ) ? sanitize_text_field( $data['toSearch'] ) : '';
	$to_replace            = isset( $data['toReplace'] ) ? sanitize_text_field( $data['toReplace'] ) : '';
	$to_custom_field       = isset( $data['customField'] ) ? sanitize_text_field( $data['customField'] ) : '';
	$to_text_to_add        = isset( $data['textToAdd'] ) ? sanitize_text_field( $data['textToAdd'] ) : '';
	$is_search_and_replace = isset( $data['isSearchAndReplace'] ) ? filter_var( $data['isSearchAndReplace'], FILTER_VALIDATE_BOOLEAN ) : false;

	// Get the ID of the post from the URL.
	$post_id = url_to_postid( $url );
	if ( ! $post_id ) {
		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'This URL does not exist in the database', 'soi_srbu' ),
				'type'    => 'error',
				'url'     => $url,
			),
			200,
		);
	}

	// Get the post.
	$post = get_post( $post_id );
	if ( ! $post ) {
		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'This URL does not a post associated', 'soi_srbu' ),
				'type'    => 'error',
				'url'     => $url,
			),
			200,
		);
	}

	if ( $is_search_and_replace ) {
		$replacement_made = soi_srbu_handle_replacement( $post, $to_search, $to_replace );
	} else {
		$replacement_made = soi_srbu_handle_add_text( $post, $to_custom_field, $to_text_to_add );
	}

	if ( $replacement_made ) {
		$type    = 'success';
		$message = $is_search_and_replace ? __( 'The search and replace was made successfully', 'soi_srbu' ) : __( 'The text was added successfully', 'soi_srbu' );
	} else {
		$type    = 'warning';
		$message = __( 'No matches found for the search term', 'soi_srbu' );
	}

	return new WP_REST_Response(
		array(
			'success' => true,
			'message' => $message,
			'type'    => $type,
			'url'     => $url,
		),
		200,
	);

}

/**
 * Handles the addition of text to a custom field.
 *
 * @since x.x.x
 *
 * @param WP_Post $post The post object.
 * @param string  $to_custom_field The custom field to add the text.
 * @param string  $to_text_to_add The text to add.
 * @return bool Whether the addition was made.
 */
function soi_srbu_handle_add_text( $post, $to_custom_field, $to_text_to_add ) {
	$post_id = $post->ID;

	// Initialize a flag to check if any addition was made.
	$addition_made = false;

	// Get the current value of the custom field.
	$current_value = get_post_meta( $post_id, $to_custom_field, true );

	// Check if the custom field is an array.
	if ( is_array( $current_value ) ) {
		// Add the text to the array.
		$current_value[] = $to_text_to_add;
		// Update the custom field.
		update_post_meta( $post_id, $to_custom_field, $current_value );
		$addition_made = true;
	} else {
		// Add the text to field. Replace the current value if not empty.
		$new_value = $to_text_to_add;
		// Update the custom field.
		update_post_meta( $post_id, $to_custom_field, $new_value );
		$addition_made = true;
	}

	return $addition_made;
}

/**
 * Handles the search and replace of text in a post.
 *
 * @since x.x.x
 *
 * @param WP_Post $post The post object.
 * @param string  $to_search The text to search.
 * @param string  $to_replace The text to replace.
 * @return bool Whether the replacement was made.
 */
function soi_srbu_handle_replacement( $post, $to_search, $to_replace ) {
	$post_id = $post->ID;

	// Initialize a flag to check if any replacement was made.
	$replacement_made = false;

	// Search and replace in title, content, and excerpt.
	$updated_post = array(
		'ID'           => $post_id,
		'post_title'   => str_replace( $to_search, $to_replace, $post->post_title, $count_title ),
		'post_content' => str_replace( $to_search, $to_replace, $post->post_content, $count_content ),
		'post_excerpt' => str_replace( $to_search, $to_replace, $post->post_excerpt, $count_excerpt ),
	);

	// Check if any replacements were made.
	if ( $count_title > 0 || $count_content > 0 || $count_excerpt > 0 ) {
		$replacement_made = true;
	}
	wp_update_post( $updated_post );

	// Search and replace in metadata (compatible with ACF and Pods).
	// Get all custom fields.
	$custom_fields = get_post_meta( $post_id );

	// Loop through each custom field.
	foreach ( $custom_fields as $key => $fields ) {
		// Loop through each value of this field.
		if ( check_pods_repeatable_field( $key ) ) {
			$new_value = array();
			foreach ( $fields as $field ) {
				$field = str_replace( $to_search, $to_replace, $field, $count_meta_array );
				if ( $count_meta_array > 0 ) {
					$replacement_made = true;
				}
				$new_value[] = $field;
			}
			update_post_meta( $post_id, $key, $new_value, $fields );
		} else {
			foreach ( $fields as $field ) {
				// Determine the new value and whether a replacement was made.
				// If it is a Pods repeatable field, remove all existing meta values for the key.
				if ( is_serialized( $field ) ) {
					$unserialized_data = json_decode( $field, true );
					array_walk_recursive(
						$unserialized_data,
						function ( &$value ) use ( $to_search, $to_replace, &$replacement_made ) {
							$value = str_replace( $to_search, $to_replace, $value, $count_meta_array );
							if ( 0 < $count_meta_array ) {
								$replacement_made = true;
							}
						}
					);
					$new_value = wp_json_encode( $unserialized_data );
				} elseif ( is_array( $field ) ) {
					array_walk_recursive(
						$field,
						function( &$value ) use ( $to_search, $to_replace, &$replacement_made ) {
							$value = str_replace( $to_search, $to_replace, $value, $count_meta_array );
							if ( $count_meta_array > 0 ) {
								$replacement_made = true;
							}
						}
					);
					$new_value = $field;
				} else {
					$new_value = str_replace( $to_search, $to_replace, $field, $count_meta_array );
					if ( $count_meta_array > 0 ) {
						$replacement_made = true;
					}
				}
				update_post_meta( $post_id, $key, $new_value, $field );
			}
		}
	}

	return $replacement_made;
}

/**
 * Check if a given field is a repeatable field in the Pods configuration.
 *
 * @param string $key The meta key of the field to check.
 *
 * @return bool Returns true if the field is found and is repeatable, false otherwise.
 */
function check_pods_repeatable_field( $key ) {

	// Ensure Pods is active and available.
	if ( ! function_exists( 'pods_api' ) ) {
		return false;
	}

	// Get Pods API object.
	$api = pods_api();

	// Get all Pods.
	$pods = $api->load_pods();

	// Loop through each Pod configuration to check if the field is repeatable.
	foreach ( $pods as $pod ) {
		// Get the fields of the Pod.
		$fields = $pod['fields'];

		// Loop through the fields to find our field by the key.
		foreach ( $fields as $field_name => $field_options ) {
			// If we find the field, check if it's repeatable and return the result.
			if ( $field_name === $key ) {
				return ! empty( $field_options['options']['repeatable'] );
			}
		}
	}

	// If we reach here, it means the field was not found or it's not repeatable.
	return false;
}
