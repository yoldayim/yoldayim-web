import { qs, qsa, on } from './utils/dom.js';

export function initNavigation() {
    const landingPageContent = qs('#landing-page-content');
    const logoLink = qs('#logo-link');
    const velilerNavLink = qs('#veliler-nav-link');
    const okullarNavLink = qs('#okullar-nav-link');
    const servisYoneticileriNavLink = qs('#servis-yoneticileri-nav-link');
    const suruculerNavLink = qs('#suruculer-nav-link');
    const misyonumuzNavLink = qs('#misyonumuz-nav-link');
    const vizyonumuzNavLink = qs('#vizyonumuz-nav-link');
    const bizKimizNavLink = qs('#biz-kimiz-nav-link');
    const iletisimNavLink = qs('#iletisim-nav-link');
    const velilerPage = qs('#veliler-page');
    const okullarPage = qs('#okullar-page');
    const servisYoneticileriPage = qs('#servis-yoneticileri-page');
    const suruculerPage = qs('#suruculer-page');
    const misyonumuzPage = qs('#misyonumuz-page');
    const vizyonumuzPage = qs('#vizyonumuz-page');
    const bizKimizPage = qs('#biz-kimiz-page');
    const iletisimPage = qs('#iletisim-page');
    const allPages = [
        landingPageContent, velilerPage, okullarPage, servisYoneticileriPage,
        suruculerPage, misyonumuzPage, vizyonumuzPage, bizKimizPage, iletisimPage
    ];

    function hideAllPages() {
        allPages.forEach(page => { if (page) page.classList.add('is-hidden'); });
    }

    function showPage(pageToShow) {
        hideAllPages();
        if (pageToShow) {
            pageToShow.classList.remove('is-hidden');
            window.scrollTo(0, 0);
            qsa('.dropdown.open').forEach(dropdown => dropdown.classList.remove('open'));
            if (pageToShow.id === 'landing-page-content') {
                document.body.style.height = '100%';
                document.documentElement.style.height = '100%';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            } else {
                document.body.style.height = 'auto';
                document.documentElement.style.height = 'auto';
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
            }
        }
    }

    const navLinksAndPages = [
        { link: logoLink, page: landingPageContent },
        { link: velilerNavLink, page: velilerPage },
        { link: okullarNavLink, page: okullarPage },
        { link: servisYoneticileriNavLink, page: servisYoneticileriPage },
        { link: suruculerNavLink, page: suruculerPage },
        { link: misyonumuzNavLink, page: misyonumuzPage },
        { link: vizyonumuzNavLink, page: vizyonumuzPage },
        { link: bizKimizNavLink, page: bizKimizPage },
        { link: iletisimNavLink, page: iletisimPage }
    ];

    navLinksAndPages.forEach(({ link, page }) => {
        if (!link) return;
        on(link, 'click', (e) => {
            e.preventDefault();
            showPage(page);
        });
    });

    qsa('.dropdown > a').forEach(toggle => {
        on(toggle, 'click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = toggle.closest('.dropdown');
                if (dropdown) dropdown.classList.toggle('open');
            }
        });
    });
}


