import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCDrawer} from "@material/drawer";
import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple/index';
import $ from 'jquery';

$(() => {
  const topAppBar = MDCTopAppBar.attachTo($( '#app-bar' )[0]);
  const drawer = MDCDrawer.attachTo($( '.mdc-drawer' )[0]);
  const mainContent = $( '#main-content' );
  topAppBar.setScrollTarget(mainContent[0]);
  topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
  });

  $( '#edit' ).on('click', () => {
    if (! mainContent.hasClass( "editing" )) {
      var template = require("../views/textArea.pug"); // eslint-disable-line no-undef
      mainContent.html(template({}));
      mainContent.addClass("editing");
    }
  })

  $( '#clear' ).on('click', () => {
    if (mainContent.hasClass("editing")) {
      var mainTextField = MDCTextField.attachTo($( '#main-text-field' )[0]);
      mainTextField.value = "";
    }
  })

  $( '#save' ).on('click', () => {
    if (! $( '.save-form' ).length && mainContent.hasClass("editing")) { // eslint-disable-line no-undef
      mainContent.append(
        $.parseHTML(
          require('../views/form.pug')({})  // eslint-disable-line no-undef
        )
      );
      MDCTextField.attachTo($( '.thought-title' )[0]);
      MDCTextField.attachTo($( '.thought-subtitle' )[0]);
      MDCRipple.attachTo($( '.thought-title' )[0]);
      MDCRipple.attachTo($( '.thought-subtitle' )[0]);
      MDCRipple.attachTo($( '.thought-cancel' )[0]);
      MDCRipple.attachTo($( '.thought-save' )[0]);

      $( '#form-cancel' ).on('click', () => { // eslint-disable-line no-undef
        $( '.save-form' ).remove();
      })

      $( '#form-save' ).on('click', () => { // eslint-disable-line no-undef
        return;
      })
    }
  })
})
