import { qs, on } from './utils/dom.js';



function setupForm(formId) {
    const form = qs(`#${formId}`);
    if (!form) return;
    const formContainer = form.parentElement;

    on(form, 'submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Gönderiliyor...';
            submitButton.setAttribute('disabled', 'true');
            const existingError = form.querySelector('.form-error-msg');
            if (existingError) existingError.remove();
        }

        // API configuration
        const apiUrl = 'https://api.yoldayim.com/api/v1/form-submissions';

        // Prepare data payload
        const company = form.querySelector('input[name="company"]');
        const address = form.querySelector('input[name="address"]');
        const contactPerson = form.querySelector('input[name="contact_person"]');
        const email = form.querySelector('input[name="email"]');
        const phone = form.querySelector('input[name="phone"]');
        const fleetSize = form.querySelector('select[name="fleet_size"]');
        const message = form.querySelector('textarea[name="message"]');
        const referralSource = form.querySelector('input[name="acquisition_channel"]');

        const payload = {
            form_type: 'demo_request',
            acquisition_channel: referralSource?.value || 'offline_flyer_A5',
            fields: {
                company_name: company?.value || '',
                address: address?.value || '',
                contact_name: contactPerson?.value || '',
                contact_phone: phone?.value || '',
                contact_email: email?.value || '',
                fleet_size: fleetSize?.value || '',
                message: message?.value || ''
            }
        };

        try {

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
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
                action: apiUrl,
                method: 'POST'
            });
            /* eslint-enable no-console */
        }
    });
}

export function initContact() {
    const iletisimPage = qs('#iletisim-page');
    const demoRequestButtons = document.querySelectorAll('.request-demo-btn');
    const form = qs('#contactForm');
    const formContainer = form?.parentElement;

    if (iletisimPage) {
        demoRequestButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                iletisimPage.style.display = 'block';
                if (window.location.pathname !== '/iletisim') {
                    if (window.history.pushState) {
                        window.history.pushState({ page: 'iletisim-page' }, '', '/iletisim');
                        window.dispatchEvent(new Event('popstate'));
                    }
                }

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
                    }
                }
            });
        });
    }

    // Initialize forms
    setupForm('contactForm');
    setupForm('demoTalepForm');

    // Referral tracking
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source') || 'offline_flyer_A5';
    const sourceInputs = document.querySelectorAll('input[name="acquisition_channel"]');
    sourceInputs.forEach(input => {
        input.value = source;
    });
}


