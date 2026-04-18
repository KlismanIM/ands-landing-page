export function initAnimations() {
    // Wait for AOS library
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
            
            // Refresh after images load
            window.addEventListener('load', () => AOS.refresh());
        }
    }, 100);
}