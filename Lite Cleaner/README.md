# 🧹 Lite Cleaner

**Modern ve güçlü Android temizlik uygulaması**

Lite Cleaner, Android cihazınızı optimize etmek ve performansını artırmak için tasarlanmış kapsamlı bir temizlik uygulamasıdır. Gelişmiş algoritmalar ve kullanıcı dostu arayüz ile cihazınızı hızlı ve güvenli bir şekilde temizler.

## ✨ Özellikler

### 🚀 Hızlı Temizlik
- **Önbellek Temizliği** - Uygulama önbellek dosyalarını temizler
- **Geçici Dosyalar** - Sistem geçici dosyalarını kaldırır
- **İndirilenler** - Gereksiz indirilen dosyaları temizler
- **Çöp Kutusu** - Silinmiş dosyaları kalıcı olarak kaldırır

### 🔍 Derin Temizlik
- **Kapsamlı Tarama** - Sistemin her köşesini tarar
- **Akıllı Analiz** - Hangi dosyaların güvenle silinebileceğini belirler
- **Kategori Bazlı Temizlik** - Dosya türlerine göre organize edilmiş temizlik
- **Güvenli Silme** - Önemli dosyaları korur

### 📊 Sistem Analizi
- **RAM Kullanımı** - Bellek kullanımını izler
- **CPU Performansı** - İşlemci kullanımını analiz eder
- **Pil Durumu** - Batarya sağlığını kontrol eder
- **Depolama Analizi** - Disk kullanımını detaylı gösterir

### ⚙️ Gelişmiş Ayarlar
- **Otomatik Temizlik** - Zamanlanmış temizlik işlemleri
- **Bildirimler** - Temizlik sonuçları hakkında bilgilendirme
- **Yedekleme** - Önemli dosyaları otomatik yedekleme
- **Özelleştirme** - Kişiselleştirilmiş temizlik seçenekleri

## 🎨 Tasarım

### Modern UI/UX
- **Koyu Tema** - Göz yormayan koyu arayüz
- **Gradient Efektler** - Modern görsel tasarım
- **Smooth Animasyonlar** - Akıcı geçiş efektleri
- **Responsive Tasarım** - Tüm ekran boyutlarında uyumlu

### Kullanıcı Deneyimi
- **Sezgisel Navigasyon** - Kolay kullanım
- **Hızlı Erişim** - Tek dokunuşla temizlik
- **Detaylı Raporlar** - Temizlik sonuçları
- **Geçmiş Takibi** - Önceki temizlik işlemleri

## 🛠️ Teknik Detaylar

### Teknoloji Stack
- **React Native** - Cross-platform mobil geliştirme
- **TypeScript** - Tip güvenli kod
- **Expo** - Geliştirme ve dağıtım platformu
- **React Navigation** - Navigasyon yönetimi
- **Reanimated** - Yüksek performanslı animasyonlar

### Performans Optimizasyonları
- **Memory Management** - Efficient bellek kullanımı
- **Lazy Loading** - Hızlı yükleme
- **Code Splitting** - Optimize edilmiş bundle boyutu
- **Caching** - Akıllı önbellekleme

### Güvenlik
- **Safe File Operations** - Güvenli dosya işlemleri
- **Permission Management** - İzin yönetimi
- **Data Protection** - Veri koruma
- **Privacy First** - Gizlilik odaklı tasarım

## 📱 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Expo CLI
- Android Studio (Android geliştirme için)

### Adımlar

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/yourusername/lite-cleaner.git
   cd lite-cleaner
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Uygulamayı başlatın**
   ```bash
   npm start
   # veya
   yarn start
   ```

4. **Android'de test edin**
   ```bash
   npm run android
   # veya
   yarn android
   ```

## 🚀 Build ve Dağıtım

### Development Build
```bash
expo build:android
```

### Production Build
```bash
eas build --platform android --profile production
```

### Google Play Store'a Yükleme
```bash
eas submit --platform android
```

## 📁 Proje Yapısı

```
lite-cleaner/
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GradientCard.tsx
│   │   ├── ProgressRing.tsx
│   │   └── CustomNavigationBar.tsx
│   ├── screens/            # Ekran bileşenleri
│   │   ├── HomeScreen.tsx
│   │   ├── QuickCleanScreen.tsx
│   │   ├── DeepCleanScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ... (diğer ekranlar)
│   └── utils/              # Yardımcı fonksiyonlar
├── assets/                 # Görsel ve ses dosyaları
├── App.tsx                 # Ana uygulama bileşeni
├── app.config.js          # Expo konfigürasyonu
├── package.json           # Proje bağımlılıkları
└── README.md              # Bu dosya
```

## 🎯 Kullanım

### Hızlı Temizlik
1. Ana sayfada "Hızlı Temizlik" sekmesine gidin
2. Temizlemek istediğiniz kategorileri seçin
3. "Temizle" butonuna basın
4. İşlem tamamlandığında sonuçları görün

### Derin Temizlik
1. "Derin Temizlik" sekmesine gidin
2. "Tara" butonuna basarak sistemi analiz edin
3. Temizlemek istediğiniz dosyaları seçin
4. "Temizle" butonuna basın

### Ayarlar
1. Ayarlar sekmesine gidin
2. Otomatik temizlik, bildirimler ve diğer seçenekleri yapılandırın
3. Değişiklikleri kaydedin

## 🔧 Geliştirme

### Kod Standartları
- **ESLint** - Kod kalitesi kontrolü
- **Prettier** - Kod formatlaması
- **TypeScript** - Tip güvenliği
- **Conventional Commits** - Commit mesaj standartları

### Test
```bash
npm test
# veya
yarn test
```

### Linting
```bash
npm run lint
# veya
yarn lint
```

## 📈 Performans

### Optimizasyonlar
- **React.memo** - Gereksiz re-render'ları önler
- **useCallback** - Fonksiyon referanslarını optimize eder
- **useMemo** - Hesaplanan değerleri cache'ler
- **Lazy Loading** - Bileşenleri ihtiyaç duyulduğunda yükler

### Memory Management
- **Timer Cleanup** - Tüm timer'lar düzgün temizlenir
- **Event Listeners** - Event listener'lar optimize edilir
- **State Management** - Efficient state yönetimi
- **Animation Cleanup** - Animasyonlar düzgün temizlenir

## 🐛 Hata Bildirimi

Hata bulduysanız veya öneriniz varsa:

1. **Issue oluşturun** - GitHub'da yeni issue açın
2. **Detaylı açıklama** - Hatayı detaylı şekilde açıklayın
3. **Screenshot** - Mümkünse ekran görüntüsü ekleyin
4. **Cihaz bilgisi** - Cihaz modeli ve Android sürümü

## 🤝 Katkıda Bulunma

1. **Fork yapın** - Repository'yi fork edin
2. **Branch oluşturun** - Yeni özellik için branch oluşturun
3. **Değişiklik yapın** - Kodunuzu yazın
4. **Test edin** - Değişikliklerinizi test edin
5. **Pull Request** - Pull request oluşturun

### Katkı Kuralları
- Kod standartlarına uyun
- Test yazın
- Dokümantasyonu güncelleyin
- Commit mesajlarını açık yazın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Ekip

- **Geliştirici** - [Your Name](https://github.com/yourusername)
- **Tasarım** - [Designer Name](https://github.com/designer)
- **Test** - [Tester Name](https://github.com/tester)

## 📞 İletişim

- **Email** - support@litecleaner.com
- **Website** - https://litecleaner.com
- **Twitter** - [@LiteCleaner](https://twitter.com/litecleaner)
- **Discord** - [Lite Cleaner Community](https://discord.gg/litecleaner)

## 🙏 Teşekkürler

- **React Native** - Cross-platform geliştirme
- **Expo** - Geliştirme platformu
- **Community** - Açık kaynak topluluğu
- **Contributors** - Tüm katkıda bulunanlar

## 📊 İstatistikler

![GitHub stars](https://img.shields.io/github/stars/yourusername/lite-cleaner?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/lite-cleaner?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/lite-cleaner)
![GitHub license](https://img.shields.io/github/license/yourusername/lite-cleaner)

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

**📱 Google Play Store'da değerlendirin ve yorum yapın!**

https://github.com/expo/expo-go-releases/releases/download/Expo-Go-2.33.22/Expo-Go-2.33.22.apk Gerekli sürüm apk (sen yorulma alperen sönmez)