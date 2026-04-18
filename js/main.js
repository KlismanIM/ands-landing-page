// Entry point - ANDS Project
import { initSmoothScroll } from './modules/scroll.js';
import { initMobileMenu } from './modules/menu.js';
import { initContactForm } from './modules/form.js';
import { initAnimations } from './modules/animations.js';
import { initCarousel } from './modules/carousel.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileMenu();
    initContactForm();
    initAnimations();
    initCarousel();
    
    // Lucide icons refresh
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});