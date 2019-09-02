import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCDrawer} from "@material/drawer";
import {MDCTextField} from '@material/textfield';

const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar')); // eslint-disable-line no-undef
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer')); // eslint-disable-line no-undef

topAppBar.setScrollTarget(document.getElementById('main-content')); // eslint-disable-line no-undef
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

const edit = document.getElementById('edit');

edit.addEventListener('click', () => {
  var template = require("../views/textArea.pug");
  var mainTextField = document.getElementById('main-text-field');
  if (! mainTextField) {
    var mainContent = document.getElementById('main-content');
    mainContent.innerHTML = template({});
    const textField = MDCTextField.attachTo(document.querySelector('.mdc-text-field')); // eslint-disable-line no-undef
  }
})

const clear = document.getElementById('clear');

clear.addEventListener('click', () => {
  const textField = MDCTextField.attachTo(document.querySelector('.mdc-text-field')); // eslint-disable-line no-undef
  textField.value = "";
})

//Save will store the thoughts in a list to be displayed with another button
const save = document.getElementById('save');

save.addEventListener('click', () => {
  const content = document.getElementById('main-content');
  content.innerHTML = "";
})
