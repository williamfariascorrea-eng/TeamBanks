document.addEventListener('DOMContentLoaded', function () {
    // Anti-copia e segurança
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);

    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P, F12
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            return false;
        }
        // Disable F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+C (Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
    }, false);

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        return false;
    }, false);

    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Disable selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Disable cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Disable paste
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Disable iframe embedding
    if (window.top !== window.self) {
        window.top.location.href = window.self.location.href;
    }

    // Disable right-click on images
    document.addEventListener('contextmenu', function(e) {
        const img = e.target;
        if (img.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }, false);

    // Disable keyboard print screen
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
        }
    }, false);

    // Disable developer tools detection (simplified - just detect very large sizes)
    let devToolsWarningShown = false;
    setInterval(function() {
        const width = window.outerWidth - window.innerWidth;
        const height = window.outerHeight - window.innerHeight;
        // Only show warning, don't hide content (too aggressive)
        if ((width > 200 || height > 200) && !devToolsWarningShown) {
            console.log('DevTools detected');
            devToolsWarningShown = true;
        }
    }, 2000);

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
    }, { passive: true });
    updateNav();

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.height = scrolled + '%';
        }, { passive: true });
    }

    // Section Dots Navigation
    const sections = document.querySelectorAll('section[id]');
    const sectionDots = document.querySelectorAll('.section-dot');

    function updateActiveSection() {
        let current = '';
        const scrolled = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrolled >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        sectionDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === current) {
                dot.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    // Menu Mobile Logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');

            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = '80vh';
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                menuToggle.classList.add('text-brand-ice', 'border-brand-ice/30');
            } else {
                mobileMenu.style.maxHeight = '0px';
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.classList.remove('text-brand-ice', 'border-brand-ice/30');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.maxHeight = '0px';
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
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

    // Lazy load images for 60fps performance
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px' });

        lazyImages.forEach((img) => imageObserver.observe(img));
    }
});