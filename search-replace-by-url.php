<?php
/**
 * Plugin Name:       Soivigol Search and Replace by URL
 * Plugin URI:        https://soivigol.dev
 * Description:       With this plugin you can search and replace some content in the content or Custom Field searching by URL or URL&#39;s group. Also, you can add a content into a specific Custom Field. Compatible with Pods and ACF.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            David Viña
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       search-replace-by-url
 * Domain Path:       soi_srbu
 *
 * @package           search-replace-by-url
 */

// If this file is called directly, abort.
defined( 'ABSPATH' ) || exit;

// Define plugin constants.
define( 'SOI_SRB_URL', plugin_dir_url( __FILE__ ) );
define( 'SOI_SRB_PATH', plugin_dir_path( __FILE__ ) );
define( 'SOI_SRB_VERSION', '0.1.0' );

// Include admin files.
require_once SOI_SRB_PATH . 'admin/admin.php';
require_once SOI_SRB_PATH . 'api/api-rest-calls.php';
