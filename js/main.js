// Function across mobile, tablet and desktop to show pixel width when previewing in VS Code and in the browser
function showWidth() {
  document.getElementById('width-indicator').textContent = window.innerWidth + 'px';
}
window.addEventListener('resize', showWidth);
showWidth();

// Mobile JS functionality:

// Constants in screaming snake case because they won't be changed throughout the website's lifecycle:
const MOBILE_HAMBURGER_SELECTOR = '.mobile-hamburger-menu-container';
const MOBILE_NAV_OVERLAY_SELECTOR = '.mobile-nav-hamburger-menu-overlay-container';
const MOBILE_NAV_OVERLAY_X_ICON_SELECTOR = '.mobile-nav-x-icon';
const ACTIVE_CLASS = 'is-active';

// Mobile nav hamburger menu functions:
// 1) The toggleMobileNavMenu function which toggles the 'is-active' state of the mobile-nav-hamburger-menu-overlay-container, which consequently alters the .css rules for this element:
function toggleMobileNavMenu() {
    const mobileNavOverlay = document.querySelector(MOBILE_NAV_OVERLAY_SELECTOR);
    // Best practice safety null check for the existence of the element with the mobile-nav-hamburger-menu-overlay-container class in the DOM. This check is best practice for JS scripts to future proof execution even if the DOM structure changes:
    if (mobileNavOverlay) {
        // If the element with the mobile-nav-hamburger-menu-overlay-container class in the DOM, toggle the classlist to the one where '.is-active' is appended
        mobileNavOverlay.classList.toggle(ACTIVE_CLASS);

        // After toggling the 'is-active' class, this condition checks if the overlay already has 'is-active' applied to it
        if (mobileNavOverlay.classList.contains(ACTIVE_CLASS)) {
            // 1) Close the overlay when clicking the X icon
            const xIcon = document.querySelector(MOBILE_NAV_OVERLAY_X_ICON_SELECTOR);
            if (xIcon) {
                xIcon.addEventListener('click', closeMobileNavOverlay);
            }
            // 2) Close when clicking outside the overlay. The mousedown event is preferred here over click as more immediate
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            removeCloseListeners();
        }
    }
}

// The function to toggle the 'is-active' state back to inactive to close the overlay:
function closeMobileNavOverlay() {
    const mobileNavOverlay = document.querySelector(MOBILE_NAV_OVERLAY_SELECTOR);
    // If mobileNavOverlay exists in the DOM and it has an 'is-active' state applied to it, remove 'is-active' and execute the removeCloseListeners() function
    if (mobileNavOverlay && mobileNavOverlay.classList.contains(ACTIVE_CLASS)) {
        mobileNavOverlay.classList.remove(ACTIVE_CLASS);
        removeCloseListeners();
    }
}

// The function to process the user's clicking outside the overlay:
function handleOutsideClick(event) {
    const mobileNavOverlay = document.querySelector(MOBILE_NAV_OVERLAY_SELECTOR);
    // If mobileNavOverlay exists in the DOM AND it has an 'is-active' state applied to it AND if the event, the click, target happenned outside the menu overlay boundaries, execute the closeMobileNavOverlay() function
    if (
        mobileNavOverlay &&
        mobileNavOverlay.classList.contains(ACTIVE_CLASS) &&
        !mobileNavOverlay.contains(event.target)
    ) {
        closeMobileNavOverlay();
    }
}

// A clean up function to remove redundant event listeners when the overlay is inactive. Good practice to prevent accumulation of event listeners in web apps. It's referenced in the else block of toggleMobileNavMenu and in the closeMobileNavOverlay function.
function removeCloseListeners() {
    const xIcon = document.querySelector(MOBILE_NAV_OVERLAY_X_ICON_SELECTOR);
    if (xIcon) {
        // Execute the removeEventListener method on the same params when adding the listener in the first place (line 30 within toggleMobileNavMenu())
        xIcon.removeEventListener('click', closeMobileNavOverlay);
    }
    // Removes the document-level mousedown event listener that handles outside clicks when the overlay is active. No null check needed as the document object always exists in the typescript Node module (see lib.dom.d.ts)
    document.removeEventListener('mousedown', handleOutsideClick);
}

// 2) The openMobileNavMenu function is the open, or trigger, function for the toggleMobileNavMenu function. When the event listener is activated, when a user taps the hamburger icon, it runs the toggleMobileNavMenu function. 
function openMobileNavMenu() {
    const mobileHamburgerIcon = document.querySelector(MOBILE_HAMBURGER_SELECTOR);
    if (mobileHamburgerIcon) {
        mobileHamburgerIcon.addEventListener('click', toggleMobileNavMenu);
    }
}

// Initialize mobile nav menu when DOM is loaded - why shouldn't this be at the top?
document.addEventListener('DOMContentLoaded', openMobileNavMenu);


// Mobile footer hamburger menu functions



// Tablet JS functionality:

// Tablet nav hamburger menu functions:


// Tablet footer hamburger menu functions:



/* Note to self, when I've finished the code here, ask CoPilot for advice on how I can iterate to adhere to DRY principles  */