# Web Performance Exploration — BEFORE Version

## 📌 Deskripsi
Repository ini merupakan bagian dari eksplorasi dan pembelajaran **Web Performance Optimization** menggunakan Next.js.  
Branch **`before`** merepresentasikan **kondisi awal aplikasi sebelum dilakukan optimasi performa**, dengan tujuan untuk:

- Mengidentifikasi bottleneck performa
- Mengukur baseline metrics menggunakan Lighthouse
- Menjadi pembanding yang jelas untuk versi optimasi selanjutnya (`after-v1`, `after-v2`, dst)

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

| Tool                     | Fokus Pengukuran                              |
|--------------------------|----------------------------------------------|
| Lighthouse               | First-load performance (lab environment)     |
| Chrome Performance Panel | Main thread activity & runtime profiling     |
| Web Vitals               | Real user–centric performance metrics        |
| React DevTools Profiler  | React rendering cost & re-render analysis    |

---

## Lighthouse Test (BEFORE)

Pengujian dilakukan dengan ketentuan:
- Mode: **Incognito**
- Device: **Mobile**
- Environment: **Development (localhost)**

🔗 **Lighthouse Report (BEFORE)**  
<img width="1634" height="795" alt="Image" src="https://github.com/user-attachments/assets/c58b8f52-402e-41e3-ac19-f576da4dd545" />

---

### 🔍 Analisis Awal
Beberapa temuan utama dari hasil pengujian:

- **FCP tergolong cepat**, menunjukkan halaman mulai tampil dengan baik
- **LCP sangat tinggi**, menandakan konten utama seperti list produk / image terlambat dirender
- **Total Blocking Time sangat besar**, menunjukkan main thread browser terblokir oleh proses JavaScript dan rendering list besar
- **CLS = 0**, layout relatif stabil

📌 Lighthouse digunakan sebagai indikator kesan pertama halaman, bukan satu-satunya alat evaluasi.

---

---

## Chrome DevTools — Performance Panel (BEFORE)

Pengujian dilakukan dengan ketentuan:
- Mode: **Normal**
- Device: **Mobile**
- Environment: **Development (localhost)**

🔗 **Performance Panel Report (BEFORE)**
<img width="1634" height="795" alt="Image" src="https://github.com/user-attachments/assets/c58b8f52-402e-41e3-ac19-f576da4dd545" />

---

### 🔍 Analisis Awal
Beberapa temuan utama dari hasil pengujian:

- Main thread time sangat tinggi (>8 detik)
- Dominasi aktivitas JavaScript execution (scripting)
- Banyak long tasks akibat rendering 194 item sekaligus
- Minim idle time → browser tidak punya ruang bernapas

📌 Ini menunjukkan adanya main-thread congestion yang signifikan

---

---

## Web Vitals — Runtime UX Metrics (BEFORE)

**Tujuan:**
Menganalisis apa yang terjadi saat aplikasi digunakan, khususnya saat:

- initial render
- scroll list produk
- rendering list besar

Pengujian dilakukan dengan ketentuan:
- Mode: **Normal**
- Device: **Mobile**
- Environment: **Development (localhost)**

🔗 **Performance Panel Report (BEFORE)**
<img width="1634" height="795" alt="Image" src="https://github.com/user-attachments/assets/c58b8f52-402e-41e3-ac19-f576da4dd545" />

---

### 🔍 Analisis Awal
Beberapa temuan utama dari hasil pengujian:

- FCP: Good
- TTFB: Good
- LCP: ❌ Poor (~6s)
- CLS: Good (0)

Browser mendeteksi bahwa gambar produk pertama menjadi elemen Largest Contentful Paint (LCP), namun tidak diprioritaskan dengan baik.

📌 Ini menegaskan bahwa masalah utama bukan server, melainkan image priority & rendering strategy.

---

---

## React DevTools — Profiler (BEFORE)

**Tujuan:** Menganalisis biaya render React dan seberapa luas dampak state update.

Pengujian dilakukan dengan ketentuan:
- Mode: **Normal**
- Device: **Mobile**
- Environment: **Development (localhost)**

🔗 **Performance Panel Report (BEFORE)**
<img width="1634" height="795" alt="Image" src="https://github.com/user-attachments/assets/c58b8f52-402e-41e3-ac19-f576da4dd545" />

---

### 🔍 Analisis Awal
Beberapa temuan utama dari hasil pengujian:

- Commit render relatif besar (~100ms+)
- Banyak Provider dan Router ikut terlibat dalam satu commit
- Render scope terlalu luas akibat list besar dan context hierarchy

📌 Ini menjelaskan tingginya:

- TBT di Lighthouse
- Scripting time di Performance Panel
---

---

## Kesimpulan Baseline (BEFORE)

Versi **BEFORE** menunjukan bahwa:
1. Backend dan initial paint tidak menjadi bottleneck
2. Rendering list besar secara langsung menyebabkan:
-- Main thread overload
-- LCP yang buruk
-- Biaya render React yang tinggi
3. Masalah performa bersifat frontend-rendering–driven, bukan network atau server
4. Versi ini digunakan sebagai baseline pembanding untuk mengevaluasi dampak optimasi pada fase berikutnya.

---

## 📌 Catatan
Skor Lighthouse pada versi ini **bukan indikasi kualitas akhir aplikasi**, melainkan **baseline pembelajaran** untuk memahami dampak setiap teknik optimasi performa.