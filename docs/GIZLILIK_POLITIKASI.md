**YOLDAYIM GİZLİLİK POLİTİKASI**

**Son Güncelleme:** 2025 Kasım

## 1. GENEL BİLGİLER

Bu Gizlilik Politikası, Yoldayım servis uygulaması ("Uygulama") kapsamında toplanan kişisel verilerin işlenmesi hakkında bilgi vermek amacıyla hazırlanmıştır. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat hükümlerine uygun olarak hazırlanmıştır.

**Veri Sorumlusu:** Yoldayım Teknoloji
**İletişim:** [info@yoldayim.com](mailto:info@yoldayim.com) | +90 546 733 23 39

## 2. TOPLANAN KİŞİSEL VERİLER

### 2.1 Kimlik ve İletişim Bilgileri

- Ad ve soyad
- Telefon numarası
- E-posta adresi
- Adres bilgileri
- Öğrenci için öğrencinin alım adresi

### 2.2 Cihaz ve Teknik Bilgiler

- Anlık bildirim (push notification) için kullanılan cihaz kimliği (token)
- Kullanıcıyı tanımlamak için e-posta adresi ve telefon numarası
- Cihaz türü (iOS, Android, Web)
- Cihaz son görülme tarihi

### 2.3 Servis ve Konum Bilgileri

- Öğrenci bilgileri (ad, soyad, cinsiyet, adres)
- Okul bilgileri ve konumu
- Rota ve güzergah bilgileri
- Servis geçmişi ve katılım durumu
- Servis tercihleri (Servis kullanmama durumları, süreleri ve nedenleri)
- Şoför cihazından gelen GPS konumları (enlem, boylam, zaman damgası)
- Duraklara tahmini varış süreleri (ETA) ve bildirim durumları (10 dakika uyarıları)

### 2.4 Kullanım Tercihleri

- Bildirim tercihleri (aktif/pasif durumu)
- Rol bazlı bildirim türü tercihleri

## 3. VERİ İŞLEME AMAÇLARI

Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:

### 3.1 Temel Hizmet Sunumu

- Servis rezervasyonu ve yönetimi
- Rota planlama ve optimizasyonu
- Öğrenci-şoför eşleştirmesi
- Servis takibi ve raporlama

### 3.2 İletişim ve Bildirim

- Servis durumu bildirimleri (başladı, tamamlandı, gecikti)
- Öğrenci durumu bildirimleri (alındı, okula vardı, eve vardı)
- Şoför hatırlatma bildirimleri (1 saat, 10 dakika öncesi)
- Operasyonel bildirimler (şoför başlamadı, servis iptal, servis yaklaştı)
- Sistem güncellemeleri
- Pazarlama mesajları (açık rıza ile)

### 3.3 Güvenlik ve Yasal Yükümlülükler

- Güvenlik kontrolleri
- Yasal yükümlülüklerin yerine getirilmesi
- İtiraz ve şikayet süreçlerinin yönetimi

## 4. VERİ PAYLAŞIMI

### 4.1 Üçüncü Taraf Servisler

Hizmetin sağlanabilmesi için kişisel verileriniz, işin gerektirdiği ölçüde aşağıdaki üçüncü taraf servis sağlayıcılarla paylaşılmaktadır:

- **Anlık Bildirim (Push Notification) Servis Sağlayıcısı:** Anlık bildirimlerin (servis başladı, öğrenci alındı vb.) gönderilebilmesi için cihaz token'ları, e-posta adresleri ve telefon numaraları.
- **İletişim Servis Sağlayıcıları (E-posta, SMS):** Sistem bildirimlerinin ve SMS mesajlarının gönderimi için telefon numaraları ve e-posta adresleri.
- **Veri Barındırma ve Altyapı Hizmet Sağlayıcıları:** Uygulamanın çalışması için gerekli olan tüm verilerin bulut sunucularda güvenli bir şekilde saklanması (hosting) ve veri tabanı yönetimi.
- **Google Maps Platform:** ETA (Tahmini Varış Süresi) hesaplaması için şoför konumu ve durak konumları (yalnızca koordinat bilgisi) işlenir ve Google’a gönderilir. Bu paylaşım sırasında kimlik bilgisi veya kişisel içerik paylaşılmaz.

### 4.2 Kullanıcı Panelleri Arasında Veri Paylaşımı

- **Parent Panel (Veli):** Sadece kendi çocuğunun bilgilerine erişim.
- **Driver Panel (Şoför):** Sadece atandığı rotadaki öğrencilerin bilgilerine erişim.
- **School Admin Panel (Okul Yöneticisi):** Sadece kendi okulunun öğrenci ve veli bilgilerine erişim.
- **Transport Company Admin Panel (Servis Şirketi):** Sadece kendi şirketinin şoför, araç ve müşteri bilgilerine erişim.
- **Super Admin Panel (Sistem Yöneticisi):** Sistem yönetimi için gerekli tüm verilere erişim.

### 4.3 Konum Verisine Erişim Yetkileri

Konum verisi erişimi, rol bazlı ve ilişki/scope kontrolleri ile sınırlandırılmıştır:

- **Parent (Veli)**: Sadece kendi öğrencisinin aktif seferindeki şoförün anlık konumunu görebilir. Konum geçmişine erişimi yoktur.
- **Driver (Şoför)**: Sadece kendi sürücü kaydına ait anlık konumu görebilir. Konum geçmişine erişimi yoktur.
- **School Admin (Okul Yöneticisi)**: Sadece kendi okuluna ait bugünün aktif seferlerindeki şoförlerin anlık konumunu görebilir. Konum geçmişine erişimi yoktur.
- **Transport Company Admin / Company Admin**: Sadece kendi şirketine ait şoförlerin anlık konumunu ve konum geçmişini görebilir.
- **Super Admin**: Sistem yönetimi kapsamında gerekli durumlarda erişebilir.

Not: Erişim, kimlik doğrulama, yetkilendirme (izinler) ve ilişki kontrolleriyle (öğrenci-veli, okul, şirket) teknik olarak sınırlandırılmıştır.

## 5. VERİ SAKLAMA SÜRELERİ

### 5.1 Aktif Kullanıcı Verileri

- Hesap aktif olduğu sürece saklanır.

### 5.2 Servis Geçmişi

- Son servis tarihinden itibaren 5 yıl saklanır.
- Yasal zorunluluklar için daha uzun saklanabilir.

### 5.3 Konum Verileri (GPS)

- Şoför cihazından gelen ham konum kayıtları en fazla **30 gün** saklanır ve otomatik olarak silinir.
- Özetlenen/raporlanan veriler daha uzun süre saklanabilir; bu veriler kişisel verilerden arındırılabilir veya anonimleştirilebilir.

### 5.4 Bildirim Logları

- 2 yıl saklanır.
- Güvenlik amaçlı loglar 1 yıl saklanır.

### 5.5 Veri Silme/Anonimleştirme

- Belirtilen süreler sonunda veriler otomatik olarak silinir veya anonimleştirilir.
- Yasal yükümlülükler nedeniyle daha uzun saklanması gereken veriler için ayrı prosedür uygulanır.

## 6. İŞLEME DAYANAKLARI VE MEŞRU MENFAAT

- Servis güvenliği ve operasyonel verimlilik için gerçek zamanlı konum verisi işlenmesi meşru menfaat kapsamında yapılır.
- Veliye gönderilen ETA bildirimleri, servis bilgilendirme amacıyla işlenir; pazarlama iletişimi niteliğinde değildir.

## 7. KULLANICI HAKLARI (KVKK Madde 11)

KVKK kapsamında aşağıdaki haklara sahipsiniz:

### 7.1 Bilgi Talep Etme Hakkı

- Kişisel verilerinizin işlenip işlenmediğini öğrenme
- İşleniyorsa buna ilişkin bilgi talep etme

### 7.2 Erişim Hakkı

- Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
- Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme

### 7.3 Düzeltme Hakkı

- Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme

### 7.4 Silme Hakkı

- İşlenmiş olan kişisel verilerinizin silinmesini veya yok edilmesini isteme

### 7.5 İtiraz Etme Hakkı

- Kişisel verilerinizin işlenmesini kanuni sebeplerle engelleme
- Kişisel verilerinizin işlenmesine karşı çıkma

### 7.6 Zararın Giderilmesini Talep Etme Hakkı

- İşlenen verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme

**Haklarınızı kullanmak için:** [info@yoldayim.com](mailto:info@yoldayim.com) adresine başvurunuz.

## 8. VERİ GÜVENLİĞİ

### 8.1 Teknik Önlemler

- SSL/TLS şifreleme
- Güvenli veri transferi
- Düzenli güvenlik güncellemeleri
- Erişim kontrolleri ve kimlik doğrulama
- Arka plan işlerinin ve görev kuyruklarının (queue) izole edilmesi ve erişim kontrolü
- Rate limiting ve suistimal önleme mekanizmaları (ör. konum güncelleme hız limitleri)

### 8.2 İdari Önlemler

- Personel gizlilik eğitimleri
- Veri erişim yetkilendirmeleri
- Düzenli güvenlik denetimleri

## 9. ÇEREZLER VE TAKİP TEKNOLOJİLERİ

Uygulama şu amaçlarla çerez ve benzeri teknolojiler kullanmaktadır:

### 9.1 Zorunlu Çerezler

- Oturum yönetimi
- Güvenlik
- Sistem performansı

### 9.2 Analitik Çerezler

- Kullanım istatistikleri
- Performans analizi

### 9.3 Bildirim Tercihleri

- Kullanıcı bildirim ayarları (rol bazlı)
- Cihaz token yönetimi
- Bildirim türü tercihleri (enabled/disabled)
- Push notification ayarları

## 10. ÇOCUKLARIN GİZLİLİĞİ

18 yaş altındaki çocukların kişisel verileri, veli/vasi izni ile toplanmaktadır. Çocukların verileri özel koruma altındadır ve sadece eğitim amaçlı servis hizmetleri için kullanılmaktadır.

## 11. ULUSLARARASI VERİ TRANSFERİ

Kişisel verileriniz şu anda yurt içinde saklanmaktadır. Uluslararası transfer durumunda KVKK ve ilgili mevzuat hükümlerine uygun önlemler alınacaktır.

## 12. POLİTİKA DEĞİŞİKLİKLERİ

Bu Gizlilik Politikası gerektiğinde güncellenebilir. Önemli değişiklikler e-posta veya uygulama bildirimi ile duyurulacaktır.

## 13. İLETİŞİM

Kişisel verilerinizle ilgili sorularınız için:

**E-posta:** [info@yoldayim.com](mailto:info@yoldayim.com)
**Telefon:** +90 546 733 23 39
**Adres:** Düzce/Merkez

---

*Bu Gizlilik Politikası KVKK ve ilgili mevzuat hükümlerine uygun olarak hazırlanmıştır.*