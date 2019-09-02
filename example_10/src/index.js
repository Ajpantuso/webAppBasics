import 'normalize.css';
import './scss/main.scss';
import './js/topBar.js';

// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef
}
