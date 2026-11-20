# Resume & About: PPM Master's Degree Completion Update

## Goal

Reflect the completion of the Master of Management degree at PPM School of Management (September 2024 — September 2026) on the public site, and ship the latest CV PDF for download.

## Scope

- `public/Farih-Muwaffaq-Resume.pdf` — replaced with the October 2026 revision of the CV.
- `src/pages/resume.astro` — education entries for PPM School of Management and Institut Teknologi Bandung.
- `src/pages/about.astro` — Foundation zone entries for PPM School of Management and Institut Teknologi Bandung.

## Changes

### 1. CV PDF Asset

- Replaced `public/Farih-Muwaffaq-Resume.pdf` with the latest revision (139,307 bytes, dated 20 Nov 2026).
- Existing download links pointing to `/Farih-Muwaffaq-Resume.pdf` now serve the new file without any markup changes.

### 2. `resume.astro` — Education Entry

| Field | Before | After |
| --- | --- | --- |
| Period | `Jan 2026 — present` | `Sep 2024 — Sep 2026` |
| Description | "Current study focused on strategy, management, and business decision-making." | "Financial Management concentration · GPA 3.78/4.00 · Thesis: *Risk Assessment and Stress Testing of Bank Jago Tbk Resilience (2026–2027)*." |

### 3. `about.astro` — Foundation Zone Entry

| Field | Before | After |
| --- | --- | --- |
| Label | `Management / current` | `Management / completed` |
| Body | "Master of Management, January 2026 — present. Extending technical analysis through commercial, strategic, and organizational context." | "Master of Management, September 2024 — September 2026. Financial Management concentration, GPA 3.78/4.00. Thesis on *Risk Assessment and Stress Testing of Bank Jago Tbk Resilience* — analyzing 24 risks across 8 categories and stress-testing credit, market, and liquidity resilience under OJK/BI thresholds." |

### 4. ITB — Undergraduate Thesis Title (follow-up, same day)

Added the S1 thesis title to both education entries, per user request. Format decision: English translation on `resume.astro`, original Indonesian on `about.astro` (mirroring the bilingual tone of the rest of the site).

| File | Before | After |
| --- | --- | --- |
| `resume.astro` | "Systems-oriented foundation spanning resource constraints, evidence, and long-term outcomes." | "Thesis: *Comparison of Soil Physicochemical Characteristics Across Revegetation Ages at Kelubir Site, PT Pesona Khatulistiwa Nusantara, Bulungan, North Kalimantan*." |
| `about.astro` | "Bachelor of Forestry Engineering, 2019 — 2023. A systems foundation shaped by interconnected resources, constraints, evidence, and long-term outcomes." | "Bachelor of Forestry Engineering, 2019 — 2023. Undergraduate thesis: *Perbandingan Karakteristik Fisik Kimia Tanah pada Lahan dengan Umur Revegetasi Berbeda di Site Kelubir PT Pesona Khatulistiwa Nusantara, Bulungan, Kalimantan Utara*." |

- Deployed via commit `eab24f5` (`feat(education): add ITB undergraduate thesis title to resume and about`), pushed to `origin/main`.
- Build verified: 15 pages, no errors.

## Thesis Reference (for future edits)
- **Title:** Risk Assessment and Stress Testing of Bank Jago Tbk Resilience, 2026–2027 period.
- **Method:** Descriptive-qualitative with quantitative support; secondary data from the 2025 Annual Report, OJK regulations, and Bank Indonesia publications.
- **Findings:** 24 individual risks across 8 categories; 3 rated very high (platform failure, GoTo ecosystem concentration, digital bank competition); 12 rated high.
- **Stress test (moderate scenario):** credit risk NPL 1.5% vs OJK threshold 5%; market risk NIM 7.0%; liquidity risk LDR 82% vs BI threshold 92%; CAR 44.4%.
- **Vulnerabilities:** operational, reputational, and strategic risks; critical cascade path operational failure → reputational decline → DPK withdrawal → liquidity pressure.
- **Keywords:** risk assessment, stress testing, digital bank, Bank Jago, operational risk, Key Risk Indicator, stressed risk map, digital ecosystem.

## Verification

- `npm run build` completed successfully: 15 pages built, sitemap generated, no errors.
- Deployed via commit `670ea66` (`feat(resume): update CV PDF and mark PPM Master's degree completed (Sep 2024 - Sep 2026)`), pushed to `origin/main`.

## Notes

- The PDF source file could not be parsed in-session (no PDF input support); website copy was written from user-supplied details rather than extracted from the PDF.
- Initial draft used `Jan 2026` as the start date based on the pre-existing placeholder; corrected to `Sep 2024` per user confirmation before deploy.
