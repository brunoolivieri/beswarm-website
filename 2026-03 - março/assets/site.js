/* ==========================================
   site.js - Minimal interactivity scripts only
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Mobile Menu Toggle ----
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
            const isOpen = mobileMenu.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- Active Nav Link Highlight ----
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const currentPage = currentPath.split('/').pop() || 'index';

    document.querySelectorAll('.nav-link').forEach(function (link) {
        const href = link.getAttribute('href');
        if (!href) return;

        const hrefPage = href.replace('.html', '').replace('./', '').replace(/\/$/, '') || 'index';

        if (currentPage === hrefPage ||
            (currentPage === 'index' && (href === '/' || href === './index.html' || href === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // ---- Fade-in on Scroll ----
    const fadeElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(function (el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

});
