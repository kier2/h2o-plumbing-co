/* =============================================
   h2o Plumbing Co. — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. Mobile Menu Toggle
    // ========================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpen = document.getElementById('menu-icon-open');
    const menuClose = document.getElementById('menu-icon-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuOpen.classList.toggle('hidden', isOpen);
            menuClose.classList.toggle('hidden', !isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when a link is tapped
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuOpen.classList.remove('hidden');
                menuClose.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ========================================
    // 2. Header Shadow on Scroll
    // ========================================
    const header = document.getElementById('header');

    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ========================================
    // 3. FAQ Accordion
    // ========================================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = answer.classList.contains('open');

            // Close all other answers first
            document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                openAnswer.classList.remove('open');
                openAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
            });

            // Toggle the clicked one
            if (!isOpen) {
                answer.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ========================================
    // 4. Scroll Reveal (Intersection Observer)
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ========================================
    // 5. Demo Banner Dismiss
    // ========================================
    const bannerClose = document.getElementById('banner-close');
    const banner = document.getElementById('demo-banner');

    if (bannerClose && banner) {
        bannerClose.addEventListener('click', () => {
            banner.style.maxHeight = banner.scrollHeight + 'px';
            requestAnimationFrame(() => {
                banner.style.overflow = 'hidden';
                banner.style.transition = 'max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease';
                banner.style.maxHeight = '0';
                banner.style.paddingTop = '0';
                banner.style.paddingBottom = '0';
                banner.style.opacity = '0';
            });
        });
    }

    // ========================================
    // 6. Contact Form Handler (Demo)
    // ========================================
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (form && formSuccess) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formSuccess.classList.remove('hidden');
            form.reset();
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 6000);
        });
    }

    // ========================================
    // 7. Active Navigation Highlight
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        const highlightNav = () => {
            const scrollPos = window.scrollY + 120;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const link = document.querySelector(`.nav-link[href="#${id}"]`);

                if (link) {
                    if (scrollPos >= top && scrollPos < top + height) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        };
        window.addEventListener('scroll', highlightNav, { passive: true });
        highlightNav();
    }

});
