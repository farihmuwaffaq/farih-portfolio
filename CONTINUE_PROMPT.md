# Prompt untuk Melanjutkan Pengembangan

Gunakan prompt berikut saat melanjutkan pengembangan website portofolio Farih Muwaffaq.

```text
Lanjutkan pengembangan website portofolio Farih Muwaffaq dari workspace dan repository yang sudah ada.

Repository:
https://github.com/farihmuwaffaq/farih-portfolio

Production:
https://farih-portfolio.vercel.app

Branch:
main

Sebelum mengubah apa pun:

1. Periksa `git status`, remote, dan commit terbaru. Gunakan `HEAD` sebagai kondisi terkini; jangan mengandalkan commit hash yang tersimpan dalam dokumentasi.
2. Baca `README.md`, `PRODUCT.md`, `DESIGN.md`, `CONTENT_GUIDE.md`, dan bagian Implementation Addendum pada PRD.
3. Pertahankan perubahan user atau agent lain yang tidak terkait. Jangan revert dirty worktree tanpa instruksi eksplisit.
4. Audit implementasi aktual sebelum menyimpulkan behavior dari dokumentasi.

Kondisi production terverifikasi per 20 Agustus 2026:

- Astro + TypeScript static site, 15 generated pages.
- Sembilan validated Work Detail entries menggunakan Content Collections.
- Canonical URL dan sitemap production sudah aktif.
- LinkedIn, GitHub, portrait, verified resume PDF, project evidence, interface studies, dan social preview sudah terpasang.
- Mobile navigation adalah independent fixed fullscreen layer di luar floating navbar containing block.
- About hero memakai tiga semantic headline lines pada desktop dan natural wrapping pada mobile.
- About capability cards stack satu kolom di bawah 900px.
- Work Detail evidence stack full-width di bawah 900px; code/table scroll secara lokal pada narrow viewport.
- Focused Interface Studies tetap compact dua kolom di bawah 768px.
- Contact production menggunakan direct email dan social links; tidak ada form endpoint.
- Analytics hanya memakai local event abstraction; tidak ada external tracker atau cookie.

Kontrak penting:

- Jangan letakkan mobile menu di dalam `.nav`, `.nav-shell`, atau ancestor dengan constrained width, border radius, clipping, transform, atau `backdrop-filter`.
- Mobile menu harus `position: fixed`, `inset: 0`, `width: 100%`, `height: 100dvh`, solid background, dan viewport-level z-index.
- Jangan shrink screenshot, code, atau table sampai tidak terbaca. Gunakan full-width evidence dan local overflow.
- Jangan menyamakan semua responsive grids: text-heavy cards stack; visual interface gallery boleh tetap dua kolom.
- Jangan mengubah claim, provenance, metric, confidentiality note, atau evidence tanpa mengikuti `CONTENT_GUIDE.md`.
- Bedakan Professional Experience, Project-Based Internship, Technical Assessment, dan sample/training data.

Verification wajib sebelum menyatakan selesai:

1. Jalankan `npm run check`.
2. Jalankan `npm run build`.
3. Jalankan `npm run audit:links`.
4. Jalankan syntax check untuk client JS yang diubah.
5. Periksa `git diff --check`.
6. Untuk perubahan UI, browser-test sekitar 390px, 768px, dan 1440px.
7. Untuk fixed overlay, ukur geometry aktual terhadap viewport dan cek focus, Escape, Tab loop, scroll lock, serta reduced motion.
8. Deploy hanya jika diminta atau merupakan bagian eksplisit dari task; smoke-test production setelah deploy.

Konfigurasi eksternal yang masih optional:

- External analytics provider
- Custom domain

Jangan commit atau publikasikan `.env`, secrets, credentials, raw source materials, spreadsheet operasional, customer/SKU/account identifiers, private URLs, atau data rahasia. Audit keamanan setiap aset sebelum publikasi.
```
