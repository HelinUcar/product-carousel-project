# 🍼 e-bebek Product Carousel Project 

Bu proje, [www.e-bebek.com](https://www.e-bebek.com) ana sayfasına dinamik olarak ürün carouseli eklemek amacıyla hazırlanmıştır. Tüm yapı yalnızca JavaScript kullanılarak geliştirilmiştir (jQuery dahil). Carousel bileşeni piksel hassasiyetinde web sitesindeki örnekle uyumlu olarak tasarlanmıştır.

## 🎯 Özellikler

- ✅ Sadece **anasayfada çalışır**. Diğer sayfalarda `wrong page` mesajı verir.
- ✅ Ürün verilerini verilen API'den çeker veya localStorage’dan yükler.
  [products.json](https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json)
- ✅ Fiyat ve indirim yüzdesi hesaplanır, gösterilir.
- ✅ Favorilere ekleme/çıkarma yapılabilir. Favoriler `localStorage`'da saklanır.
- ✅ Ürün listesi `localStorage`'a kaydedilir, böylece tekrar yüklenmez.
- ✅ Tamamen duyarlıdır (responsive).
- ✅ Ürün görsellerine tıklanınca yeni sekmede ürün açılır.
- ✅ Dokunmatik cihazlar için kaydırma desteği vardır.
- ✅ Her şey tek bir dosyada (HTML + CSS + JS).

## 🔗 Ürün Verisi

Veriler aşağıdaki JSON kaynağından alınmaktadır:
📌 [products.json](https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json)

## 🛠 Kurulum ve Kullanım

### 📄 Sayfa Uygunluğu
Kod yalnızca `https://www.e-bebek.com/` anasayfasında çalışır. Diğer sayfalarda konsola `"wrong page"` mesajı yazdırır.

### 🚀 Nasıl Çalıştırılır?

1. [www.e-bebek.com](https://www.e-bebek.com) ana sayfasını aç.
2. **Chrome Developer Tools → Console** sekmesini aç. (`F12`)
3. `script.js` dosyasındaki tüm kodu konsola yapıştırın.
4. Enter’a bas ve carouselin yüklendiğini gör!

### 📂 Yapı

- **HTML**: JavaScript ile `you-might-like` adlı bir section içerisine oluşturulur.
- **CSS**: `<style>` etiketi ile DOM'a enjekte edilir.
- **Veri Yönetimi**: 
  - Ürün listesi `localStorage`'a 24 saat süreyle kaydedilir.
  - Favoriler ayrı bir anahtarda (`ebebekFavorites`) tutulur.
- **Navigasyon**: Her tıklamada bir ürün kartı kayar.
- **Badge ve Yıldızlar**: Rastgele rozetler ve 3-5 yıldız arasında puanlama görünümü verilir.

## 🔑 Local Storage Anahtarları

| Anahtar               | Açıklama                                   |
|----------------------|--------------------------------------------|
| `ebebekCarouselProducts` | Ürün listesi (veri ve sona erme zamanı ile) |
| `ebebekFavorites`        | Favorilere eklenen ürün ID'leri dizisi      |

## 🚫 Kullanılmayanlar

- ❌ Herhangi bir 3. parti kütüphane (Swiper, Bootstrap vs.)
- ❌ HTML/CSS dosyası (tamamen JS üzerinden üretilir)
- ❌ Framework (React, Vue vs.)

## 🧪 Test Edilen Özellikler

- ✔ Ürün kartı tıklanınca yeni sekmede açılıyor.
- ✔ Favorilere ekleme/silme işlevi.
- ✔ Mobil, tablet ve masaüstü uyumluluk.
- ✔ Önbellekten veri yüklenmesi.
- ✔ Yükleme mesajı (konsola) ve hata yakalama.

## 🧑‍💻 Geliştirici Notları

- Kod yapılandırılmış, modüler ve okunabilir şekilde organize edilmiştir.
- Kod başlatıldığında jQuery yüklenmemişse otomatik olarak eklenir.
- Ürün kartları, responsive olarak dinamik sayıda görünür.



