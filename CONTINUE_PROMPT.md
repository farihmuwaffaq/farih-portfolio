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
5. Anggap `AUDIT.md` sebagai snapshot historis 19 Agustus dan `docs/plans/2026-08-20-hero-system-boot.md` sebagai decision record, bukan backlog aktif.

Kondisi production terverifikasi per 20 Agustus 2026:

- Astro + TypeScript static site, 15 generated pages.
- Sembilan validated Work Detail entries menggunakan Content Collections.
- Canonical URL dan sitemap production sudah aktif.
- LinkedIn, GitHub, portrait, verified resume PDF, project evidence, interface studies, dan social preview sudah terpasang.
- Empat selected credential PDF tampil pada About dan sebagai compact list pada Resume.
- Session-scoped identity intro memakai explicit Enter, no-script bypass, reduced-motion bypass, inert background, dan focus handoff.
- Homepage memiliki one-shot Operating Layer boot sequence dan interactive Operating Model toolchain mapper.
- Eligible internal links memakai route-aware SQL transition: 950 ms desktop dan 700 ms mobile.
- Native-dialog `SQL_` query console mendukung shortcut `/`, bounded commands, build-time search, `EXPLAIN <project>`, dan maksimal lima tab-scoped query history entries tanpa free-form SQL atau backend.
- Semua Work Detail memiliki governed evidence status, assumptions/constraints, dan decision log; project domain-kompleks dapat memiliki metric dictionary.
- Maleo Work Detail menampilkan delapan approved Google Slides dari 30+ client decks/reports sebagai local first-slide thumbnail cards; seluruh card membuka satu lazy-loaded native dialog, iframe tidak memiliki `src` sebelum klik, dan direct source links tidak diekspos.
- Mobile navigation adalah independent fixed fullscreen layer di luar floating navbar containing block.
- About hero memakai tiga semantic headline lines pada desktop dan natural wrapping pada mobile.
- About capability cards stack satu kolom di bawah 900px.
- Work Detail evidence stack full-width di bawah 900px; code/table scroll secara lokal pada narrow viewport.
- Focused Interface Studies tetap compact dua kolom di bawah 768px.
- Contact production menggunakan direct email dan social links; tidak ada form endpoint.
- Analytics hanya memakai local event abstraction; tidak ada external tracker atau cookie.
- Query transition dan console ikut mengirim local analytics events yang aman no-op tanpa provider.

Kontrak penting:

- Jangan letakkan mobile menu di dalam `.nav`, `.nav-shell`, atau ancestor dengan constrained width, border radius, clipping, transform, atau `backdrop-filter`.
- Mobile menu harus `position: fixed`, `inset: 0`, `width: 100%`, `height: 100dvh`, solid background, dan viewport-level z-index.
- Jangan shrink screenshot, code, atau table sampai tidak terbaca. Gunakan full-width evidence dan local overflow.
- Jangan menyamakan semua responsive grids: text-heavy cards stack; visual interface gallery boleh tetap dua kolom.
- Jangan mengubah claim, provenance, metric, confidentiality note, atau evidence tanpa mengikuti `CONTENT_GUIDE.md`.
- Bedakan Professional Experience, Project-Based Internship, Technical Assessment, dan sample/training data.
- Jangan intercept external, download, modified-click, same-page hash, current-page, `mailto:`, `tel:`, atau reduced-motion navigation dalam SQL transition.
- Pertahankan native `<dialog>` semantics, semantic result links, Escape/backdrop close, dan focus restoration pada query console.
- Untuk deck preview, jangan eager-load Google iframe. Unload `src` saat close, restore trigger focus, dan jangan memperluas izin delapan approved slides ke archive lain.

Verification wajib sebelum menyatakan selesai:

1. Jalankan `npm run test:identity-intro`.
2. Jalankan `npm run test:hero-boot`.
3. Jalankan `npm run test:operating-toolchain`.
4. Jalankan `npm run test:selected-credentials`.
5. Jalankan `npm run test:v1-launch`.
6. Jalankan `npm run test:query-interface`.
7. Jalankan `npm run test:analyst-credibility`.
8. Jalankan `npm run test:deck-library`.
9. Jalankan `npm run check`.
10. Jalankan `npm run build`.
11. Jalankan `npm run audit:links`.
12. Jalankan `npm audit` dan syntax check untuk client JS yang diubah.
13. Periksa `git diff --check`.
14. Untuk perubahan UI, browser-test sekitar 390px, 768px, dan 1440px.
15. Untuk fixed overlay atau dialog, ukur geometry aktual terhadap viewport dan cek focus, Escape, Tab loop, scroll lock, native link exclusions, serta reduced motion.
16. Deploy hanya jika diminta atau merupakan bagian eksplisit dari task; smoke-test production setelah deploy.

Konfigurasi eksternal yang masih optional:

- External analytics provider
- Custom domain
- Physical-device, screen-reader, dan Lighthouse audit baru; `AUDIT.md` lama bukan skor production terkini

Jangan commit atau publikasikan `.env`, secrets, credentials, raw source materials, spreadsheet operasional, customer/SKU/account identifiers, private URLs, atau data rahasia. Audit keamanan setiap aset sebelum publikasi.
```
