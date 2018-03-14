import fontawesome from '@fortawesome/fontawesome';
import faFontAwesomeAlt from '@fortawesome/fontawesome-free-brands/faFontAwesomeAlt';

import 'bootstrap'; // auto imports jQuery and Popper for bootstrap
import './js/main';

fontawesome.library.add(faFontAwesomeAlt);

console.log("I'm just a silly little entry point!");

// sample ES6 code
const app = (a, b) => a + b;
console.log(app(4, 6));
