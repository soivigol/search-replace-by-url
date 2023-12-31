/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

import { AdminPage } from './admin-page';

const AdminPageContainer = document.getElementById('soi_srbu-admin');
AdminPageContainer && ReactDOM.render(<AdminPage />, AdminPageContainer);
