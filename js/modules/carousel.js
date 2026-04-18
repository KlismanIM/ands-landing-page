export function initCarousel() {
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            new Swiper('.swiper', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                effect: 'fade',
                fadeEffect: { crossFade: true },
                slidesPerView: 1,
                spaceBetween: 0,
            });
        }
    }, 200);
}