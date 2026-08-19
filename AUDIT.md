# Technical Audit — Farih Muwaffaq Portfolio

Tanggal: 2026-08-19 · Cakupan: seluruh situs (12 halaman build) · Jenis: audit teknis level kode (bukan kritik desain)

Skor keseluruhan: **14 / 20**

| Dimensi | Skor |
|---|---|
| Accessibility | 3 / 4 |
| Performance | 3 / 4 |
| Responsive | 3 / 4 |
| Code Quality | 3 / 4 |
| Copy & Content | 2 / 4 |

Skor: 4 sempurna · 3 minor · 2 perlu perhatian · 1 masalah serius · 0 kritis

---

## Ringkasan eksekutif

Situs dalam kondisi sehat. Struktur semantik lengkap di semua 12 halaman (lang, title, meta description, satu `<h1>`, `<main>`, viewport, canonical, Open Graph, favicon, theme-color). Tidak ada gambar tanpa `alt` (20 dicek). Semua SVG dekoratif diberi `aria-hidden`. Payload ramping: satu stylesheet 19KB, nol JavaScript yang dikirim ke klien, semua thumbnail SVG di bawah 1KB. Temuan terbesar bukan kode yang salah melainkan **aset mati** — dua PNG lab (~1MB) yang tidak direferensikan halaman manapun — dan beberapa pola CSS yang terdeteksi sebagai "AI slop" generik. Tidak ada isu P0.

---

## Temuan per dimensi

### 1. Accessibility — 3/4

**Positif:**
- Semua halaman: `lang`, satu `<h1>`, landmark `<main>`, skip-link ada.
- 20 `<img>` semuanya punya `alt`.
- 15 SVG logo brand di about semuanya `aria-hidden` (dekoratif, label teks menyertai).
- `:focus-visible` didefinisikan; `prefers-reduced-motion` dihormati di 2 tempat (spin + rise dinonaktifkan).
- Kontras token aman: `--ink #101312` di `--paper #fafaf7` ≈ 15.9:1 (AAA); `--muted #535d58` ≈ 6.3:1 (AA); `--signal #0e6b3c` di paper ≈ 5.9:1 (AA).

**Temuan:**
- **[P2] Cakupan reduced-motion parsial.** Hanya `spin` dan `rise` yang di-guard. Ada 20 deklarasi `animation:`/`transition:` di `global.css`; transisi hover/opacity lain tetap jalan saat pengguna meminta reduced motion. Risiko rendah (kebanyakan transisi halus), tapi praktik terbaiknya satu guard global.
  `src/styles/global.css:54,167`

### 2. Performance — 3/4

**Positif:**
- Nol JavaScript klien — murni HTML/CSS statis. Sangat cepat.
- Satu stylesheet 19KB, tak ada duplikat.
- Semua thumbnail proyek/lab `.svg` 0.5–0.7KB.
- Total HTML 12 halaman hanya 172KB.

**Temuan:**
- **[P1] Aset mati ~1MB.** `adventureworks.png` (292KB) dan `maven-cycles.png` (741KB) ada di `public/images/lab/` tapi tidak direferensikan halaman manapun — semua lab memakai versi `.svg`. Keduanya ikut ter-deploy ke Vercel sia-sia.
  `public/images/lab/adventureworks.png`, `public/images/lab/maven-cycles.png`
- **[P3] Font eksternal.** Satu request ke Google Fonts (Inter). Tanpa `preload`/self-host; bergantung jaringan pihak ketiga.

### 3. Responsive — 3/4

**Positif:**
- Viewport meta ada; breakpoint `@media (max-width: 860px)` dan `760px` didefinisikan.
- Layout berbasis grid/flex dengan token fluid.

**Temuan:**
- **[P2] Hanya 2 breakpoint tata letak.** 860px dan 760px berdekatan; tidak ada langkah tablet (~1024px) atau verifikasi layar sangat lebar. Perlu cek visual di 768–1024px untuk memastikan grid tool/about dan hero tidak pecah.
- **[P2] Uji overflow horizontal belum diverifikasi di 320px** pada halaman dengan grid logo 3 kolom (about) dan tabel spec-row (contact).

### 4. Code Quality — 3/4

**Positif:**
- Build bersih, 12 halaman, sitemap ter-generate, nol error/warning compiler.
- Struktur konsisten: komponen `Icon.astro` terpusat untuk semua logo brand.

**Temuan (design detector — pola generik, bukan bug):**
- **[P2] Font "overused": Inter** (`BaseLayout.astro:26`). Detector menandai Inter sebagai wajah yang terlalu umum/difarasi AI. Sifatnya preferensi estetik, bukan cacat — tapi patut dicatat untuk diferensiasi.
- **[P2] Side-tab accent border ×2** (`global.css:266,272`). `blockquote` (`border-left: 2px solid --signal`) dan `.panel` (`3px solid --signal`). Detector menandai aksen border-sisi sebagai ciri khas UI AI. Keduanya dipakai konsisten sebagai bahasa editorial, jadi ini penilaian rasa, bukan error.

### 5. Copy & Content — 2/4

**Temuan:**
- **[P2] Tautan LinkedIn kini benar** (`farihmuwaffaq/`) setelah perbaikan terakhir — terverifikasi live. ✅
- **[P2] Konsistensi penamaan file gambar.** Aset `.png` dan `.svg` dengan nama sama hidup berdampingan di `lab/`; hanya `.svg` yang dipakai. Sumber kebingungan saat edit berikutnya (lihat P1).
- **[P3] Tidak ada halaman `humans.txt`/`robots` kustom** — sitemap ada, tapi verifikasi `robots.txt` mengizinkan crawling belum dicek di laporan ini.

> Catatan: skor 2 di sini mencerminkan utang housekeeping konten/aset, bukan kualitas tulisan. Salinan halaman sendiri konsisten dan bebas placeholder.

---

## Temuan positif (dipertahankan)

- Struktur semantik 100% bersih di semua halaman — jarang untuk situs kecil.
- Arsitektur zero-JS: keputusan performa terbaik di seluruh audit.
- Sistem ikon terpusat (`Icon.astro`) membuat penambahan logo baru konsisten.
- Sanitasi konten (tidak ada data klien sensitif) sesuai positioning PRODUCT.md.

---

## Prioritas tindakan

| Prioritas | Item | Dimensi | Usulan perintah |
|---|---|---|---|
| P1 | Hapus/referensikan 2 PNG lab mati (~1MB) | Performance | hapus file atau pakai |
| P2 | Guard `prefers-reduced-motion` global | Accessibility | `harden` |
| P2 | Verifikasi layout 768–1024px & 320px | Responsive | `adapt` |
| P2 | Pertimbangkan ganti font Inter (diferensiasi) | Code Quality | `typeset` |
| P2 | Tinjau aksen side-tab (rasa, opsional) | Code Quality | `polish` |
| P3 | Self-host font + preload | Performance | `optimize` |
| P3 | Cek robots.txt | Copy/Content | — |

---

## Catatan metode

Audit statis pada source `src/` + hasil build `dist/` (12 HTML). Tidak ada uji runtime browser (Lighthouse, screen reader nyata, perangkat fisik). Skor responsive menunggu verifikasi visual; skor aksesibilitas berbasis markup, bukan audit WCAG penuh. Deteksi pola desain via `impeccable` detector (3 warning, semua kategori `slop`/preferensi).
