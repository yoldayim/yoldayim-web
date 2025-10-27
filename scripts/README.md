# scripts/ Modül Yapısı

Bu klasör, uygulamanın istemci tarafı etkileşimlerini sorumluluklarına göre ayrılmış modüller halinde barındırır. Giriş noktası `index.js` olup tüm modülleri başlatır.

## Giriş Noktası
- `index.js`: Uygulama bootstrap dosyası. Tüm modülleri import eder ve `DOMContentLoaded` sonrasında sırasıyla başlatır. Her modül Single Responsibility prensibiyle kendi alanından sorumludur.

## Çekirdek Yardımcılar
- `utils/dom.js`: Sık kullanılan DOM yardımcıları.
  - `qs`, `qsa`: Seçiciler için kısa yollar
  - `on`: Event binding yardımcı fonksiyonu (unsubscribe döner)
  - `createEl`, `setText`: Basit element ve metin yardımcıları

## Özellik Modülleri
- `hero.js`: Ana sayfa hero slayt yazıları ve arka plan efekt geçişleri. Zamanlayıcı ile periyodik slayt değişimi yapar.
- `scroll.js`: Landing için bölüm bazlı smooth geçiş ve ilerleme göstergesi (masaüstü). Mobilde devre dışı bırakır.
- `journey.js`: “Herkes için Kusursuz Yolculuk” SVG yol animasyonu, düğüm (node) seçimi ve içerik güncelleme.
- `navigation.js`: Sayfa-içi gezinme (landing ve alt sayfalar arası göster/gizle) ve mobilde dropdown akordeon davranışı.
- `newsletter.js`: Haber bülteni formunun açılıp kapanması ve `/api/newsletter` POST işlemi.
- `contact.js`: İletişim formu ve “Demo Talep” butonlarının davranışı, `/api/contact` POST, başarı/ hata durumları.
- `accordion.js`: Veliler sayfasındaki özellik akordeonunu yönetir (tek açık öğe davranışı).
- `testimonials.js`: Veliler referans kaydırıcısı, nokta/ok kontrolü ve otomatik oynatma.
- `tabs.js`: Okullar, Servis Yöneticileri ve Sürücüler sayfalarındaki sekme (tab) içerik geçişleri.
- `faq.js`: Tüm sayfalarda SSS akordeonu (çoklu açık/kapalı durum destekli).
- `mobileMenu.js`: Mobil kayar menü aç/kapat ve tıklama ile kapanma davranışı.

## Yükleme Sırası ve Bağımlılıklar
- `index.js` önce çekirdek davranışları başlatır: `scroll`, `hero`, ardından sayfa/komponent modülleri.
- Modüller arası doğrudan bağımlılık yoktur; ortak yardımcılar yalnızca `utils/dom.js` içerisindedir.

## Genişletme/Rehber
- Yeni bir etkileşim eklerken modülünüzü ayrı bir dosyada tanımlayın ve sadece kendi DOM alanından sorumlu yapın.
- `index.js` içine `initX()` fonksiyonunuzu ekleyerek bootstrap’e dahil edin.
- DOM seçicilerini modülün içinde lokal tutun; global state paylaşmayın.
