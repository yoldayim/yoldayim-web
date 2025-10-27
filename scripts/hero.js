import { qs, qsa, setText } from './utils/dom.js';

export function initHero() {
    const heroEl = qs('.hero');
    const heroSlides = [
        {
            title: 'Aileleri ve Servisleri Güvenle Buluşturuyoruz.',
            description: 'Velileri, servis firmalarını ve okulları tek çatı altında buluşturan yeni nesil platform: Anlık rota takibi ve akıllı zamanlama ile daha güvenli ve verimli yolculuklar.'
        },
        {
            title: 'Okul Yönetimi İçin Tam Kontrol.',
            description: 'Servis operasyonlarınızı tek bir panelden yönetin, raporlar alın ve velilerle anında iletişim kurun. Verimliliği ve güvenliği en üst düzeye çıkarın.'
        },
        {
            title: 'Veliler İçin Gözünüz Arkada Kalmasın.',
            description: 'Çocuğunuzun servise bindiği andan indiği ana kadar tüm süreci anlık bildirimlerle takip edin. Huzurlu bir gün geçirin.'
        }
    ];
    const slideDuration = 5000;
    let currentHeroSlideIndex = 0;
    const heroTextWrapperEl = qs('#heroTextWrapper');
    const heroTitleEl = qs('#heroTitle');
    const heroDescriptionEl = qs('#heroDescription');
    const heroProgressSpans = qsa('#heroProgress span');

    function showHeroSlide(index) {
        if (!heroTextWrapperEl || !heroTitleEl || !heroDescriptionEl || heroProgressSpans.length === 0 || !heroEl) return;
        heroEl.classList.remove('slide-0', 'slide-1', 'slide-2');
        heroEl.classList.add(`slide-${index}`);
        heroTextWrapperEl.style.opacity = '0';
        setTimeout(() => {
            setText(heroTitleEl, heroSlides[index].title);
            setText(heroDescriptionEl, heroSlides[index].description);
            heroTextWrapperEl.style.opacity = '1';
        }, 300);
        heroProgressSpans.forEach(span => span.classList.remove('active'));
        if (heroProgressSpans[index]) {
            heroProgressSpans[index].classList.add('active');
        }
    }

    function nextHeroSlide() {
        currentHeroSlideIndex = (currentHeroSlideIndex + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlideIndex);
    }

    if (heroTextWrapperEl && heroProgressSpans.length > 0) {
        showHeroSlide(currentHeroSlideIndex);
        setInterval(nextHeroSlide, slideDuration);
    }
}


