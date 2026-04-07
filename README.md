# Social View Dashboard - Technical Test

A modern, high-performance web application built with Next.js and TypeScript to track social media views across TikTok, YouTube, and Instagram simultaneously.

## 🚀 Fitur Utama
- **Unified Dashboard**: Lihat data dari 3 platform berbeda dalam satu tampilan.
- **Real-time Refresh**: Update data secara dinamis tanpa reload halaman.
- **Premium UI/UX**: Desain modern dengan *Glassmorphism*, dukungan *Dark/Light Mode*, dan animasi halus.
- **Responsive Design**: Tampilan optimal di berbagai perangkat (Mobile, Tablet, Desktop).

---

## 🛠️ Pendekatan Teknis (Approach)

### 1. Framework & Core Logic
- **Next.js (App Router)**: Dipilih karena performa SSR/CSR yang seimbang dan kemudahan manajemen rute.
- **TypeScript**: Digunakan untuk memastikan integritas data (`interfaces`) dan meminimalkan bug saat pengembangan.
- **React State Management**: Menggunakan `useState` dan `useCallback` untuk mengelola data sosial media secara terpusat di `page.tsx`, memudahkan sinkronisasi antar komponen.

### 2. Styling System
- **Vanilla CSS + CSS Variables**: Alih-alih Tailwind, proyek ini menggunakan CSS murni dengan variabel untuk kontrol penuh atas estetika *premium* dan kemudahan implementasi *Theme Switching*.
- **Glassmorphism**: Menggunakan `backdrop-filter: blur` untuk menciptakan efek kedalaman pada kartu data.

### 3. Data Fetching Strategy
- Memisahkan logika fetch ke dalam `lib/api-mock.ts` agar mudah diganti dengan integrasi API riil (seperti YouTube Data API v3 atau Instagram Graph API) di masa depan.
- Mengimplementasikan `Promise.all` untuk melakukan fetching dari 3 platform secara paralel guna meningkatkan kecepatan loading.

---

## ⚠️ Kendala & Solusi (Constraints & Solutions)

| Kendala | Solusi |
| :--- | :--- |
| **Limitasi API Resmi**: TikTok & Instagram membutuhkan approval aplikasi yang rumit dan waktu lama untuk akses publik. | Mengimplementasikan **Mock API Service** dengan delay tersimulasi untuk mendemonstrasikan fungsionalitas UI, serta menyediakan `lib/API_STRATEGY.md` sebagai panduan integrasi riil. |
| **Hydration Mismatch**: Perbedaan tema (Light/Dark) antara server dan client menyebabkan flash warna saat reload. | Menambahkan **Inline Blocking Script** di `layout.tsx` untuk mendeteksi tema tersimpan di `localStorage` sebelum konten di-render, serta menggunakan state `mounted` pada `ThemeToggle`. |
| **Performa Rendering**: Banyak elemen visual berat (blur, gradients) bisa memperlambat browser lama. | Menggunakan CSS modern yang dioptimalkan dan meminimalisir re-render yang tidak perlu dengan `useCallback`. |

---

## 📂 Struktur Proyek
```text
├── app/
│   ├── globals.css      # Desain sistem & Theme variables
│   ├── layout.tsx       # Root layout & Theme provider script
│   └── page.tsx         # Dashboard orchestrator
├── components/
│   ├── InputSection.tsx # Form input handles
│   ├── SocialCard.tsx   # Visualisasi data per platform
│   └── ThemeToggle.tsx  # Saklar Light/Dark mode
├── lib/
│   ├── api-mock.ts      # Logic simulasi data
│   ├── types.ts         # TypeScript interfaces
│   └── API_STRATEGY.md  # Panduan integrasi API produksi
└── public/              # Aset statis
```

---

## ⚙️ Instalasi & Penggunaan

1. **Clone repository**:
   ```bash
   git clone <repo-url>
   cd technicaltest_webdeveloper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Akses di [http://localhost:3000](http://localhost:3000)

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---
**Dibuat oleh Abdul Majid untuk Technical Test Web Developer.**
