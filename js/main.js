// Function across mobile, tablet and desktop to show pixel width when previewing in VS Code and in the browser
function showWidth() {
  document.getElementById('width-indicator').textContent = window.innerWidth + 'px';
}
window.addEventListener('resize', showWidth);
showWidth();

// Mobile JS functionality:

// Mobile nav hamburger menu functions
const MOBILE_HAMBURGER_ICON = document.querySelector('.mobile-hamburger-menu-container');
const MOBILE_NAV_HAMBURGER_OVERLAY = document.querySelector('mobile-nav-hamburger-menu-overlay-container');

MOBILE_HAMBURGER_ICON.addEventListener('click', () => {
    MOBILE_NAV_HAMBURGER_OVERLAY.toggle('is-active');
});


// Mobile footer hamburger menu functions



// Tablet JS functionality:

// Tablet nav hamburger menu functions:


// Tablet footer hamburger menu functions:



/* Note to self, when I've finished the code here, ask CoPilot for advice on how I can iterate to adhere to DRY principles  */