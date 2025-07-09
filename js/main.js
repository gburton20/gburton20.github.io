// Function across mobile, tablet and desktop to show pixel width when previewing in VS Code and in the browser
function showWidth() {
  document.getElementById('width-indicator').textContent = window.innerWidth + 'px';
}
window.addEventListener('resize', showWidth);
showWidth();

// Mobile JS functionality:

// Constants for better maintainability
const MOBILE_HAMBURGER_SELECTOR = '.mobile-hamburger-menu-container';
const MOBILE_NAV_OVERLAY_SELECTOR = '.mobile-nav-hamburger-menu-overlay-container';
const ACTIVE_CLASS = 'is-active';

// Mobile nav hamburger menu functions
function toggleMobileNavMenu() {
    const mobileNavOverlay = document.querySelector(MOBILE_NAV_OVERLAY_SELECTOR);
    if (mobileNavOverlay) {
        mobileNavOverlay.classList.toggle(ACTIVE_CLASS);
    }
}

function initializeMobileNavMenu() {
    const mobileHamburgerIcon = document.querySelector(MOBILE_HAMBURGER_SELECTOR);
    if (mobileHamburgerIcon) {
        mobileHamburgerIcon.addEventListener('click', toggleMobileNavMenu);
    }
}

// Initialize mobile nav menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMobileNavMenu);


// Mobile footer hamburger menu functions



// Tablet JS functionality:

// Tablet nav hamburger menu functions:


// Tablet footer hamburger menu functions:



/* Note to self, when I've finished the code here, ask CoPilot for advice on how I can iterate to adhere to DRY principles  */