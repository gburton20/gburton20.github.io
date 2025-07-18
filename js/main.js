import { gsap } from gsap/dist/gsap;

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Function across mobile, tablet and desktop to show pixel width when previewing in VS Code and in the browser
function showWidth() {
  document.getElementById('width-indicator').textContent = window.innerWidth + 'px';
}
window.addEventListener('resize', showWidth);
showWidth();

// Mobile JS functionality:

// OVERLAY MENU constants (in screaming snake case because they won't be changed throughout the website's lifecycle):

// Const assigned to the string 'is-active', which is used as a reusable variable for the CSS class name. There are CSS class names for those overlay containers which need to have their 'state' toggled between '.is-active' and inactive. The subsequent functions append this string to the classnames in the DOM if ACTIVE_CLASS is called.
const ACTIVE_CLASS = 'is-active';

// X ICONs TO ESCAPE OVERLAY MENUS
// MOBILE:
const MOBILE_NAV_OVERLAY_X_ICON_SELECTOR = '.mobile-nav-overlay-x-icon';
const MOBILE_FOOTER_OVERLAY_X_ICON_SELECTOR = '.mobile-footer-overlay-x-icon';

// TABLET:
const TABLET_NAV_OVERLAY_X_ICON_SELECTOR = '.tablet-nav-overlay-x-icon';
const TABLET_FOOTER_OVERLAY_X_ICON_SELECTOR = '.tablet-footer-overlay-x-icon';


// NAV BAR:
// MOBILE:
// Consts for the MOBILE nav overlay menu:
const MOBILE_HAMBURGER_SELECTOR = '.mobile-hamburger-menu-container';
const MOBILE_NAV_OVERLAY_SELECTOR = '.mobile-nav-hamburger-menu-overlay-container';

// TABLET:
// Consts for the TABLET nav overlay menu:
const TABLET_HAMBURGER_SELECTOR = '.tablet-hamburger-menu-container';
const TABLET_NAV_OVERLAY_SELECTOR = '.tablet-nav-overlay-menu-container';


// FOOTERS:
// MOBILE:
// Const for the MOBILE footer button, 'Let's work together'
const MOBILE_FOOTER_BUTTON_SELECTOR = '.mobile-footer-button-container'
// Const for the mobile footer overlay menu, which displays when 'toggled' to 'is-active'
const MOBILE_FOOTER_OVERLAY_SELECTOR = '.mobile-footer-overlay-menu-container'

// TABLET:
// Const for the TABLET footer button
const TABLET_FOOTER_BUTTON_SELECTOR = '.tablet-footer-button-container'
// Const for the tablet footer overlay menu, which displays when 'toggled' to 'is-active'
const TABLET_FOOTER_OVERLAY_SELECTOR = '.tablet-footer-overlay-menu-container'


// GENERIC OVERLAY MENU UTILITY FUNCTIONS APPLICABLE ACROSS MOBILE AND TABLET:

// A reusable and universal function for toggling the 'is-active' string to the classnames of relevant overlay menus across the website.
// 'overlaySelector' is a placeholder param for targeting the specific overlay element (mobile or tablet overlay menu)
// 'xIconSelector' is a placeholder param for identifying the close 'X' button in the overlay menu
function toggleOverlayMenu(overlaySelector, xIconSelector) {
    const overlay = document.querySelector(overlaySelector);
    // Defensive programming safety check 'if' statement to ensure the element exists in the DOM before proceeding:
    if (overlay) {
        // If the element exists, toggle the '.is-active' class in the DOM
        overlay.classList.toggle(ACTIVE_CLASS);
        // When the overlay becomes active, and open, call addOverlayEventListeners() to set up event handlers (the 'x' or tapping off menu) to close the overlay
        if (overlay.classList.contains(ACTIVE_CLASS)) {
            addOverlayEventListeners(overlaySelector, xIconSelector);
        // When the overlay is inactive, and closed, call removeOverlayEventListeners() to remove redunandt event handlers (the 'x' or tapping off menu) to keep the code efficient and lightweight
        } else {
            removeOverlayEventListeners(overlaySelector, xIconSelector);
        }
    }
}

// Function to add the 'click' event listener to the universal X icon, and the 'mousedown' event listener to the entirety of the document outside of an active overlay for the handleOutsideClick function. This function is executed each time the overlay opens, overwriting the _closeHandler property each time. This overwriting happens for both overlays opening (see line 99 in removeOverlayEventListeners()).
function addOverlayEventListeners(overlaySelector, xIconSelector) {
    const xIcon = document.querySelector(xIconSelector);
    // If xIcon exists:
    if (xIcon) {
        // _closeHandler is declared as a custom property on the specific xIcon DOM element instance. It's conventional to start to name a custom properties with an underscore prefix. This custom property exists as long as the xIcon DOM element exists. This custom property has 'element(xIcon)-wide scope'.
        xIcon._closeHandler = () => closeOverlayMenu(overlaySelector, xIconSelector);
        // The newly created _closeHandler property, which has the value of the closeOverlayMenu() function assigned to it, is attached to the xIcon element's 'click' event. Thanks to this line, when the user clicks the xIcon element, the closeOverlayMenu() function is executed. 
        xIcon.addEventListener('click', xIcon._closeHandler);
    }
    // Store the handler reference
    document._outsideClickHandler = (event) => handleOutsideClick(event, overlaySelector, xIconSelector);
    document.addEventListener('mousedown', document._outsideClickHandler);
}

// A clean up function to remove redundant overlay event listeners when the overlay is inactive. This function is conventionally good practice to prevent the accumulation of redunant event listeners in web apps. It's referenced in the else block of toggleMobileNavMenu and in the closeMobileNavOverlay function.
function removeOverlayEventListeners(_overlaySelector, xIconSelector) {
    const xIcon = document.querySelector(xIconSelector);
    // If the universal X icon exists in the overly menu
    if (xIcon) {
        xIcon.removeEventListener('click', xIcon._closeHandler);
    }
    document.removeEventListener('mousedown', document._outsideClickHandler);
}

// Function to close the overlay menu via clicking the 'X' button in the overlay menu:
function closeOverlayMenu(overlaySelector, xIconSelector) {
    const overlay = document.querySelector(overlaySelector);
    // If the relevant overlay selector exists AND the overlay selector classname contains the string '.is-active':
    if (overlay && overlay.classList.contains(ACTIVE_CLASS)) {
        // Remove the '.is-active' string from the selector's classname in the DOM
        overlay.classList.remove(ACTIVE_CLASS);
        // Execute the removeOverlayEventListeners function with the relevant selector and the universal X icon passed in as params:
        removeOverlayEventListeners(overlaySelector, xIconSelector);
    }
}

// The function to process the user's clicking outside the overlay to close it:
function handleOutsideClick(event, overlaySelector, xIconSelector) {
    const overlay = document.querySelector(overlaySelector);
    // If the relevant overlay exists in the DOM AND it has an 'is-active' state applied to it AND if the event, the click, target DID NOT happen INSIDE the menu overlay boundaries, execute the closeOverlayMenu() function
    if (overlay && overlay.classList.contains(ACTIVE_CLASS) && !overlay.contains(event.target)) {
        closeOverlayMenu(overlaySelector, xIconSelector);
    }
}


// MOBILE-SPECIFIC OVERLAY MENU FUNCTIONS:

// MOBILE-SPECIFIC NAV OVERLAY MENU FUNCTIONS:
 
function toggleMobileNavMenu() {
    // Call the generic function with mobile nav-specific selectors
    toggleOverlayMenu(MOBILE_NAV_OVERLAY_SELECTOR, MOBILE_NAV_OVERLAY_X_ICON_SELECTOR);
}

function openMobileNavMenu() {
    const mobileHamburgerIcon = document.querySelector(MOBILE_HAMBURGER_SELECTOR);
    if (mobileHamburgerIcon) {
        mobileHamburgerIcon.addEventListener('click', toggleMobileNavMenu);
    }
}

// MOBILE-SPECIFIC FOOTER OVERLAY MENU FUNCTIONS:

function toggleMobileFooterMenu() {
    // Call the same generic function with footer-specific selectors
    toggleOverlayMenu(MOBILE_FOOTER_OVERLAY_SELECTOR, MOBILE_FOOTER_OVERLAY_X_ICON_SELECTOR);
}

function openMobileFooterMenu() {
    const mobileFooterButton = document.querySelector(MOBILE_FOOTER_BUTTON_SELECTOR);
    if (mobileFooterButton) {
        mobileFooterButton.addEventListener('click', toggleMobileFooterMenu);
    }
}


// TABLET-SPECIFIC OVERLAY MENU FUNCTIONS:

// TABLET-SPECIFIC NAV OVERLAY MENU FUNCTIONS:
function toggleTabletNavMenu() {
    // Call the generic function with tablet nav-specific selectors:
    toggleOverlayMenu(TABLET_NAV_OVERLAY_SELECTOR, TABLET_NAV_OVERLAY_X_ICON_SELECTOR);
}

function openTabletNavMenu() {
    const tabletHamburgerIcon = document.querySelector(TABLET_HAMBURGER_SELECTOR);
    if (tabletHamburgerIcon) {
        tabletHamburgerIcon.addEventListener('click', toggleTabletNavMenu);
    }
}

// TABLET-SPECIFIC NAV FOOTER MENU FUNCTIONS:
function toggleTabletFooterMenu() {
    // Call the same generic function with footer-specific selectors
    toggleOverlayMenu(TABLET_FOOTER_OVERLAY_SELECTOR, TABLET_FOOTER_OVERLAY_X_ICON_SELECTOR);
}

function openTabletFooterMenu() {
    const tabletFooterButton = document.querySelector(TABLET_FOOTER_BUTTON_SELECTOR);
    if (tabletFooterButton) {
        tabletFooterButton.addEventListener('click', toggleTabletFooterMenu);
    }
}

/* Note to self, when I've finished the code here, ask CoPilot for advice on how I can iterate to adhere to DRY principles  */

// Initialize mobile nav and footer menu when DOM is loaded after all functions have been declared, above.
document.addEventListener('DOMContentLoaded', () => {
    openMobileNavMenu();
    openMobileFooterMenu();
    openTabletNavMenu();
    openTabletFooterMenu();
});