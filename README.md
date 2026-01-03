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
- Lighthouse (Chrome DevTools)

---

## 📊 Hasil Lighthouse Test (BEFORE)

Pengujian dilakukan dengan ketentuan:
- Mode: **Incognito**
- Device: **Mobile**
- Environment: **Development (localhost)**

Screenshot hasil Lighthouse dapat dilihat pada tautan berikut:

🔗 **Lighthouse Report (BEFORE)**  
<img width="1634" height="795" alt="Image" src="https://github.com/user-attachments/assets/c58b8f52-402e-41e3-ac19-f576da4dd545" />

📌 Catatan:
- Pengujian dilakukan sebelum optimasi apa pun
- Data yang dirender berjumlah **194 produk**
- Skor performance rendah digunakan sebagai **baseline pembanding**

---

## 🔍 Analisis Awal
Beberapa temuan utama dari hasil pengujian:

- **FCP tergolong cepat**, menunjukkan halaman mulai tampil dengan baik
- **LCP sangat tinggi**, menandakan konten utama seperti list produk / image terlambat dirender
- **Total Blocking Time sangat besar**, menunjukkan main thread browser terblokir oleh proses JavaScript dan rendering list besar
- **CLS = 0**, layout relatif stabil

---

## 📌 Catatan
Skor Lighthouse pada versi ini **bukan indikasi kualitas akhir aplikasi**, melainkan **baseline pembelajaran** untuk memahami dampak setiap teknik optimasi performa.