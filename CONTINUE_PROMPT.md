# Prompt untuk Melanjutkan Pengembangan

Salin dan gunakan prompt berikut saat ingin melanjutkan pengembangan website portofolio Farih Muwaffaq.

```text
Lanjutkan pengembangan website portofolio Farih Muwaffaq dari workspace dan repository yang sudah ada.

Repository:
https://github.com/farihmuwaffaq/farih-portfolio

Production:
https://farih-portfolio.vercel.app

Branch:
main

Sebelum mengubah apa pun:

1. Periksa workspace dan status Git.
2. Jalankan:
   - `git status`
   - `git remote -v`
   - `git log --oneline -10`
3. Jika workspace belum memiliki repository, clone repository tersebut.
4. Jika repository sudah tersedia dan working tree bersih, jalankan `git pull --ff-only`.
5. Jangan menghapus atau menimpa perubahan lokal yang belum di-commit.
6. Baca `README.md`, `CONTENT_GUIDE.md`, dan `PRD_Portfolio_Farih_Muwaffaq_EN.md` jika tersedia.
7. Jangan commit atau push PRD, folder `asset/`, source materials, PDF mentah, spreadsheet, data operasional, credentials, atau informasi rahasia.

Kondisi saat ini:

- Website menggunakan Astro + TypeScript.
- Static production build berjalan di Vercel.
- Canonical production URL: `https://farih-portfolio.vercel.app`
- Sitemap: `https://farih-portfolio.vercel.app/sitemap-index.xml`
- Commit konfigurasi production terakhir: `02313fd Configure production site URL`
- Check, build, dan internal-link audit terakhir berhasil.
- PDF CV, LinkedIn URL, headshot, contact form provider, analytics provider, dan sebagian visual project masih placeholder.

Fokus sesi berikutnya:

1. Audit website production pada viewport mobile sekitar 390 px, tablet sekitar 768 px, dan desktop sekitar 1440 px.
2. Periksa dan langsung perbaiki responsive layout, horizontal overflow, mobile navigation, keyboard navigation, focus management, project filters, accessible lightbox, contact form states, metadata, structured data, broken links, missing assets, dan visual consistency.
3. Jika browser automation atau screenshot testing tersedia, ambil screenshot Home, Work, satu case study, About, Resume, dan Contact pada ketiga breakpoint; lalu implementasikan perbaikannya.
4. Jalankan Lighthouse atau audit ekuivalen untuk Home, Work, satu case study, dan Contact. Target semua kategori minimal 90.
5. Audit social preview. Jika memungkinkan, ganti SVG Open Graph placeholder dengan PNG lokal 1200 × 630.
6. Jangan mengarang metrik atau business impact, mempublikasikan data operasional/customer/SKU/account/credentials/private URL, atau memakai logo tanpa izin.
7. Pertahankan perbedaan Professional Experience, Project-Based Internship, Technical Assessment, dan sample/training data. Jangan menggambarkan assessment atau training project sebagai production deployment.
8. Jika PDF CV final belum tersedia, pertahankan tombol download non-broken. Jangan mengambil PDF mentah dari folder `asset/` tanpa audit dan persetujuan.
9. Jalankan:
   - `npm run check`
   - `npm run build`
   - `npm run audit:links`
   - `npm audit`
   - lint/test lain jika tersedia
10. Sebelum commit, periksa `git status`, diff, dan file yang di-stage. Pastikan tidak ada file rahasia atau aset mentah.
11. Jika semua verifikasi berhasil, commit perubahan dan push ke branch `main`. Verifikasi deployment Vercel terbaru, homepage, robots.txt, dan sitemap production.

Jangan berhenti setelah membuat rencana. Audit dan implementasikan langsung semua perbaikan yang aman. Tanyakan hanya jika ada keputusan yang benar-benar menghalangi.

Di akhir, laporkan secara ringkas perubahan, file utama, hasil check/build/audit/Lighthouse, commit dan push, status deployment, placeholder tersisa, informasi yang perlu dikonfirmasi, dan rekomendasi berikutnya.
```

## Informasi tambahan yang dapat ditambahkan

```text
Informasi/aset yang sudah dikonfirmasi:

- LinkedIn: https://www.linkedin.com/in/farihmuwaffaq/
- GitHub: [https://github.com/farihmuwaffaq](https://github.com/farihmuwaffaq)
- CV final: https://drive.google.com/file/d/1ZqhduYkG0Yln5cJ_oS0ClrGdx0FnAfMI/view?usp=sharing
- Bulan/tahun CV: July 2026
- Headshot: [path file]
- Contact form provider: [provider/endpoint]
- Custom domain: [domain]
- Sanitized project visuals: [path folder]

Audit keamanan setiap aset sebelum dipublikasikan.
```
