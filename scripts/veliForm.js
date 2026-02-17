import { qs, on } from './utils/dom.js';

function setupVeliForm(formId, containerId) {
    const form = qs(`#${formId}`);
    const formContainer = qs(`#${containerId}`);
    if (!form || !formContainer) return;

    on(form, 'submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Gönderiliyor...';
            submitButton.setAttribute('disabled', 'true');
            const existingError = form.querySelector('.form-error-msg');
            if (existingError) existingError.remove();
        }

        const apiUrl = 'https://api.yoldayim.com/api/v1/form-submissions';

        const fullName = form.querySelector('input[name="full_name"]');
        const phone = form.querySelector('input[name="phone"]');
        const city = form.querySelector('input[name="city"]');
        const childSchool = form.querySelector('input[name="child_school"]');
        const referralSource = form.querySelector('input[name="acquisition_channel"]');

        const payload = {
            form_type: 'parent_pre_registration',
            acquisition_channel: referralSource?.value || 'organic_flyer_A5',
            fields: {
                full_name: fullName?.value || '',
                phone: phone?.value || '',
                city: city?.value || '',
                school_name: childSchool?.value || ''
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
                    // JSON parse hatasını yok say
                }
                const err = new Error(`HTTP ${response.status} ${response.statusText}${errorDetail ? ' - ' + errorDetail : ''}`);
                err.status = response.status;
                err.statusText = response.statusText;
                err.detail = errorDetail;
                throw err;
            }

            form.style.display = 'none';
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>Kaydınız Alındı!</h3><p>Teşekkürler! Okulunuz platforma dahil olduğunda sizi hemen bilgilendireceğiz.</p>' +
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
        } catch (error) {
            if (submitButton) {
                submitButton.textContent = 'Tekrar Dene';
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
            const uiMsg = (error && (error.message || error.detail))
                ? `Hata: ${error.message || error.detail}`
                : 'Formunuz gönderilemedi. Lütfen daha sonra tekrar deneyin.';
            errorEl.textContent = uiMsg;
            /* eslint-disable no-console */
            console.error('[VeliForm] Submit failed', { error });
            /* eslint-enable no-console */
        }
    });
}


async function loadProvincesForDatalist() {
    const datalist = document.getElementById('cities-datalist');
    if (!datalist) return;

    // API'den illeri çekmeyi dene
    try {
        const response = await fetch('https://turkiyeapi.dev/api/v1/provinces');
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();

        const sortedProvinces = data.data.sort((a, b) => a.name.localeCompare(b.name, 'tr'));

        datalist.innerHTML = '';
        sortedProvinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province.name;
            datalist.appendChild(option);
        });

    } catch (error) {
        // Fallback: Statik liste
        const provinces = [
            "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
            "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
            "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
            "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
            "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
            "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
            "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
            "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
        ];

        datalist.innerHTML = '';
        provinces.sort((a, b) => a.localeCompare(b, 'tr')).forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            datalist.appendChild(option);
        });
    }
}

export function initVeliForm() {
    // Veliler sayfasındaki form
    setupVeliForm('veliForm', 'veli-form-container');
    // Bağımsız /veli-on-kayit sayfasındaki form
    setupVeliForm('veliFormStandalone', 'veli-form-container-standalone');

    // İlleri datalist'e yükle
    loadProvincesForDatalist();

    // Referral tracking
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source') || 'organic_direct';
    const sourceInputs = document.querySelectorAll('input[name="acquisition_channel"]');
    sourceInputs.forEach(input => {
        input.value = source;
    });
}

