import { qs, on } from './utils/dom.js';

export function initNewsletter() {
    const showBtn = qs('#showNewsletterFormBtn');
    const container = qs('#newsletter-container');
    const form = qs('#newsletterForm');
    if (!showBtn || !container || !form) return;

    on(showBtn, 'click', (e) => {
        e.preventDefault();
        container.classList.add('form-active');
    });

    on(form, 'submit', async (e) => {
        e.preventDefault();
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
                body: JSON.stringify({ email: emailInput.value, message: messageInput.value })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            container.innerHTML = '<p style="font-size: 1.2rem; color: white; transition: opacity 0.5s ease;">Teşekkürler! Gelişmelerden sizi haberdar edeceğiz.</p>';
        } catch (error) {
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


