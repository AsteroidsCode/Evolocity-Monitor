const button = document.querySelector('.foo-button');
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));

mdc.ripple.MDCRipple.attachTo(button);

topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

const button1 = document.querySelector('.foo-button1');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("sw.js")
    .then((reg) => {
      console.log('Service worker registered.', reg);
    });
  });
}
