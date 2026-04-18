export function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    const menuStore = window.Alpine?.store('app');
                    if (menuStore) menuStore.isMenuOpen = false;
                }
            }
        });
    });
}

export function updateActiveSection() {
    const sections = ['home', 'about', 'projects', 'impact', 'news', 'contact'];
    for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                // Update Alpine store or dispatch event
                window.dispatchEvent(new CustomEvent('sectionChange', { detail: section }));
            }
        }
    }
}