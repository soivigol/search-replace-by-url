import { __ } from '@wordpress/i18n';

/**
 * Notice Component
 *
 * The Notice component is responsible for rendering notification messages with optional URLs. It accepts `type`, `message`, and `url` props to control the appearance and content of the notification.
 *
 * @component
 * @param {string} type - The type of the notification which influences the notification's styling. It's used in the CSS class name to determine the visual style of the notice. Typical values might include "error", "success", "info", etc.
 * @param {string} message - The message to be displayed in the notification. If this prop is not provided or is an empty string, the component will return null, and no notification will be displayed.
 * @param {string} [url=''] - An optional URL to be displayed in the notification. If provided, the URL will be displayed as a clickable link that opens in a new tab. Defaults to an empty string, meaning no URL will be displayed.
 *
 * @example
 * // Example usage in JSX
 * <Notice type="success" message="Operation successful" url="http://example.com" />
 *
 * @returns {React.Element|null} A React element representing the notification message, or null if the `message` prop is not provided or is an empty string.
 */
const Notice = ({ type, message, url = '' }) => {
	if (!message) return null;
	if ( url ) {
		return <div className={`notice notice-${type} is-dismissible`}><p><a href={url} target='_blank'>{url}</a>: {message}</p></div>;
	}
	return <div className={`notice notice-${type} is-dismissible`}><p>{message}</p></div>;
};

export { Notice };
