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

        const formspreeAction = 'https://formspree.io/f/xojnevdp';

        const formData = new FormData();
        const fullName = form.querySelector('input[name="full_name"]');
        const phone = form.querySelector('input[name="phone"]');
        const city = form.querySelector('input[name="city"]');
        if (fullName) formData.append('full_name', fullName.value);
        if (phone) formData.append('phone', phone.value);
        if (city) formData.append('city', city.value);

        formData.append('_subject', 'Yoldayım - Veli Ön Kayıt');

        try {
            const response = await fetch(formspreeAction, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
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
            successMessage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>Kaydınız Alındı!</h3><p>Teşekkürler! Okulunuz platforma dahil olduğunda sizi hemen bilgilendireceğiz.</p>';
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
}

