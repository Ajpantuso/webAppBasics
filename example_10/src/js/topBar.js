import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCDrawer} from "@material/drawer";
import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple/index';

const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar')); // eslint-disable-line no-undef
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer')); // eslint-disable-line no-undef

topAppBar.setScrollTarget(document.getElementById('main-content')); // eslint-disable-line no-undef
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

document.getElementById('edit').addEventListener('click', () => { // eslint-disable-line no-undef
  var mainContent = document.getElementById('main-content'); // eslint-disable-line no-undef
  if (! mainContent.classList.contains("editing")) {
    var template = require("../views/textArea.pug"); // eslint-disable-line no-undef
    mainContent.innerHTML = template({});
    mainContent.classList.add("editing");
  }
})

document.getElementById('clear').addEventListener('click', () => {  // eslint-disable-line no-undef
  var mainContent = document.getElementById('main-content'); // eslint-disable-line no-undef
  if (mainContent.classList.contains("editing")) {
    var mainTextField = MDCTextField.attachTo(document.getElementById('main-text-field')); // eslint-disable-line no-undef
    mainTextField.value = "";
  }
})

document.getElementById('save').addEventListener('click', () => { // eslint-disable-line no-undef
  var mainContent = document.getElementById('main-content'); // eslint-disable-line no-undef
  if (! document.querySelector('.save-form') && mainContent.classList.contains("editing")) { // eslint-disable-line no-undef
    document.getElementById('main-content').append(createForm()); // eslint-disable-line no-undef
    MDCTextField.attachTo(document.querySelector('.thought-title')); // eslint-disable-line no-undef
    MDCTextField.attachTo(document.querySelector('.thought-subtitle')); // eslint-disable-line no-undef
    MDCRipple.attachTo(document.querySelector('.thought-title')); // eslint-disable-line no-undef
    MDCRipple.attachTo(document.querySelector('.thought-subtitle')); // eslint-disable-line no-undef
    MDCRipple.attachTo(document.querySelector('.thought-cancel')); // eslint-disable-line no-undef
    MDCRipple.attachTo(document.querySelector('.thought-save')); // eslint-disable-line no-undef

    document.getElementById('form-cancel').addEventListener('click', () => { // eslint-disable-line no-undef
      var form = document.querySelector('.save-form'); // eslint-disable-line no-undef
      form.parentNode.removeChild(form);
    })

    document.getElementById('form-save').addEventListener('click', () => { // eslint-disable-line no-undef
      return;
    })
  }
})

function createForm () {
  var temp = document.createElement("div"); // eslint-disable-line no-undef
  var template = require('../views/form.pug'); // eslint-disable-line no-undef
  temp.innerHTML =  template({});
  return temp.firstChild;
}
