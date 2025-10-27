export function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    if (items.length === 0) return;
    items.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        if (!questionButton) return;
        questionButton.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            item.classList.toggle('active');
            questionButton.setAttribute('aria-expanded', String(!wasActive));
        });
    });
}


