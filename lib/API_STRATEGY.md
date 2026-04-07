# Social Media API Implementation Strategy

Dalam technical test ini, data diambil menggunakan simulasi (mock) untuk mendemonstrasikan UI/UX dan fungsionalitas dashboard. Berikut adalah strategi yang akan diimplementasikan untuk menggunakan API resmi atau metode legal lainnya dalam lingkungan produksi.

## 1. YouTube Data API v3
*   **Metode**: Menggunakan Google Cloud Console untuk mendapatkan API Key.
*   **Endpoint**: `GET https://www.googleapis.com/youtube/v3/channels` untuk data profil dan `search` atau `activities` untuk konten terbaru.
*   **Keterbatasan**: Kuota harian (10,000 unit).
*   **Solusi**: Mengimplementasikan caching (misal: Redis atau Vercel Data Cache) agar tidak melakukan fetch berulang untuk akun yang sama dalam waktu singkat.

## 2. TikTok API (Display API)
*   **Metode**: Menggunakan TikTok for Developers.
*   **Masalah**: TikTok API sangat ketat dan membutuhkan approval aplikasi yang lama.
*   **Solusi Alternatif**: 
    *   **Official Research API**: Jika tersedia untuk entitas penelitian.
    *   **RapidAPI / Scraping Service**: Menggunakan layanan pihak ketiga yang stabil (seperti TikAPI atau layanan scraping legal) yang menangani rotasi proxy dan bypass captcha.
    *   **Oembed**: Untuk menampilkan konten spesifik secara legal.

## 3. Instagram Graph API
*   **Metode**: Membutuhkan Facebook Developer Account dan Instagram Business/Creator Account.
*   **Endpoint**: `/business_discovery` melalui User Node.
*   **Keterbatasan**: Membutuhkan akses token yang valid (bisa menggunakan Long-lived Access Tokens).
*   **Masalah**: Tidak bisa mengambil data akun personal biasa tanpa izin dari pemilik akun.
*   **Solusi**: Untuk dashboard publik seperti ini, biasanya digunakan third-party aggregator (seperti Social Blade API) yang memiliki izin khusus atau metode pengumpulan data publik yang legal.

## 4. Teknik Penyajian Data (Problem Solving)
*   **Incremental Static Regeneration (ISR)**: Menggunakan fitur Next.js untuk merefresh data di background setiap X menit.
*   **Client-side SWR/React Query**: Untuk fitur "Refresh" tanpa reload, memastikan UI tetap responsif dengan state management yang baik.
*   **Graceful Degradation**: Jika salah satu API gagal (misal: rate limited), platform lain tetap tampil dan memberikan pesan error yang informatif kepada pengguna.
