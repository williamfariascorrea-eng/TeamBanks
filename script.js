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

    const videos = Array.from(document.querySelectorAll('video[data-stop-offscreen]'));
    const resultsTrack = document.getElementById('results-track');
    const resultsPrev = document.getElementById('results-prev');
    const resultsNext = document.getElementById('results-next');

    if (resultsTrack && resultsPrev && resultsNext) {
        const slides = Array.from(resultsTrack.querySelectorAll('.result-slide'));
        let currentSlide = 0;

        const renderResultSlide = () => {
            resultsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        resultsPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            renderResultSlide();
        });

        resultsNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            renderResultSlide();
        });

        renderResultSlide();
    }

    if (videos.length) {
        const stopVideo = (video) => {
            video.pause();
            if (video.currentTime > 0) {
                video.currentTime = 0;
            }
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
                        stopVideo(entry.target);
                    }
                });
            }, {
                threshold: [0, 0.35, 0.6]
            });

            videos.forEach((video) => observer.observe(video));
        } else {
            window.addEventListener('scroll', () => {
                videos.forEach((video) => {
                    const rect = video.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    const visibilityRatio = Math.max(0, visibleHeight) / Math.max(rect.height, 1);
                    if (visibilityRatio < 0.35) {
                        stopVideo(video);
                    }
                });
            }, { passive: true });
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                videos.forEach(stopVideo);
            }
        });
    }
});

