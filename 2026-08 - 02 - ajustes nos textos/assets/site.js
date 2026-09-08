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

        // Close mobile menu when a direct link is clicked
        mobileMenu.querySelectorAll('.nav-link:not(.nav-mobile-dropdown-toggle), .nav-mobile-sublink').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- Mobile Submenu Toggles ----
    document.querySelectorAll('.nav-mobile-dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = toggle.closest('.nav-mobile-dropdown');
            if (parent) {
                parent.classList.toggle('open');
                const isOpen = parent.classList.contains('open');
                toggle.setAttribute('aria-expanded', isOpen);
            }
        });
    });

    // ---- Desktop Dropdown Toggle for Touch/Click ----
    document.querySelectorAll('.nav-dropdown .dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = toggle.closest('.nav-dropdown');
            if (parent) {
                const isOpen = parent.classList.contains('open');
                document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
                    if (d !== parent) d.classList.remove('open');
                });
                parent.classList.toggle('open', !isOpen);
                toggle.setAttribute('aria-expanded', !isOpen);
            }
        });
    });

    // Close desktop dropdowns on click outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
                d.classList.remove('open');
                const toggle = d.querySelector('.dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // ---- Active Nav Link Highlight ----
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const currentPage = currentPath.split('/').pop() || 'index';

    document.querySelectorAll('.nav-link, .dropdown-item, .nav-mobile-sublink').forEach(function (link) {
        const href = link.getAttribute('href');
        if (!href) return;

        const hrefPage = href.replace('.html', '').replace('./', '').replace(/\/$/, '') || 'index';

        if (currentPage === hrefPage ||
            (currentPage === 'index' && (href === '/' || href === './index.html' || href === 'index.html'))) {
            link.classList.add('active');

            // Highlight parent desktop dropdown button if inside dropdown
            const desktopParent = link.closest('.nav-dropdown');
            if (desktopParent) {
                const toggle = desktopParent.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }

            // Highlight parent mobile dropdown button and open it if inside mobile dropdown
            const mobileParent = link.closest('.nav-mobile-dropdown');
            if (mobileParent) {
                mobileParent.classList.add('open');
                const mobileToggle = mobileParent.querySelector('.nav-mobile-dropdown-toggle');
                if (mobileToggle) mobileToggle.classList.add('active');
            }
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
