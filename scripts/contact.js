import { qs, on } from './utils/dom.js';

export function initContact() {
    const iletisimPage = qs('#iletisim-page');
    if (!iletisimPage) return;
    const demoRequestButtons = document.querySelectorAll('.request-demo-btn');
    const form = qs('#contactForm');
    const formContainer = form?.parentElement;

    demoRequestButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!iletisimPage) return;
            iletisimPage.style.display = 'block';
            window.scrollTo(0, 0);
            if (form && formContainer) {
                const successMessage = formContainer.querySelector('.form-success-message');
                if (successMessage) successMessage.remove();
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

    if (form) {
        on(form, 'submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
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
                        name: nameInput?.value,
                        email: emailInput?.value,
                        subject: subjectInput?.value,
                        message: messageInput?.value,
                    }),
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                if (formContainer) {
                    form.style.display = 'none';
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>Teşekkürler!</h3><p>Mesajınız bize ulaştı. En kısa sürede geri dönüş yapacağız.</p>';
                    formContainer.appendChild(successMessage);
                }
            } catch (error) {
                if (submitButton) {
                    submitButton.textContent = 'Tekrar Gönder';
                    submitButton.removeAttribute('disabled');
                }
                let errorEl = form.querySelector('.form-error-msg');
                if (!errorEl) {
                    errorEl = document.createElement('p');
                    errorEl.className = 'form-error-msg';
                    errorEl.style.color = '#D32F2F';
                    errorEl.style.textAlign = 'center';
                    errorEl.style.marginTop = '1rem';
                    form.appendChild(errorEl);
                }
                errorEl.textContent = 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.';
            }
        });
    }
}


