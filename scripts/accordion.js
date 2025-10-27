export function initVelilerAccordion() {
    const accordionItems = document.querySelectorAll('#veliler-page .accordion-item');
    if (accordionItems.length === 0) return;
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;
        header.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
            });
            if (!wasActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}


