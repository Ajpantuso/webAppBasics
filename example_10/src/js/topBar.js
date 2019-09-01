import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCDrawer} from "@material/drawer";

const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar')); // eslint-disable-line no-undef
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer')); // eslint-disable-line no-undef

topAppBar.setScrollTarget(document.getElementById('main-content')); // eslint-disable-line no-undef
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});
