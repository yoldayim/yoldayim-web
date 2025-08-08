/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
const heroEl = document.querySelector('.hero');
// --- Hero Slider Logic ---
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
let currentHeroSlideIndex = 0;
const slideDuration = 5000; // 5 seconds, must match CSS animation
const heroTextWrapperEl = document.getElementById('heroTextWrapper');
const heroTitleEl = document.getElementById('heroTitle');
const heroDescriptionEl = document.getElementById('heroDescription');
const heroProgressSpans = document.querySelectorAll('#heroProgress span');
function showHeroSlide(index) {
    if (!heroTextWrapperEl || !heroTitleEl || !heroDescriptionEl || !heroProgressSpans.length || !heroEl) return;
    // Remove previous slide classes and add the current one for background changes
    heroEl.classList.remove('slide-0', 'slide-1', 'slide-2');
    heroEl.classList.add(`slide-${index}`);
    heroTextWrapperEl.style.opacity = '0';
    setTimeout(() => {
        heroTitleEl.textContent = heroSlides[index].title;
        heroDescriptionEl.textContent = heroSlides[index].description;
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
// --- Interactive Journey Logic ---
const journeyData = [
    {
        id: 'parent',
        nodeId: 'node-parent',
        pathPercentage: 0.08,
        title: 'Veliler İçin Gözünüz Arkada Kalmasın',
        description: 'Çocuğunuzun her an güvende olduğunu bilmenin huzurunu yaşayın. Gelişmiş takip sistemimiz ve anlık bildirimlerle, okul yolculuğunun her adımını kolayca izleyin.',
        features: [
            'Servis aracını harita üzerinde canlı takip etme',
            'Araç eve yaklaştığında otomatik bildirim alma',
            'Öğrencinin servise biniş ve iniş anlarından haberdar olma',
            'Sürücü veya okul ile anında iletişim kurma',
        ],
    },
    {
        id: 'service',
        nodeId: 'node-service',
        pathPercentage: 0.5,
        title: 'Servis Firmaları İçin Verimlilik ve Kontrol',
        description: 'Operasyonel maliyetlerinizi düşürürken hizmet kalitenizi artırın. Akıllı rota planlama ve filo yönetimi ile iş süreçlerinizi optimize edin.',
        features: [
            'Yakıt ve zaman tasarrufu sağlayan rota optimizasyonu',
            'Araç ve sürücü performansını tek panelden izleme',
            'Velilerle ve okullarla anlık, kolay iletişim',
            'Detaylı raporlama ile operasyonel verimliliği ölçme',
        ],
    },
    {
        id: 'school',
        nodeId: 'node-school',
        pathPercentage: 0.92,
        title: 'Okul Yönetimi İçin Tam Koordinasyon',
        description: 'Tüm servis operasyonunu tek bir ekrandan yöneterek idari yükü azaltın. Öğrenci güvenliğini en üst düzeyeye çıkarın ve veli memnuniyetini artırın.',
        features: [
            'Tüm servislerin anlık konumunu ve durumunu görüntüleme',
            'Öğrenci yoklama ve devamlılık takibini dijitalleştirme',
            'Acil durum ve duyuruları tüm paydaşlara anında iletme',
            'Veli, servis ve okul arasında şeffaf bir iletişim köprüsü kurma',
        ],
    }
];
let currentJourneyIndex = 0;
let currentBusPercentage = 0; // Tracks bus position as a percentage (0 to 1)
let isBusAnimating = false; // Prevents concurrent animations
const journeyPath = document.querySelector('#journey-path');
const journeyBus = document.getElementById('journey-bus');
const journeyNodes = document.querySelectorAll('.journey-node');
const journeyDetailsEl = document.getElementById('journey-details');
const journeyTitleEl = document.getElementById('journey-details-title');
const journeyDescEl = document.getElementById('journey-details-description');
const journeyListEl = document.getElementById('journey-details-list');
const journeyPrevBtn = document.getElementById('journeyPrevBtn');
const journeyNextBtn = document.getElementById('journeyNextBtn');
const journeyContentEl = document.querySelector('.journey-details-content');
/**
 * Animates the bus along the SVG path to a target percentage.
 */
function animateBus(targetPercentage) {
    if (!journeyPath || !journeyBus || isBusAnimating || journeyPath.getTotalLength() === 0) {
        return;
    }
    isBusAnimating = true;
    const startPercentage = currentBusPercentage;
    const duration = 1200; // ms
    const pathLength = journeyPath.getTotalLength();
    let startTime = null;
   
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    function frame(currentTime) {
        if (!isBusAnimating || !journeyPath || !journeyBus) {
            isBusAnimating = false;
            return;
        }
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        let progress = Math.min(elapsedTime / duration, 1);
        progress = easeInOutCubic(progress);
        const percentage = startPercentage + (targetPercentage - startPercentage) * progress;
        const point = journeyPath.getPointAtLength(pathLength * percentage);
       
        // Calculate rotation based on path direction
        const nextPoint = journeyPath.getPointAtLength(pathLength * Math.min(percentage + 0.001, 1));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
       
        journeyBus.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            currentBusPercentage = targetPercentage;
            isBusAnimating = false;
        }
    }
    requestAnimationFrame(frame);
}
/**
 * Updates the text content and node styles, then starts the bus animation.
 */
function updateJourneyDisplay(index, shouldAnimate) {
    if (!journeyTitleEl || !journeyDescEl || !journeyListEl || !journeyPath || !journeyBus || !journeyContentEl) return;
    const data = journeyData[index];
   
    // Update active node
    journeyNodes.forEach(n => n.classList.remove('active'));
    document.getElementById(data.nodeId)?.classList.add('active');
    // Fade out current content
    journeyContentEl.style.opacity = '0';
    // Update text content and fade in after a short delay
    setTimeout(() => {
        journeyTitleEl.textContent = data.title;
        journeyDescEl.textContent = data.description;
        journeyListEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        journeyContentEl.style.opacity = '1';
    }, 300); // Adjust timing to feel smooth with CSS transition
    if (shouldAnimate) {
        animateBus(data.pathPercentage);
    } else {
        // Instantly move bus without animation
        currentBusPercentage = data.pathPercentage;
        const pathLength = journeyPath.getTotalLength();
        if (pathLength > 0) {
            const point = journeyPath.getPointAtLength(pathLength * currentBusPercentage);
            const nextPoint = journeyPath.getPointAtLength(pathLength * Math.min(currentBusPercentage + 0.001, 1));
            const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
            journeyBus.style.transition = 'none'; // Disable transition for instant move
            journeyBus.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
            // Re-enable transitions (if any) after paint
            requestAnimationFrame(() => {
                if (journeyBus) journeyBus.style.transition = '';
            });
        }
    }
}
function setupJourneyNodesPositions() {
    if (!journeyPath || window.getComputedStyle(journeyPath).display === 'none') return;
    const pathLength = journeyPath.getTotalLength();
    if (pathLength === 0) return;
   
    journeyData.forEach(data => {
        const nodeEl = document.getElementById(data.nodeId);
        if (nodeEl) {
            const point = journeyPath.getPointAtLength(pathLength * data.pathPercentage);
            nodeEl.style.left = `${point.x}px`;
            nodeEl.style.top = `${point.y}px`;
        }
    });
}
/**
 * Sets up the scroll-snapping and progress indicator mechanism.
 */
function setupScrollMechanism() {
    const container = document.getElementById('landing-page-content');
    if (!container) return;
    // Sadece masaüstünde çalıştır
    if (window.innerWidth <= 992) {
        // Re-enable normal scroll for mobile
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        container.style.overflowY = 'auto';
        return;
    }
   
    const sections = Array.from(container.querySelectorAll('.scroll-section'));
    const finalSectionIndex = sections.length - 1;
    let mechanismActive = true;
    let currentSectionIndex = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    // Increase the required scroll amount for section changes so the
    // circular indicator fills up more slowly. Users now need to scroll
    // further before the next section activates.
    const scrollThreshold = 300; // Transition threshold (was 150)
    const scrollSensitivity = 20; // How much each wheel event adds
    const updateProgressCircle = () => {
        if (currentSectionIndex >= finalSectionIndex) return;
        const indicator = sections[currentSectionIndex].querySelector('.scroll-indicator');
        if (!indicator) return;
        const progressCircle = indicator.querySelector('.indicator-progress');
        if (!progressCircle) return;
       
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const progress = Math.max(0, Math.min(1, scrollAccumulator / scrollThreshold));
        const offset = circumference - progress * circumference;
        progressCircle.style.strokeDashoffset = String(offset);
    };
    const moveToSection = (newIndex) => {
        if (isAnimating) return;
        isAnimating = true;
        sections[newIndex].scrollIntoView({ behavior: 'smooth' });
        currentSectionIndex = newIndex;
        setTimeout(() => {
            isAnimating = false;
            scrollAccumulator = 0;
            if (currentSectionIndex === finalSectionIndex) {
                mechanismActive = false;
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
                container.style.overflowY = 'auto';
                sections.forEach(s => {
                    const ind = s.querySelector('.scroll-indicator');
                    if (ind) ind.style.display = 'none';
                });
            } else {
                updateProgressCircle();
            }
        }, 1000); // Animation duration
    };
    const handleWheel = (e) => {
        if (!mechanismActive || isAnimating) {
            if (mechanismActive) e.preventDefault();
            return;
        }
        e.preventDefault();
        const scrollDirection = Math.sign(e.deltaY);
        if (scrollDirection > 0) { // Scrolling Down
            scrollAccumulator += scrollSensitivity;
            if (scrollAccumulator >= scrollThreshold) {
                if (currentSectionIndex < finalSectionIndex) {
                    moveToSection(currentSectionIndex + 1);
                }
            }
        } else { // Scrolling Up
            scrollAccumulator -= scrollSensitivity;
            if (scrollAccumulator <= 0) {
                if (currentSectionIndex > 0) {
                    moveToSection(currentSectionIndex - 1);
                }
            }
        }
       
        scrollAccumulator = Math.max(0, Math.min(scrollThreshold, scrollAccumulator));
        updateProgressCircle();
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    sections.forEach((section, index) => {
        const indicator = section.querySelector('.scroll-indicator');
        if (indicator) {
            const progressCircle = indicator.querySelector('.indicator-progress');
            if (progressCircle) {
                const radius = progressCircle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
                progressCircle.style.strokeDashoffset = String(circumference);
            }
            if (index < finalSectionIndex) {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    moveToSection(index + 1);
                });
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const landingPageContent = document.getElementById('landing-page-content');
   
    // Scroll snapping mechanism setup
    if (landingPageContent) {
        setupScrollMechanism();
    }
    // Hero slider setup
    if (heroTextWrapperEl && heroProgressSpans.length > 0) {
        showHeroSlide(currentHeroSlideIndex);
        setInterval(nextHeroSlide, slideDuration);
    }
    // Mobile Navigation Accordion (for inside slide-out menu)
    document.querySelectorAll('.dropdown > a').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = toggle.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('open');
                }
            }
        });
    });
    // Interactive Journey Setup
    if (journeyPath && journeyBus) {
        const journeyVisual = document.querySelector('.journey-visual');
        const handleJourneyLayout = () => {
            if (!journeyPath || !journeyVisual) return;
           
            isBusAnimating = false;
            const isMobile = window.innerWidth <= 768;
            const wasMobile = journeyVisual.classList.contains('is-mobile');
            let pathChanged = false;
            if (isMobile && !wasMobile) {
                journeyVisual.classList.add('is-mobile');
                journeyPath.setAttribute('d', 'M 50 25 C -20 125, 120 225, 50 325');
                journeyPath.parentElement?.setAttribute('viewBox', '0 0 100 350');
                pathChanged = true;
            } else if (!isMobile && wasMobile) {
                journeyVisual.classList.remove('is-mobile');
                journeyPath.setAttribute('d', 'M 50 50 C 200 100, 300 0, 400 50 S 600 100, 750 50');
                journeyPath.parentElement?.setAttribute('viewBox', '0 0 800 100');
                pathChanged = true;
            }
            const updatePositions = () => {
                requestAnimationFrame(() => {
                    if (journeyPath.getTotalLength() === 0) {
                        setTimeout(() => requestAnimationFrame(updatePositions), 50);
                    } else {
                        setupJourneyNodesPositions();
                        updateJourneyDisplay(currentJourneyIndex, false);
                    }
                });
            };
            if (pathChanged) {
                // After changing path, it needs a moment to update total length
                setTimeout(updatePositions, 50);
            } else {
                updatePositions();
            }
        };
        const initializeJourney = () => {
            // Initial layout calculation
            handleJourneyLayout();
        };
        initializeJourney();
        journeyNextBtn?.addEventListener('click', () => {
            if (isBusAnimating) return;
            currentJourneyIndex = (currentJourneyIndex + 1) % journeyData.length;
            updateJourneyDisplay(currentJourneyIndex, true);
        });
        journeyPrevBtn?.addEventListener('click', () => {
            if (isBusAnimating) return;
            currentJourneyIndex = (currentJourneyIndex - 1 + journeyData.length) % journeyData.length;
            updateJourneyDisplay(currentJourneyIndex, true);
        });
        journeyNodes.forEach((node, index) => {
            node.addEventListener('click', () => {
                if (isBusAnimating || currentJourneyIndex === index) return;
                currentJourneyIndex = index;
                updateJourneyDisplay(currentJourneyIndex, true);
            });
        });
        // Reposition on window resize
        window.addEventListener('resize', handleJourneyLayout);
    }
    // Newsletter Form Logic
    const showNewsletterFormBtn = document.getElementById('showNewsletterFormBtn');
    const newsletterContainer = document.getElementById('newsletter-container');
    const newsletterForm = document.getElementById('newsletterForm');
    if (showNewsletterFormBtn && newsletterContainer && newsletterForm) {
        showNewsletterFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            newsletterContainer.classList.add('form-active');
        });
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
           
            const form = e.target;
            const emailInput = form.querySelector('input[name="email"]');
            const messageInput = form.querySelector('textarea[name="message"]');
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Gönderiliyor...';
                submitButton.setAttribute('disabled', 'true');
                const existingError = form.querySelector('.form-error');
                if (existingError) existingError.remove();
            }
            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: emailInput.value,
                        message: messageInput.value,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
               
                if (newsletterContainer) {
                    newsletterContainer.innerHTML = `<p style="font-size: 1.2rem; color: white; transition: opacity 0.5s ease;">Teşekkürler! Gelişmelerden sizi haberdar edeceğiz.</p>`;
                }
            } catch (error) {
                console.error('Newsletter form error:', error);
                if (submitButton) {
                    submitButton.textContent = 'Tekrar Gönder';
                    submitButton.removeAttribute('disabled');
                }
                let errorEl = form.querySelector('.form-error');
                if (!errorEl) {
                    errorEl = document.createElement('p');
                    errorEl.className = 'form-error';
                    errorEl.style.color = 'white';
                    errorEl.style.marginTop = '1rem';
                    errorEl.style.textAlign = 'center';
                    form.appendChild(errorEl);
                }
                errorEl.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            }
        });
    }
    // --- Page Navigation Logic ---
    const logoLink = document.getElementById('logo-link');
    const velilerNavLink = document.getElementById('veliler-nav-link');
    const okullarNavLink = document.getElementById('okullar-nav-link');
    const servisYoneticileriNavLink = document.getElementById('servis-yoneticileri-nav-link');
    const suruculerNavLink = document.getElementById('suruculer-nav-link');
    const misyonumuzNavLink = document.getElementById('misyonumuz-nav-link');
    const vizyonumuzNavLink = document.getElementById('vizyonumuz-nav-link');
    const bizKimizNavLink = document.getElementById('biz-kimiz-nav-link');
    const iletisimNavLink = document.getElementById('iletisim-nav-link');
    const velilerPage = document.getElementById('veliler-page');
    const okullarPage = document.getElementById('okullar-page');
    const servisYoneticileriPage = document.getElementById('servis-yoneticileri-page');
    const suruculerPage = document.getElementById('suruculer-page');
    const misyonumuzPage = document.getElementById('misyonumuz-page');
    const vizyonumuzPage = document.getElementById('vizyonumuz-page');
    const bizKimizPage = document.getElementById('biz-kimiz-page');
    const iletisimPage = document.getElementById('iletisim-page');
    const allPages = [
        landingPageContent, velilerPage, okullarPage, servisYoneticileriPage,
        suruculerPage, misyonumuzPage, vizyonumuzPage, bizKimizPage, iletisimPage
    ];
    const hideAllPages = () => {
        allPages.forEach(page => {
            if (page) page.style.display = 'none';
        });
    };
   
    const showPage = (pageToShow) => {
        hideAllPages();
        if (pageToShow) {
            pageToShow.style.display = 'block';
            window.scrollTo(0, 0);
   
            // Close mobile dropdown menu if it's open
            document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
   
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
    };
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
        link?.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(page);
        });
    });
    // --- Demo Request Button Logic ---
    const demoRequestButtons = document.querySelectorAll('.request-demo-btn');
    demoRequestButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(iletisimPage);
           
            const form = document.getElementById('contactForm');
            const formContainer = form?.parentElement;
           
            if (form && formContainer) {
                const successMessage = formContainer.querySelector('.form-success-message');
                if (successMessage) {
                    successMessage.remove();
                }
                form.style.display = 'flex';
                form.reset();
               
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.textContent = 'Gönder';
                    submitButton.removeAttribute('disabled');
                }
                const errorMsg = form.querySelector('.form-error-msg');
                if (errorMsg) errorMsg.remove();
                const subjectInput = form.querySelector('input[name="subject"]');
                if (subjectInput) {
                    subjectInput.value = 'Demo Talebi';
                    subjectInput.focus();
                }
            }
        });
    });
    // --- Contact Page Form Logic ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const formContainer = form.parentElement;
            if (submitButton) {
                submitButton.textContent = 'Gönderiliyor...';
                submitButton.setAttribute('disabled', 'true');
                const existingError = form.querySelector('.form-error-msg');
                if (existingError) existingError.remove();
            }
            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const subjectInput = form.querySelector('input[name="subject"]');
            const messageInput = form.querySelector('textarea[name="message"]');
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: nameInput.value,
                        email: emailInput.value,
                        subject: subjectInput.value,
                        message: messageInput.value,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (formContainer) {
                    form.style.display = 'none';
                   
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>Teşekkürler!</h3><p>Mesajınız bize ulaştı. En kısa sürede geri dönüş yapacağız.</p></div>`;
                    formContainer.appendChild(successMessage);
                }
            } catch (error) {
                console.error('Contact form submission error:', error);
                if (submitButton) {
                    submitButton.textContent = 'Tekrar Gönder';
                    submitButton.removeAttribute('disabled');
                }
                let errorEl = form.querySelector('.form-error-msg');
                if (!errorEl) {
                    errorEl = document.createElement('p');
                    errorEl.className = 'form-error-msg';
                    errorEl.style.color = '#D32F2F'; // A red color
                    errorEl.style.textAlign = 'center';
                    errorEl.style.marginTop = '1rem';
                    form.appendChild(errorEl);
                }
                errorEl.textContent = 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.';
            }
        });
    }
    // --- Veliler Page Accordion Logic ---
    const accordionItems = document.querySelectorAll('#veliler-page .accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    // Close all items
                    accordionItems.forEach(i => {
                        i.classList.remove('active');
                        i.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
                    });
                   
                    // If the clicked item was not active, open it.
                    if (!wasActive) {
                        item.classList.add('active');
                        header.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
    }
    // --- Testimonials Slider Logic (Veliler Page) ---
    const testimonialContainer = document.querySelector('.testimonial-slider-container');
    if (testimonialContainer) {
        const track = testimonialContainer.querySelector('.testimonial-track');
        const cards = Array.from(testimonialContainer.querySelectorAll('.testimonial-card'));
        const nextButton = testimonialContainer.querySelector('.testimonial-arrow.next');
        const prevButton = testimonialContainer.querySelector('.testimonial-arrow.prev');
        const dotsNav = testimonialContainer.querySelector('.testimonial-dots');
        if (track && cards.length > 0 && nextButton && prevButton && dotsNav) {
            let currentIndex = 0;
            let autoplayInterval;
            // Create dots
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                dot.setAttribute('aria-label', `Yorum ${index + 1}`);
                dotsNav.appendChild(dot);
                dot.addEventListener('click', () => {
                    moveToSlide(index);
                    resetAutoplay();
                });
            });
            const dots = Array.from(dotsNav.querySelectorAll('.testimonial-dot'));
            const moveToSlide = (slideIndex) => {
                track.style.transform = `translateX(-${slideIndex * 100}%)`;
                currentIndex = slideIndex;
                updateControls();
            };
            const updateControls = () => {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[currentIndex]) {
                    dots[currentIndex].classList.add('active');
                }
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex === cards.length - 1;
            };
           
            const startAutoplay = () => {
                stopAutoplay();
                autoplayInterval = window.setInterval(() => {
                    const nextIndex = (currentIndex + 1) % cards.length;
                    moveToSlide(nextIndex);
                }, 5000);
            };
            const stopAutoplay = () => {
                clearInterval(autoplayInterval);
            };
            const resetAutoplay = () => {
                stopAutoplay();
                startAutoplay();
            };
            nextButton.addEventListener('click', () => {
                if (currentIndex < cards.length - 1) {
                    moveToSlide(currentIndex + 1);
                    resetAutoplay();
                }
            });
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    moveToSlide(currentIndex - 1);
                    resetAutoplay();
                }
            });
           
            testimonialContainer.addEventListener('mouseenter', stopAutoplay);
            testimonialContainer.addEventListener('mouseleave', startAutoplay);
            moveToSlide(0);
           
            const velilerPageObserver = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.attributeName === 'style') {
                        const targetElement = mutation.target;
                        if (targetElement.style.display === 'block') {
                            startAutoplay();
                        } else {
                            stopAutoplay();
                        }
                    }
                }
            });
           
            if (velilerPage) {
                velilerPageObserver.observe(velilerPage, { attributes: true });
                if (velilerPage.style.display !== 'none' && window.getComputedStyle(velilerPage).display !== 'none') {
                    startAutoplay();
                }
            } else {
                startAutoplay();
            }
        }
    }
    // --- Sub-Page Tab Logic ---
    const pagesWithTabs = ['#okullar-page', '#servis-yoneticileri-page', '#suruculer-page'];
    pagesWithTabs.forEach(pageSelector => {
        const pageElement = document.querySelector(pageSelector);
        if (pageElement) {
            const tabButtons = pageElement.querySelectorAll('.feature-tab-button');
            const tabPanes = pageElement.querySelectorAll('.feature-tab-pane');
            if (tabButtons.length > 0 && tabPanes.length > 0) {
                tabButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const tabId = button.getAttribute('data-tab');
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        tabPanes.forEach(pane => {
                            pane.classList.toggle('active', pane.getAttribute('data-tab') === tabId);
                        });
                    });
                });
            }
        }
    });
    // --- FAQ Accordion Logic (works for all pages) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            if (questionButton) {
                questionButton.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    item.classList.toggle('active');
                    questionButton.setAttribute('aria-expanded', String(!wasActive));
                });
            }
        });
    }

    // --- Mobile Menu Toggle Logic ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinksContainer = document.querySelector('.nav-links-container');

    if (mobileMenuToggle && nav && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpened = nav.classList.toggle('mobile-menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpened);
            document.body.classList.toggle('no-scroll', isOpened);
        });
        const closeMenu = () => {
            nav.classList.remove('mobile-menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        };

        // Close menu when a link or relevant button is clicked
        navLinksContainer.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                const isDropdownToggle = link.parentElement?.classList.contains('dropdown') && window.innerWidth <= 992;
                if (!isDropdownToggle) {
                    closeMenu();
                }
            } else if (e.target.classList.contains('demo-button')) {
                closeMenu();
            }
        });
    }
});
