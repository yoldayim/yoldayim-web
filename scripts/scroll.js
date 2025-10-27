import { qs, qsa, on } from './utils/dom.js';

export function initScroll() {
    const container = qs('#landing-page-content');
    if (!container) return;
    if (window.innerWidth <= 992) {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        container.style.overflowY = 'auto';
        return;
    }

    const sections = qsa('.scroll-section', container);
    const finalSectionIndex = sections.length - 1;
    let mechanismActive = true;
    let currentSectionIndex = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    const scrollThreshold = 300;
    const scrollSensitivity = 20;

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
        }, 1000);
    };

    const handleWheel = (e) => {
        if (!mechanismActive || isAnimating) {
            if (mechanismActive) e.preventDefault();
            return;
        }
        e.preventDefault();
        const scrollDirection = Math.sign(e.deltaY);
        if (scrollDirection > 0) {
            scrollAccumulator += scrollSensitivity;
            if (scrollAccumulator >= scrollThreshold) {
                if (currentSectionIndex < finalSectionIndex) {
                    moveToSection(currentSectionIndex + 1);
                }
            }
        } else {
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

    on(container, 'wheel', handleWheel, { passive: false });
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
                on(indicator, 'click', (e) => {
                    e.preventDefault();
                    moveToSection(index + 1);
                });
            }
        }
    });
}


