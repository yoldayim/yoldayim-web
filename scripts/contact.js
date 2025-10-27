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

            // Formspree configuration - hardcoded for immediate functionality
            const formspreeAction = 'https://formspree.io/f/xzzjroor';
            const formspreeMethod = 'POST';

            // Build form data from existing fields in the HTML form
            const formData = new FormData();
            const company = form.querySelector('input[name="company"]');
            const address = form.querySelector('input[name="address"]');
            const contactPerson = form.querySelector('input[name="contact_person"]');
            const email = form.querySelector('input[name="email"]');
            const phone = form.querySelector('input[name="phone"]');
            const fleetSize = form.querySelector('select[name="fleet_size"]');
            const message = form.querySelector('textarea[name="message"]');

            if (company) formData.append('company', company.value);
            if (address) formData.append('address', address.value);
            if (contactPerson) formData.append('contact_person', contactPerson.value);
            if (email) formData.append('email', email.value);
            if (phone) formData.append('phone', phone.value);
            if (fleetSize) formData.append('fleet_size', fleetSize.value);
            if (message) formData.append('message', message.value);

            // Helpful subject for Formspree dashboard/email
            formData.append('_subject', 'Yoldayım - Demo Talebi');

            try {

                const response = await fetch(formspreeAction, {
                    method: formspreeMethod,
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                if (!response.ok) {
                    let errorDetail = '';
                    try {
                        const data = await response.json();
                        errorDetail = data?.error || JSON.stringify(data);
                    } catch (_) {
                        // ignore JSON parse errors
                    }
                    const err = new Error(`HTTP ${response.status} ${response.statusText}${errorDetail ? ' - ' + errorDetail : ''}`);
                    // Attach extra info for logging/UX
                    err.status = response.status;
                    err.statusText = response.statusText;
                    err.detail = errorDetail;
                    throw err;
                }

                if (formContainer) {
                    form.style.display = 'none';
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>Teşekkürler!</h3><p>Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>';
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
                const uiMsg = (error && (error.message || error.detail)) ? `Hata: ${error.message || error.detail}` : 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.';
                errorEl.textContent = uiMsg;
                // Detailed console logging for debugging
                /* eslint-disable no-console */
                console.error('[ContactForm] Submit failed', {
                    error,
                    action: formspreeAction,
                    method: formspreeMethod
                });
                /* eslint-enable no-console */
            }
        });
    }
}


