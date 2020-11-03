// FontAwesome imports (https://fontawesome.com/how-to-use/use-with-node-js#free)
// New changes to FontAwesome new way: (https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core)
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesomeAlt, faGulp, faGrunt, faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import 'bootstrap'; // auto imports jQuery and Popper for bootstrap
import './main'; // main.js
import 'lazysizes'; // Lazy load images lower in the page https://github.com/aFarkas/lazysizes

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

// root files
import '../^root/robots.txt';
import '../^root/sitemap.xml';
import '../^root/.htaccess';

// css
import '../scss/entry.scss';

// others
// import '../img/meta-image-min.jpg'; // meta tag og:image

// fontawesome: add each icon to fontawesome library
library.add(faFontAwesomeAlt, faGulp, faGrunt, faGithubAlt);
dom.watch(); // replace existing <i> tags with <svg> w/ MutationObserver continuously as DOM changes

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
