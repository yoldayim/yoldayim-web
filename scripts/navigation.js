import { qs, qsa, on } from './utils/dom.js';

// URL routing mapping
const routeMap = {
    '/': 'landing-page-content',
    '/gizlilik-politikasi': 'gizlilik-politikasi-page',
    '/kullanim-kosullari': 'kullanim-kosullari-page',
    '/veliler': 'veliler-page',
    '/veli-on-kayit': 'veli-on-kayit-page',
    '/okullar': 'okullar-page',
    '/servis-yoneticileri': 'servis-yoneticileri-page',
    '/suruculer': 'suruculer-page',
    '/misyonumuz': 'misyonumuz-page',
    '/vizyonumuz': 'vizyonumuz-page',
    '/biz-kimiz': 'biz-kimiz-page',
    '/iletisim': 'iletisim-page'
};

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
    const gizlilikPolitikasiNavLink = qs('#gizlilik-politikasi-nav-link');
    const kullanimKosullariNavLink = qs('#kullanim-kosullari-nav-link');
    const velilerPage = qs('#veliler-page');
    const veliOnKayitPage = qs('#veli-on-kayit-page');
    const okullarPage = qs('#okullar-page');
    const servisYoneticileriPage = qs('#servis-yoneticileri-page');
    const suruculerPage = qs('#suruculer-page');
    const misyonumuzPage = qs('#misyonumuz-page');
    const vizyonumuzPage = qs('#vizyonumuz-page');
    const bizKimizPage = qs('#biz-kimiz-page');
    const iletisimPage = qs('#iletisim-page');
    const gizlilikPolitikasiPage = qs('#gizlilik-politikasi-page');
    const kullanimKosullariPage = qs('#kullanim-kosullari-page');
    const allPages = [
        landingPageContent, velilerPage, veliOnKayitPage, okullarPage, servisYoneticileriPage,
        suruculerPage, misyonumuzPage, vizyonumuzPage, bizKimizPage, iletisimPage,
        gizlilikPolitikasiPage, kullanimKosullariPage
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

            // Gizlilik politikası, kullanım koşulları ve veli ön kayıt sayfaları için nav'ı gizle
            const minimalNavPageIds = ['gizlilik-politikasi-page', 'kullanim-kosullari-page', 'veli-on-kayit-page'];
            const logoLink = qs('#logo-link');
            if (minimalNavPageIds.includes(pageToShow.id)) {
                document.body.classList.add('legal-page-active');
                // Mobil menü açıksa kapat
                const nav = qs('nav');
                if (nav) {
                    nav.classList.remove('mobile-menu-open');
                }
                // Logo link'ini sadece legal sayfalar için devre dışı bırak
                const legalOnlyIds = ['gizlilik-politikasi-page', 'kullanim-kosullari-page'];
                if (legalOnlyIds.includes(pageToShow.id)) {
                    if (logoLink) {
                        logoLink.style.pointerEvents = 'none';
                        logoLink.style.cursor = 'default';
                    }
                } else {
                    if (logoLink) {
                        logoLink.style.pointerEvents = '';
                        logoLink.style.cursor = '';
                    }
                }
            } else {
                document.body.classList.remove('legal-page-active');
                // Logo link'ini tekrar aktif et
                if (logoLink) {
                    logoLink.style.pointerEvents = '';
                    logoLink.style.cursor = '';
                }
            }

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
        { link: iletisimNavLink, page: iletisimPage },
        { link: gizlilikPolitikasiNavLink, page: gizlilikPolitikasiPage },
        { link: kullanimKosullariNavLink, page: kullanimKosullariPage }
    ];

    navLinksAndPages.forEach(({ link, page }) => {
        if (!link) return;
        on(link, 'click', (e) => {
            // Gizlilik politikası ve kullanım koşulları sayfalarında logo'ya tıklamayı engelle
            if (link.id === 'logo-link' && document.body.classList.contains('legal-page-active')) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            e.preventDefault();

            // URL'i güncelle
            const path = Object.keys(routeMap).find(key => routeMap[key] === page.id);
            if (path && window.history && window.history.pushState) {
                window.history.pushState({ page: page.id }, '', path);
            }

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

    // URL routing - sayfa yüklendiğinde veya URL değiştiğinde
    function handleRoute() {
        const path = window.location.pathname;
        const pageId = routeMap[path];

        if (pageId) {
            const targetPage = qs(`#${pageId}`);
            if (targetPage) {
                showPage(targetPage);
                // URL'i güncelle (hash kullanmadan)
                if (window.history && window.history.pushState) {
                    window.history.replaceState({ page: pageId }, '', path);
                }
                return true;
            }
        }
        // Varsayılan olarak ana sayfayı göster (sadece root path için)
        if (path === '/' || path === '/index.html') {
            showPage(landingPageContent);
            return true;
        }
        return false;
    }

    // Route handling'i DOM hazır olduktan sonra yap
    // index.js'de DOMContentLoaded event'inde initNavigation çağrıldığı için
    // burada DOM zaten hazır olacak
    function initRoute() {
        // Kısa bir gecikme ile route'u kontrol et (DOM'un tamamen hazır olması için)
        setTimeout(() => {
            handleRoute();
        }, 0);
    }

    // İlk yüklemede route'u kontrol et
    initRoute();

    // Popstate event (geri/ileri butonları için)
    window.addEventListener('popstate', () => {
        setTimeout(() => {
            handleRoute();
        }, 0);
    });

    // Sayfa yüklendiğinde de tekrar kontrol et (güvenlik için)
    window.addEventListener('load', () => {
        setTimeout(() => {
            handleRoute();
        }, 0);
    });
}


