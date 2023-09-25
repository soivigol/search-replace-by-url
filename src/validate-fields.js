import { __ } from '@wordpress/i18n';

/**
 * validateFields
 *
 * The `validateFields` function performs a series of validation checks on input fields used in a search and replace utility. If any validation check fails, it sets a notice message and returns `false`. If all validation checks pass, it returns `true`.
 *
 * @function
 * @param {Object} params - The parameters object containing the fields to be validated.
 * @param {string} params.toSearch - The text to be searched in the URLs content.
 * @param {string} params.toReplace - The text to replace the found `toSearch` text with.
 * @param {string} params.customField - The custom field where the text should be added.
 * @param {string} params.textToAdd - The text to be added to the custom field.
 * @param {boolean} params.isSearchAndReplace - Flag to indicate if the operation is search and replace or add text to custom fields.
 * @param {string} params.urls - The string containing all the URLs separated by newline characters.
 * @param {function} params.setNotice - Function to set the notice message and type.
 *
 * @example
 * // Example usage in JavaScript
 * validateFields({
 *   toSearch: 'find this text',
 *   toReplace: 'replace with this',
 *   customField: 'my_custom_field',
 *   textToAdd: 'some text to add',
 *   isSearchAndReplace: true,
 *   urls: 'http://example1.com\nhttp://example2.com',
 *   setNotice: (notice) => console.log(notice),
 * });
 *
 * @returns {boolean} Returns `true` if all the validation checks pass, otherwise returns `false`.
 */
const validateFields = ({ toSearch, toReplace, customField, textToAdd, isSearchAndReplace, emptyCustomField, urls, setNotice }) => {
	let validationResult = true;

	if ( !urls ) {
		setNotice({ type: 'error', message: __( 'URLs field cannot be empty', 'soi_srbu' ) });
		validationResult = false;
	} else if ( isSearchAndReplace ) {
		if (!toSearch) {
			setNotice({ type: 'error', message: __( 'To Search field cannot be empty', 'soi_srbu' ) });
			validationResult = false;
		} else if (!toReplace) {
			setNotice({ type: 'error', message: __( 'To Replace field cannot be empty', 'soi_srbu' ) });
			validationResult = false;
		}
	} else {
		if (!customField) {
			setNotice({ type: 'error', message: __( 'Custom Field field cannot be empty', 'soi_srbu' ) });
			validationResult = false;
		} else if ( !textToAdd && ! emptyCustomField ) {
			setNotice({ type: 'error', message: __( 'Text to Add field cannot be empty', 'soi_srbu' ) });
			validationResult = false;
		}
	}

	const urlsArray = urls.split('\n').filter(url => url.trim() !== '');
	const siteHostname = new URL(window.location.origin).hostname;

	const hasDifferentDomain = urlsArray.some(url => {
		try {
			const urlHostname = new URL(url).hostname;
			return urlHostname !== siteHostname;
		} catch {
			setNotice({ type: 'error', message: __( 'Invalid URL found', 'soi_srbu' ) });
			return true;
		}
	});

	if (hasDifferentDomain) {
		setNotice({ type: 'error', message: __( 'The domain of the URLs must match with the current site', 'soi_srbu' ) });
		validationResult = false;
	}

	return validationResult;
};

export { validateFields	}
