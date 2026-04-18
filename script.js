document.addEventListener('DOMContentLoaded', function () {
    
    // Enhanced Mouse Parallax Effect
    const heroSection = document.querySelector('#home, section[id^="home"]');
    const glowElements = document.querySelectorAll('.hero-mesh + div, [class*="blur-"]');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        // Apply parallax to background glows
        const glows = document.querySelectorAll('.hero-mesh + div [class*="blur-"]');
        glows.forEach((glow, index) => {
            const speed = (index + 1) * 0.5;
            glow.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });
    
    // Smooth glow animation on hover
    document.querySelectorAll('.glass-card, .feature-card, .consult-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.setProperty('--mouse-x', `${x * 20}px`);
            card.style.setProperty('--mouse-y', `${y * 20}px`);
        });
    });
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
            video.currentTime = 0;
            video.load();
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

