document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) {
        AOS.init({
            duration: 900,
            once: true,
            mirror: false,
            easing: 'ease-in-out'
        });
    }

    const nav = document.querySelector('nav');
    let scrollTicking = false;

    const updateNav = () => {
        if (!nav) return;

        if (window.scrollY > 50) {
            nav.classList.add('bg-[#030712]/90', 'border-white/10', 'shadow-2xl', 'py-4');
            nav.classList.remove('py-5');
        } else {
            nav.classList.remove('bg-[#030712]/90', 'border-white/10', 'shadow-2xl', 'py-4');
            nav.classList.add('py-5');
        }
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateNav);
            scrollTicking = true;
        }
    });
    updateNav();

    // Menu Mobile Logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('opacity-100');
            
            if (!isOpen) {
                // Abrir
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
                mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                menuToggle.classList.add('text-brand-ice', 'border-brand-ice/30');
            } else {
                // Fechar
                mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.classList.remove('text-brand-ice', 'border-brand-ice/30');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.classList.remove('text-brand-ice', 'border-brand-ice/30');
            });
        });
    }

    document.querySelectorAll('.faq-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach((faqItem) => {
                faqItem.classList.remove('active');
                const faqContent = faqItem.querySelector('.faq-content');
                if (faqContent) {
                    faqContent.style.maxHeight = null;
                }
            });

            if (!isActive && content) {
                item.classList.add('active');
                content.style.maxHeight = `${content.scrollHeight}px`;
            }
        });
    });

    const track = document.getElementById('examples-track');
    const prevButton = document.getElementById('examples-prev');
    const nextButton = document.getElementById('examples-next');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));

    if (track && prevButton && nextButton && dots.length) {
        let currentSlide = 0;
        const totalSlides = dots.length;

        const renderSlide = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === currentSlide);
            });
        };

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            renderSlide();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            renderSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                renderSlide();
            });
        });

        renderSlide();
    }
});
