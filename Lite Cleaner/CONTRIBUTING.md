# 🤝 Katkıda Bulunma Rehberi

Lite Cleaner projesine katkıda bulunmak istediğiniz için teşekkürler! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 📋 İçindekiler

- [Kod Katkısı](#kod-katkısı)
- [Hata Bildirimi](#hata-bildirimi)
- [Özellik Önerisi](#özellik-önerisi)
- [Dokümantasyon](#dokümantasyon)
- [Test](#test)
- [Kod Standartları](#kod-standartları)

## 🚀 Kod Katkısı

### 1. Repository'yi Fork Edin
```bash
git clone https://github.com/yourusername/lite-cleaner.git
cd lite-cleaner
```

### 2. Branch Oluşturun
```bash
git checkout -b feature/your-feature-name
# veya
git checkout -b fix/your-bug-fix
```

### 3. Değişikliklerinizi Yapın
- Kodunuzu yazın
- Test edin
- Dokümantasyonu güncelleyin

### 4. Commit Yapın
```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push Edin
```bash
git push origin feature/your-feature-name
```

### 6. Pull Request Oluşturun
GitHub'da Pull Request oluşturun ve değişikliklerinizi açıklayın.

## 🐛 Hata Bildirimi

### Hata Bildirirken:
1. **Açık başlık** kullanın
2. **Detaylı açıklama** yazın
3. **Adımları** listeleyin
4. **Beklenen davranışı** açıklayın
5. **Screenshot** ekleyin
6. **Cihaz bilgisi** verin

### Hata Şablonu:
```markdown
**Hata Açıklaması:**
Kısa ve net açıklama

**Adımlar:**
1. ...
2. ...
3. ...

**Beklenen Davranış:**
Ne olması gerekiyordu

**Gerçek Davranış:**
Ne oldu

**Cihaz Bilgisi:**
- Cihaz: [örn. Samsung Galaxy S21]
- Android: [örn. Android 12]
- Uygulama Sürümü: [örn. 1.0.0]
```

## 💡 Özellik Önerisi

### Özellik Önerirken:
1. **Açık başlık** kullanın
2. **Problemi** açıklayın
3. **Çözümü** önerin
4. **Alternatifleri** düşünün
5. **Ek bilgi** ekleyin

## 📚 Dokümantasyon

### Dokümantasyon Katkısı:
- README.md güncellemeleri
- Kod yorumları
- API dokümantasyonu
- Kullanım kılavuzları

## 🧪 Test

### Test Yazarken:
```typescript
// Örnek test
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test kodu
  });
});
```

## 📏 Kod Standartları

### TypeScript
- Tip güvenliği sağlayın
- Interface'leri kullanın
- Any tipinden kaçının

### React Native
- Functional component'leri tercih edin
- Hook'ları doğru kullanın
- Performance'ı optimize edin

### Stil
- StyleSheet kullanın
- Responsive tasarım yapın
- Consistent naming

### Commit Mesajları
```
feat: yeni özellik
fix: hata düzeltmesi
docs: dokümantasyon
style: formatlama
refactor: kod yeniden düzenleme
test: test ekleme
chore: build, config değişiklikleri
```

## 🔍 Code Review

### Review Kriterleri:
- Kod kalitesi
- Performance
- Güvenlik
- Test coverage
- Dokümantasyon

## 📞 İletişim

- **Discord:** [Lite Cleaner Community](https://discord.gg/litecleaner)
- **Email:** dev@litecleaner.com
- **GitHub Issues:** Hata ve öneriler için

## 🙏 Teşekkürler

Katkıda bulunan herkese teşekkürler! 🎉
