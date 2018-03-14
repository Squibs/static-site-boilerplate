// FontAwesome imports (https://fontawesome.com/how-to-use/use-with-node-js#free)
import fontawesome from '@fortawesome/fontawesome';
import faFontAwesomeAlt from '@fortawesome/fontawesome-free-brands/faFontAwesomeAlt';

import 'bootstrap'; // auto imports jQuery and Popper for bootstrap
import './main';

// add each icon to fontawesome library
fontawesome.library.add(faFontAwesomeAlt);

// //////////////////////////////////////////////////////////////////////////////////
// Reduce entry.js size by importing Bootstrap plugins individually
// (https://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-javascript)
// //////////////////////////////////////////////////////////////////////////////////
// // Instead of: import 'bootstrap';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';
// ////////////////////////////////////////////////////////////////////////

// Show proof of entry code
console.log("I'm just a silly little entry point!");

// sample ES6 code will be transpiled by Babel then minimized on build
const app = (a, b) => a + b;
console.log(app(4, 6));
