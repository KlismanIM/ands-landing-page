export function initMobileMenu() {
    // Menu logic handled by Alpine.js
    // This module ensures body lock when menu is open
    document.addEventListener('alpine:init', () => {
        Alpine.store('app', {
            isMenuOpen: false,
            toggleMenu() {
                this.isMenuOpen = !this.isMenuOpen;
                document.body.classList.toggle('menu-open', this.isMenuOpen);
            }
        });
    });
}