import { qs, on } from './utils/dom.js';

export function initMobileMenu() {
    const mobileMenuToggle = qs('.mobile-menu-toggle');
    const nav = qs('nav');
    const navLinksContainer = qs('.nav-links-container');
    if (!mobileMenuToggle || !nav || !navLinksContainer) return;

    on(mobileMenuToggle, 'click', () => {
        const isOpened = nav.classList.toggle('mobile-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpened));
        document.body.classList.toggle('no-scroll', isOpened);
    });

    const closeMenu = () => {
        nav.classList.remove('mobile-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    };

    on(navLinksContainer, 'click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const isDropdownToggle = link.parentElement?.classList.contains('dropdown') && window.innerWidth <= 992;
            if (!isDropdownToggle) closeMenu();
        } else if (e.target.classList.contains('demo-button')) {
            closeMenu();
        }
    });
}


