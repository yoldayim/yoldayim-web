export function initTestimonials() {
    const container = document.querySelector('.testimonial-slider-container');
    if (!container) return;
    const track = container.querySelector('.testimonial-track');
    const cards = Array.from(container.querySelectorAll('.testimonial-card'));
    const nextButton = container.querySelector('.testimonial-arrow.next');
    const prevButton = container.querySelector('.testimonial-arrow.prev');
    const dotsNav = container.querySelector('.testimonial-dots');
    if (!track || cards.length === 0 || !nextButton || !prevButton || !dotsNav) return;

    let currentIndex = 0;
    let autoplayInterval;

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
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
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
    const stopAutoplay = () => { clearInterval(autoplayInterval); };
    const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

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

    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
    moveToSlide(0);

    const velilerPage = document.getElementById('veliler-page');
    if (velilerPage) {
        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    const isHidden = velilerPage.classList.contains('is-hidden');
                    if (!isHidden) startAutoplay(); else stopAutoplay();
                }
            }
        });
        observer.observe(velilerPage, { attributes: true });
        const isHidden = velilerPage.classList.contains('is-hidden');
        if (!isHidden) startAutoplay();
    } else {
        startAutoplay();
    }
}


