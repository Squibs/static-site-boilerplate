// FontAwesome imports (https://fontawesome.com/how-to-use/use-with-node-js#free)
import fontawesome from '@fortawesome/fontawesome';
import faFontAwesomeAlt from '@fortawesome/fontawesome-free-brands/faFontAwesomeAlt';
import faGulp from '@fortawesome/fontawesome-free-brands/faGulp';
import faGrunt from '@fortawesome/fontawesome-free-brands/faGrunt';
import faGithubAlt from '@fortawesome/fontawesome-free-brands/faGithubAlt';

import 'bootstrap'; // auto imports jQuery and Popper for bootstrap
import './main'; // main.js

// favicon related files (https://realfavicongenerator.net/)(might be (is) overkill)
import '../favicon/android-chrome-192x192.png';
import '../favicon/android-chrome-512x512.png';
import '../favicon/apple-touch-icon.png';
import '../favicon/browserconfig.xml';
import '../favicon/favicon-16x16.png';
import '../favicon/favicon-32x32.png';
import '../favicon/favicon.ico';
import '../favicon/mstile-150x150.png';
import '../favicon/safari-pinned-tab.svg';
import '../favicon/site.webmanifest';

// add each icon to fontawesome library
fontawesome.library.add(faFontAwesomeAlt, faGulp, faGrunt, faGithubAlt);

// //////////////////////////////////////////////////////////////////////////////////
// Reduce entry.js size by importing Bootstrap plugins individually
// (https://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-javascript)
// //////////////////////////////////////////////////////////////////////////////////
// // Instead of: import 'bootstrap';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';
// ////////////////////////////////////////////////////////////////////////

// Show proof of entry code
console.log('I\'m just a silly little entry point!');

// sample ES6 code will be transpiled by Babel then minimized on build
const app = (a, b) => a + b;
console.log('ES6 compiling works (answer 10): ', app(4, 6));
