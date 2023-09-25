
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import { validateFields } from './validate-fields';
import { Notice } from './notice';

/**
 * AdminPage Component
 *
 * This is a functional component that renders the main admin page interface for the Search and Replace Bulk URLs plugin.
 *
 * @component
 * @example
 * return (
 *   <AdminPage />
 * )
 *
 * @returns {React.Element} The admin page interface for the plugin, which consists of various controls and components to manage the search and replace functionality for bulk URLs.
 */
const AdminPage = () => {
	/**
	 * State variables initialization using the `useState` hook to manage the inputs and data processing.
	 */
	const [toSearch, setToSearch] = useState(''); // Text to search
	const [toReplace, setToReplace] = useState(''); // Text to replace
	const [urls, setUrls] = useState(''); // URLs input as a string with one URL per line
	const [notice, setNotice] = useState({ type: '', message: '' }); // Notice state for showing different messages
	const [results, setResults] = useState([]); // Array to store the results of the processing
	const [isSearchAndReplace, setIsSearchAndReplace] = useState(true); // Toggle state for choosing between search and replace or add data functionality
	const [customField, setCustomField] = useState(''); // Custom field input value
	const [textToAdd, setTextToAdd] = useState(''); // Text to add in the custom field
	const [emptyCustomField, setEmptyCustomField] = useState( false );

	// Middleware setup for `apiFetch` to include nonce from `window.backVariables.nonce`
	apiFetch.use(apiFetch.createNonceMiddleware(window.backVariables.nonce));

	/**
	 * Event handler for the submit button click.
	 * Validates the input fields and processes the URLs.
	 */
	const handleClick = () => {
		setNotice({ type: '', message: '' }); // Reset notice

		const urlsArray = urls.split('\n');

		const validationResult = validateFields({
			toSearch,
			toReplace,
			customField,
			textToAdd,
			isSearchAndReplace,
			emptyCustomField,
			urls,
			setNotice,
		});

		if (!validationResult) return;

		const processUrls = () => {
			setResults([]);
			urlsArray.reduce(async (promiseChain, url) => {
				await promiseChain;
				return await new Promise(async (resolve) => {
					try {
						const response = await apiFetch({
							path: 'soi_srbu/v2/search_replace',
							method: 'POST',
							data: {
								url,
								toSearch,
								toReplace,
								customField,
								textToAdd,
								isSearchAndReplace,
							},
						});
						if (response.success) {
							setResults((results) => [
								...results,
								{ url: response.url, type: response.type, message: response.message },
							]);
						}
					} catch (error) {
						return (
							<Notice
								type="error"
								message={__('Error processing URL: ', 'soi_srbu') + error.message}
							/>
						);
					}
					setTimeout(() => resolve(), 500);
				});
			}, Promise.resolve());
		};
		processUrls();
	};

	return (
		<div>
			<Notice type={notice.type} message={notice.message} />
			<TextareaControl
				label="URLs to search and replace. One per line."
				value={urls}
				rows={10}
				onChange={(value) => setUrls(value)}
				help={__('The domain of the URLs must match with the current site', 'soi_srbu')}
			/>
			<ToggleControl
				label={__('Add data into Custom Fileds', 'soi_srbu')}
				checked={!isSearchAndReplace}
				onChange={() => setIsSearchAndReplace((prev) => !prev)}
				help={
					isSearchAndReplace
						? __('Search and replace text in the content in URLs', 'soi_srbu')
						: __('Add text to a especific custom field in URLs', 'soi_srbu')
				}
			/>

			{isSearchAndReplace ? (
				<>
					<TextControl
						label={__('To Search', 'soi_srbu')}
						value={toSearch}
						onChange={(value) => setToSearch(value)}
						name="soi_srbu-text-to-search"
						id="soi_srbu-text-to-search"
						help={__('Text to search in the content and the Custom Fields in URLs', 'soi_srbu')}
					/>
					<TextControl
						label={__('To Replace', 'soi_srbu')}
						value={toReplace}
						onChange={(value) => setToReplace(value)}
						name="soi_srbu-text-to-replace"
						id="soi_srbu-text-to-replace"
						help={__('Text to replace in the content and the Custom Fields in URLs', 'soi_srbu')}
					/>
				</>
			) : (
				<>
					<TextControl
						label={__('Custom Field', 'soi_srbu')}
						value={customField}
						onChange={(value) => setCustomField(value)}
						name="soi_srbu-custom-field"
						id="soi_srbu-custom-field"
						help={__('Name of the Custom Field to add the text in URLs. If the Custom Field not exist, it is created.', 'soi_srbu')}
					/>
					<ToggleControl
						label={__('Clear the previous Custom Field?', 'soi_srbu')}
						checked={emptyCustomField}
						onChange={() => {
							setEmptyCustomField((prev) => !prev)
							if ( emptyCustomField ) {
								setTextToAdd('')
							}
						}}
						help={
							! emptyCustomField
								? __('Add text to the previous Custom Field name', 'soi_srbu')
								: __('Clear all data from the previous Custom Field', 'soi_srbu')
						}
					/>
					{
						! emptyCustomField && (
							<TextControl
								label={__('Text to Add', 'soi_srbu')}
								value={textToAdd}
								onChange={(value) => setTextToAdd(value)}
								name="soi_srbu-text-to-add"
								id="soi_srbu-text-to-add"
								help={__(
									'Text to add in the Custom Field in URLs. Add or replace the previous data in this Custom Field. Only work with strings or numbers depending on how is declarated.',
									'soi_srbu'
								)}
							/>
						)
					}
				</>
			)}
			<Button variant="primary" onClick={handleClick}>
				{__('Submit', 'soi_srbu')}
			</Button>
			{results.map((result, index) => (
				<Notice key={index} type={result.type} message={result.message} url={result.url} />
			))}
		</div>
	);
};

export { AdminPage }
