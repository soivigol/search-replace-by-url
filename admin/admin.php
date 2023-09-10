<?php
/**
 * Add a new admin page.
 *
 * @package    soi_srbu
 * @author     soivigol <davi@davidvina.es>
 */

defined( 'ABSPATH' ) || exit;

/**
 * Add admin menu page.
 */
function soi_srbu_add_admin_menu() {
	add_submenu_page(
		'tools.php',
		'Search & Replace by URLs',
		'Search & Replace by URLs',
		'manage_options',
		'soi_srbu',
		'soi_srbu_render_admin_page'
	);
}
add_action( 'admin_menu', 'soi_srbu_add_admin_menu' );

/**
 * Render admin menu page.
 */
function soi_srbu_render_admin_page() {
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		<div id="soi_srbu-admin">
			<!-- Your content goes here -->
		</div>
	</div>
	<?php
}

/**
 * Enqueue scripts and styles for the plugin's admin page.
 *
 * Only loads the scripts and styles on the plugin's specific admin page to
 * avoid conflicts with other plugins and improve performance.
 *
 * @param string $hook_suffix The current admin page.
 */
function soi_srbu_enqueue_scripts( $hook_suffix ) {
	if ( 'tools_page_soi_srbu' !== $hook_suffix ) {
		return;
	}

	$asset_file_path = SOI_SRB_PATH . 'build/index.asset.php';

	$asset_file = include $asset_file_path;

	wp_enqueue_script(
		'soi_srbu-script',
		SOI_SRB_URL . 'build/index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true,
	);

	wp_localize_script(
		'soi_srbu-script',
		'backVariables',
		array(
			'nonce' => wp_create_nonce( 'wp_rest' ),
		),
	);

	wp_enqueue_style(
		'soi_srbu-style',
		SOI_SRB_URL . 'build/style-index.css',
		array(),
		$asset_file['version'],
	);

	wp_enqueue_style(
		'wp-components',
		admin_url( 'load-styles.php' ) . '?load%5B%5D=wp-components,dashicons',
		array(),
		$asset_file['version'],
	);
}
add_action( 'admin_enqueue_scripts', 'soi_srbu_enqueue_scripts' );
