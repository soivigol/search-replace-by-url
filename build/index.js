/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin-page.js":
/*!***************************!*\
  !*** ./src/admin-page.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPage: function() { return /* binding */ AdminPage; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _validate_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validate-fields */ "./src/validate-fields.js");
/* harmony import */ var _notice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notice */ "./src/notice.js");








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
  const [toSearch, setToSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Text to search
  const [toReplace, setToReplace] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Text to replace
  const [urls, setUrls] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // URLs input as a string with one URL per line
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    type: '',
    message: ''
  }); // Notice state for showing different messages
  const [results, setResults] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // Array to store the results of the processing
  const [isSearchAndReplace, setIsSearchAndReplace] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true); // Toggle state for choosing between search and replace or add data functionality
  const [customField, setCustomField] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Custom field input value
  const [textToAdd, setTextToAdd] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Text to add in the custom field

  // Middleware setup for `apiFetch` to include nonce from `window.backVariables.nonce`
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default().createNonceMiddleware(window.backVariables.nonce));

  /**
   * Event handler for the submit button click.
   * Validates the input fields and processes the URLs.
   */
  const handleClick = () => {
    setNotice({
      type: '',
      message: ''
    }); // Reset notice

    const urlsArray = urls.split('\n');
    const validationResult = (0,_validate_fields__WEBPACK_IMPORTED_MODULE_4__.validateFields)({
      toSearch,
      toReplace,
      customField,
      textToAdd,
      isSearchAndReplace,
      urls,
      setNotice
    });
    if (!validationResult) return;
    const processUrls = () => {
      setResults([]);
      urlsArray.reduce(async (promiseChain, url) => {
        await promiseChain;
        return await new Promise(async resolve => {
          try {
            const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
              path: 'soi_srbu/v2/search_replace',
              method: 'POST',
              data: {
                url,
                toSearch,
                toReplace,
                customField,
                textToAdd,
                isSearchAndReplace
              }
            });
            if (response.success) {
              setResults(results => [...results, {
                url: response.url,
                type: response.type,
                message: response.message
              }]);
            }
          } catch (error) {
            return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_notice__WEBPACK_IMPORTED_MODULE_5__.Notice, {
              type: "error",
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error processing URL: ', 'soi_srbu') + error.message
            });
          }
          setTimeout(() => resolve(), 500);
        });
      }, Promise.resolve());
    };
    processUrls();
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_notice__WEBPACK_IMPORTED_MODULE_5__.Notice, {
    type: notice.type,
    message: notice.message
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: "URLs to search and replace. One per line.",
    value: urls,
    rows: 10,
    onChange: value => setUrls(value),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The domain of the URLs must match with the current site', 'soi_srbu')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add data into Custom Fileds', 'soi_srbu'),
    checked: !isSearchAndReplace,
    onChange: () => setIsSearchAndReplace(prev => !prev),
    help: isSearchAndReplace ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search and replace text in the content in URLs', 'soi_srbu') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add text to a especific custom field in URLs', 'soi_srbu')
  }), isSearchAndReplace ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('To Search', 'soi_srbu'),
    value: toSearch,
    onChange: value => setToSearch(value),
    name: "soi_srbu-text-to-search",
    id: "soi_srbu-text-to-search",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text to search in the content and the Custom Fields in URLs', 'soi_srbu')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('To Replace', 'soi_srbu'),
    value: toReplace,
    onChange: value => setToReplace(value),
    name: "soi_srbu-text-to-replace",
    id: "soi_srbu-text-to-replace",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text to replace in the content and the Custom Fields in URLs', 'soi_srbu')
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Field', 'soi_srbu'),
    value: customField,
    onChange: value => setCustomField(value),
    name: "soi_srbu-custom-field",
    id: "soi_srbu-custom-field",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name of the Custom Field to add the text in URLs. If the Custom Field not exist, it is created.', 'soi_srbu')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text to Add', 'soi_srbu'),
    value: textToAdd,
    onChange: value => setTextToAdd(value),
    name: "soi_srbu-text-to-add",
    id: "soi_srbu-text-to-add",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text to add in the Custom Field in URLs. Add or replace the previous data in this Custom Field. Only work with strings or numbers depending on how is declarated.', 'soi_srbu')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: handleClick
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Submit', 'soi_srbu')), results.map((result, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_notice__WEBPACK_IMPORTED_MODULE_5__.Notice, {
    key: index,
    type: result.type,
    message: result.message,
    url: result.url
  })));
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin-page */ "./src/admin-page.js");

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


const AdminPageContainer = document.getElementById('soi_srbu-admin');
AdminPageContainer && ReactDOM.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_admin_page__WEBPACK_IMPORTED_MODULE_2__.AdminPage, null), AdminPageContainer);

/***/ }),

/***/ "./src/notice.js":
/*!***********************!*\
  !*** ./src/notice.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Notice: function() { return /* binding */ Notice; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



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
const Notice = ({
  type,
  message,
  url = ''
}) => {
  if (!message) return null;
  if (url) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `notice notice-${type} is-dismissible`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: url,
      target: "_blank"
    }, url), ": ", message));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `notice notice-${type} is-dismissible`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, message));
};


/***/ }),

/***/ "./src/validate-fields.js":
/*!********************************!*\
  !*** ./src/validate-fields.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateFields: function() { return /* binding */ validateFields; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


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
const validateFields = ({
  toSearch,
  toReplace,
  customField,
  textToAdd,
  isSearchAndReplace,
  urls,
  setNotice
}) => {
  let validationResult = true;
  if (!urls) {
    setNotice({
      type: 'error',
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('URLs field cannot be empty', 'soi_srbu')
    });
    validationResult = false;
  } else if (isSearchAndReplace) {
    if (!toSearch) {
      setNotice({
        type: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('To Search field cannot be empty', 'soi_srbu')
      });
      validationResult = false;
    } else if (!toReplace) {
      setNotice({
        type: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('To Replace field cannot be empty', 'soi_srbu')
      });
      validationResult = false;
    }
  } else {
    if (!customField) {
      setNotice({
        type: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Field field cannot be empty', 'soi_srbu')
      });
      validationResult = false;
    } else if (!textToAdd) {
      setNotice({
        type: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text to Add field cannot be empty', 'soi_srbu')
      });
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
      setNotice({
        type: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid URL found', 'soi_srbu')
      });
      return true;
    }
  });
  if (hasDifferentDomain) {
    setNotice({
      type: 'error',
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The domain of the URLs must match with the current site', 'soi_srbu')
    });
    validationResult = false;
  }
  return validationResult;
};


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksearch_replace_by_url"] = self["webpackChunksearch_replace_by_url"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map