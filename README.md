# Web Performance Exploration — AFTER v1 Version

## 📌 Deskripsi

Branch **`after-v1`** merupakan tahap **optimasi awal** dari eksplorasi **Web Performance Optimization** menggunakan Next.js.  
Versi ini dibangun di atas baseline (`before`) dengan fokus pada **mengurangi beban rendering awal** dan **meningkatkan user-perceived performance**, tanpa mengubah arsitektur besar aplikasi.

Branch ini bertujuan untuk:

- Meningkatkan metrik performa utama (LCP, TBT)
- Mengurangi beban main thread
- Membandingkan hasil optimasi secara objektif terhadap versi `before`

---

## 🧪 Skenario Pengujian

Aplikasi menampilkan **daftar produk dalam jumlah besar** yang diambil dari public API, lalu dirender langsung ke UI tanpa optimasi khusus.

### Karakteristik Implementasi (BEFORE):

- Menggunakan `useEffect` biasa untuk data fetching
- Seluruh data produk dirender **sekaligus**
- Tidak menggunakan pagination atau virtual list
- Tidak ada memoization
- Gambar belum dioptimasi
- Tidak ada cache data
- Fokus pada **fungsionalitas**, bukan performa

### Karakteristik Implementasi (AFTER v1):

- Menggunakan **Server Components** untuk initial data fetching
- Menggunakan **Pagination (Load More)** untuk mengurangi beban render awal
- Implementasi **React.memo** pada komponen list item
- Penggunaan **Next.js Image** untuk optimasi gambar
- Fokus pada **First Load Performance (LCP)** dan pengurangan blocking time

---

## 🌐 Data Source

API yang digunakan: https://dummyjson.com/products?limit=194

---

## 🛠️ Tech Stack

- **Next.js** App Router
- TypeScript
- Public API (DummyJSON)
- Chrome DevTools
- Web Vitals
- React DevTools

---

## 🧪 Metodologi Pengujian Performa

| Tool                     | Fokus Pengukuran                          |
| ------------------------ | ----------------------------------------- |
| Lighthouse               | First-load performance (lab environment)  |
| Chrome Performance Panel | Main thread activity & runtime profiling  |
| Web Vitals               | Real user–centric performance metrics     |
| React DevTools Profiler  | React rendering cost & re-render analysis |

> ⚠️ Seluruh pengujian dilakukan dengan konfigurasi yang **sama dengan versi BEFORE** agar hasil perbandingan tetap adil.

---

## Lighthouse Test (AFTER v1)

### Konfigurasi:

- Mode: **Incognito**
- Device: **Mobile**
- Environment: **Development (localhost)**

🔗 **Lighthouse Report (AFTER v1)**  
<img width="1101" height="881" alt="Image" src="https://github.com/user-attachments/assets/caf9dd67-bbfa-41cf-8057-a7bd742a797e" />

### 🔍 Hasil Utama:

- **Performance score meningkat signifikan (~78)**
- **LCP turun drastis (~1.7s)**
- **Total Blocking Time berkurang (~890ms)**
- **CLS tetap stabil (0)**

📌 Ini menunjukkan bahwa optimasi render awal berdampak langsung pada **first-load performance**.

---

## Chrome DevTools — Performance Panel (AFTER v1)

### Konfigurasi:

- Mode: **Normal**
- Device: **Mobile**
- Environment: **Development (localhost)**

🔗 **Performance Panel Report (AFTER v1)**  
<img width="1117" height="913" alt="Image" src="https://github.com/user-attachments/assets/81e41222-5577-4b28-84d0-f997786b1a25" />

### 🔍 Temuan:

- **Main thread time jauh berkurang** dibandingkan versi BEFORE
- Aktivitas scripting masih dominan, namun:
  - Long tasks lebih pendek
  - Idle time mulai muncul
- Rendering dan painting lebih terdistribusi

📌 Ini menandakan bahwa **beban kerja JavaScript sudah lebih terkendali**, meskipun belum optimal sepenuhnya.

---

## Web Vitals — Runtime UX Metrics (AFTER v1)

Pengukuran dilakukan menggunakan library `web-vitals`.

🔗 **Web Vitals Log (AFTER v1)**  
<img width="1117" height="220" alt="Image" src="https://github.com/user-attachments/assets/3bf6f62c-feb5-406c-b9aa-4ada9cad9f37" />

### 🔍 Hasil:

- **FCP:** Good (~1.2s)
- **TTFB:** Good
- **LCP:** Good (~1.2s)
- **CLS:** Good (~0)
- **INP:** ⚠️ Needs Improvement (~230ms)

📌 LCP membaik signifikan karena elemen terbesar dirender lebih cepat dan beban render awal berkurang.  
Namun, **INP masih perlu ditingkatkan**, menandakan adanya pekerjaan lanjutan pada interaksi pengguna.

---

## React DevTools — Profiler (AFTER v1)

🔗 **React Profiler Report (AFTER v1)**  
<img width="1114" height="910" alt="Image" src="https://github.com/user-attachments/assets/cb38125a-187e-49b7-9afd-b5935c5ccbfd" />

### 🔍 Temuan:

- Commit render masih cukup besar (~370ms)
- `ProductList` dan `Header` menjadi komponen termahal
- Banyak `ProductCard (memo)` sudah terisolasi dengan baik
- Render scope **lebih sempit** dibandingkan BEFORE

📌 Optimasi memoization mulai efektif, namun **jumlah komponen render masih tinggi**.

---

## 🧠 Kesimpulan (AFTER v1)

Dibandingkan versi **BEFORE**, versi **AFTER v1** menunjukkan bahwa:

1. **LCP dan Lighthouse Performance meningkat signifikan**
2. Beban main thread berkurang, namun belum sepenuhnya optimal
3. React rendering lebih terkontrol, tetapi:
   - Commit masih relatif besar
   - INP masih perlu ditingkatkan
4. Optimasi masih bersifat **incremental**, belum struktural

Versi ini menjadi **fondasi kuat** untuk tahap optimasi berikutnya (`after-v2`), yang akan fokus pada:

- Virtualization (Windowing)
- Optimasi gambar lanjutan
- Peningkatan interaction performance (INP)
- Reducing React commit size

---

## 📌 Catatan

Versi **AFTER v1** menunjukkan bahwa **optimasi kecil pada frontend rendering dapat memberikan dampak besar** pada performa.  
Namun, masih terdapat ruang optimasi lanjutan untuk mencapai **production-grade performance**.
