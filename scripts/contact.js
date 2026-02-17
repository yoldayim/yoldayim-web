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
                successMessage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>Teşekkürler!</h3><p>Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>' +
                    '<div class="app-download-section" style="margin-top: 2rem;">' +
                    '<h3>Mobil Uygulamamızı Şimdi İndirin</h3>' +
                    '<div class="app-buttons">' +
                    '<a href="https://apps.apple.com/tr/app/yolday%C4%B1m/id6752389411?l=tr" target="_blank" rel="noopener noreferrer" class="app-store-btn" aria-label="App Store\'dan İndir">' +
                    '<svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor">' +
                    '<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>' +
                    '</svg>' +
                    '<div class="btn-text">' +
                    '<span class="small-text">App Store\'dan</span>' +
                    '<span class="big-text">İndirin</span>' +
                    '</div>' +
                    '</a>' +
                    '<a href="https://play.google.com/store/apps/details?id=com.yoldayim.app&hl=tr" target="_blank" rel="noopener noreferrer" class="google-play-btn" aria-label="Google Play\'den İndir">' +
                    '<svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor">' +
                    '<path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>' +
                    '</svg>' +
                    '<div class="btn-text">' +
                    '<span class="small-text">Google Play\'den</span>' +
                    '<span class="big-text">İndirin</span>' +
                    '</div>' +
                    '</a>' +
                    '</div>' +
                    '</div>';
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


