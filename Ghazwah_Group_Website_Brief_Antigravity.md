# PRD: Laman Web Korporat Ghazwah Group
**Untuk:** Antigravity (AI Coding Agent)
**Disediakan oleh:** Kaihara (Project Manager)
**Objektif:** Bina laman web korporat yang profesional, penuh animasi halus, dan dilengkapi AI chatbot — untuk menarik prospek business & collaboration (B2B/B2C, agensi kerajaan, pelabur, rakan strategik).

---

## 1. Ringkasan Projek

Ghazwah Group ialah holding company dengan 4 anak syarikat (Cloud, Store, Marketing, Agroteknologi) dan 10 produk teknologi siap (Smart Caregiver, EZOffice, CrossXPOSS, EZPos, E-Care, AI Agent, I-MEX, Web Instant, Cloud Hosting Automation, Sistem Maklum Balas QR). Laman web ini adalah **digital storefront** utama syarikat — kesan pertama untuk sesiapa yang google "Ghazwah Group".

**Kandungan penuh syarikat** (guna sebagai sumber rujukan tunggal untuk copywriting & data produk) dilampirkan dalam fail berasingan `ghazwah-company-profile.txt` — jangan reka maklumat baru, rujuk fail tersebut untuk nama, alamat, produk, dan struktur syarikat yang tepat.

## 2. Objektif Utama (Success Criteria)

1. Pelawat faham dalam 5 saat pertama: siapa Ghazwah Group & apa yang mereka buat.
2. Portfolio 10 produk dipaparkan dengan jelas, boleh ditapis ikut kategori.
3. Chatbot AI menjawab soalan asas tentang syarikat & produk tanpa perlu tunggu staff.
4. Ada CTA jelas untuk collab/business inquiry (bukan sekadar borang kontak generik).
5. Laman responsive penuh (mobile-first, sebab kebanyakan prospek Malaysia buka dari telefon).
6. Animasi menambah nilai — bukan sekadar "flashy" tanpa tujuan.

---

## 3. Arahan Reka Bentuk (Design System)

> Warna korporat sudah ditetapkan oleh brand guideline sedia ada: **Hitam, Biru, Perak, Merah**. Antigravity WAJIB ikut palet ini — jangan tukar ke tema warm-cream/terracotta generik AI.

### Token Warna
| Nama | Hex | Guna |
|---|---|---|
| `--ghz-black` | `#0A0E14` | Background utama (dark mode default) |
| `--ghz-blue-deep` | `#0F3D6E` | Warna sekunder, section alternate |
| `--ghz-blue-electric` | `#2E7CF6` | Accent utama, link, CTA |
| `--ghz-silver` | `#C4CAD3` | Teks sekunder, garis pemisah |
| `--ghz-red` | `#D62828` | Accent kritikal — CTA "Collab With Us", alert, hover state penting |
| `--ghz-white` | `#F5F7FA` | Teks utama atas background gelap |

### Tipografi
- **Display (headline):** *Space Grotesk* — geometrik, teknikal, sesuai dengan identiti "litar digital" logo GHZ.
- **Body:** *Inter* — neutral, sangat readable untuk BM & EN campur.
- **Utility/Data:** *JetBrains Mono* — untuk nombor statistik (contoh: "70% cost saving", "8 AI agents", nombor pendaftaran SSM).

### Signature Element (elemen unik yang jadi "tandatangan" laman ini)
Logo GHZ sedia ada guna motif **litar digital (circuit lines)**. Jadikan ini signature: background hero ada **animasi rangkaian litar/node** yang bergerak perlahan (ambient, bukan distracting) — garis biru elektrik menyambung dari satu node ke node lain, macam "syarikat menyambungkan pelbagai sektor perniagaan". Motif ini boleh diulang secara halus sebagai pemisah antara section (bukan background solid je).

### Struktur Layout (konsep)
```
[Nav sticky — logo kiri, menu tengah, CTA "Collab Dengan Kami" kanan (red accent)]
[HERO — animasi circuit-network, headline utama, sub-tagline, 2 CTA]
[STRIP STATISTIK — 10 produk siap / 4 anak syarikat / 2026 ditubuhkan / dsb — angka besar font mono]
[ABOUT — cerita ringkas + barisan kepimpinan + advisors]
[PORTFOLIO — grid produk, filter ikut kategori: Healthcare / Business & POS / AI & Automation / Cloud]
[ANAK SYARIKAT — 4 kad interaktif (Cloud/Store/Marketing/Agro), hover reveal detail]
[KENAPA COLLAB DENGAN KAMI — value prop untuk partner/investor, bukan customer]
[CHATBOT WIDGET — floating bottom-right, sepanjang laman]
[CONTACT — alamat, WhatsApp direct link, borang inquiry ringkas]
[FOOTER — SSM reg no, social links]
```

### Prinsip Animasi
- Guna animasi untuk **panduan perhatian**, bukan hiasan kosong: scroll-reveal untuk setiap section (fade + slide-up halus, ~400ms), hover micro-interaction pada kad produk (lift + glow biru elektrik), dan satu "moment" utama di hero (circuit network animation).
- **Elak** animasi berlebihan yang buat laman rasa "AI-generated template" — pilih SATU signature animation (circuit network) dan buat ia sangat kemas, selebihnya senyap & disiplin.
- Hormati `prefers-reduced-motion`.

---

## 4. Tech Stack Dicadangkan

- **Framework:** React + Vite (konsisten dengan projek sedia ada — Sistem Maklum Balas QR)
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion (scroll-reveal, hover states) + Canvas/SVG ringan untuk circuit-network hero animation
- **Chatbot AI:** Google Gemini API (2.0 Flash) — konsisten dengan stack sedia ada, kos rendah/percuma untuk traffic laman korporat
- **Hosting:** Boleh guna infrastruktur Proxmox/VPS sendiri (Ghazwah Cloud) ATAU Vercel/Netlify percuma untuk static+serverless — pilih ikut kesediaan domain semasa
- **Deployment domain:** cadangan `ghazwahgroup.com` atau subdomain di bawah infra Ghazwah Cloud sedia ada

---

## 5. ARAHAN SEQUENTIAL UNTUK ANTIGRAVITY

> Hantar SATU brief pada satu masa kepada Antigravity. Jangan hantar semua sekali. Setiap brief ada guardrail sendiri supaya Antigravity tak overbuild atau reka fitur luar skop.

---

### 🔹 BRIEF 1 — Project Setup & Design System Foundation

**Tugas:**
1. Setup React + Vite + Tailwind CSS project.
2. Configure Tailwind theme dengan token warna & font di atas (`tailwind.config.js` — masukkan semua custom color sebagai CSS variable, bukan hardcode hex dalam className).
3. Setup struktur folder: `/components`, `/sections`, `/data` (untuk store data produk & subsidiari sebagai JSON/JS supaya senang update), `/assets`.
4. Buat `data/products.json` — masukkan kesemua 10 produk (nama, kategori, deskripsi ringkas, ciri utama) berdasarkan company profile yang dilampirkan.
5. Buat `data/subsidiaries.json` untuk 4 anak syarikat.
6. Setup base layout component (Navbar + Footer shell — belum perlu content penuh lagi).

**Guardrail:**
- JANGAN reka data produk/syarikat baru yang tiada dalam sumber rujukan.
- JANGAN install animation library lagi di brief ini — fokus struktur dulu.
- Pastikan semua warna guna CSS variable (`var(--ghz-blue-electric)` dsb), bukan hex terus dalam component.

---

### 🔹 BRIEF 2 — Hero Section + Navigation + Signature Animation

**Tugas:**
1. Bina Navbar sticky: logo, menu (Tentang / Portfolio / Anak Syarikat / Collab / Hubungi), CTA button "Collab Dengan Kami" (warna merah accent).
2. Bina Hero section dengan:
   - Headline utama (contoh tone: "Memacu Transformasi Digital Malaysia — Satu Ekosistem, Pelbagai Industri")
   - Sub-tagline pendek
   - 2 CTA: "Lihat Portfolio Kami" (primary) & "Jom Collab" (secondary/outline)
   - Animasi background circuit-network (Canvas atau SVG + JS) — node bersambung, bergerak perlahan, warna biru elektrik atas background hitam.
3. Statistik strip di bawah hero: "10+ Produk Siap", "4 Anak Syarikat", "Ditubuhkan 2026", "8 Ejen AI 24/7" — guna font mono, animate count-up bila scroll masuk viewport.

**Guardrail:**
- Animasi circuit-network mesti performant — test tak lag pada mobile mid-range.
- Hormati `prefers-reduced-motion`: kalau user set tu, hero jadi static image/gradient je.
- Jangan letak lebih dari SATU animasi besar di hero — elak "over-decorated" look.

---

### 🔹 BRIEF 3 — About, Portfolio Grid & Anak Syarikat Sections

**Tugas:**
1. **Section About:** cerita ringkas syarikat, visi, barisan kepimpinan (3 pengasas) & advisors — guna card layout kemas, bukan senarai bullet je.
2. **Section Portfolio:** grid produk (dari `products.json`), dengan filter tab ikut kategori (Healthcare Tech / Business & POS / AI & Automation / Cloud). Setiap kad produk: nama, satu baris deskripsi, badge kategori, hover = lift + glow effect.
3. **Section Anak Syarikat:** 4 kad interaktif (Ghazwah Cloud, Store, Marketing, Agroteknologi) — klik/hover reveal butiran servis di bawah setiap satu.
4. Scroll-reveal animation (fade + slide-up) untuk setiap section guna Framer Motion.

**Guardrail:**
- Filter portfolio mesti berfungsi dengan state React biasa (useState) — jangan overengineer dengan routing.
- Pastikan grid produk responsive: 1 kolum mobile, 2 tablet, 3-4 desktop.
- JANGAN guna numbered badges (01/02/03...) melainkan ia betul-betul rujuk susunan kategori sedia ada dalam company profile.

---

### 🔹 BRIEF 4 — AI Chatbot Integration

**Tugas:**
1. Bina floating chat widget (bottom-right, sepanjang laman, boleh minimize/expand).
2. Backend: panggil Google Gemini API (2.0 Flash) dengan system prompt yang mengandungi RINGKASAN company profile penuh (produk, anak syarikat, kepimpinan, contact info) — supaya chatbot boleh jawab soalan pelawat tentang syarikat & produk.
3. Chatbot kekal dalam scope: soalan tentang syarikat/produk/collab. Kalau soalan luar topik, arah balik ke isu perniagaan atau cadangkan hubungi terus WhatsApp syarikat.
4. Nama & persona chatbot: cadangan nama neutral yang tak clash dengan nama AI agent sedia ada (Zara/Aiman/Maya/Hakim sudah digunakan untuk produk AI Agent Command Center) — contoh: **"GIA" (Ghazwah Intelligent Assistant)**.
5. Sediakan quick-reply buttons untuk soalan lazim: "Apa produk anda?", "Macam mana nak collab?", "Boleh saya hubungi terus?"

**Guardrail:**
- API key JANGAN hardcode dalam frontend — guna environment variable / serverless function proxy (contoh: Vercel Edge Function atau Pipedream) supaya key tak terdedah di client-side.
- Chatbot mesti ada fallback message kalau API gagal/timeout — jangan biar UI hang.
- Rate limit sederhana untuk elak abuse (contoh: max sekian mesej seminit setiap sesi).

---

### 🔹 BRIEF 5 — Collab CTA, Contact, Footer, SEO & Deployment

**Tugas:**
1. **Section "Kenapa Collab Dengan Kami":** value proposition untuk partner/investor (bukan customer biasa) — highlight 70% cost saving AI Agent, ekosistem bersepadu, track record 10 produk siap.
2. **Section Contact:** alamat penuh, direct WhatsApp click-to-chat link (`https://wa.me/60195132821` & nombor kedua), e-mel, borang inquiry ringkas (nama, syarikat, jenis collab, mesej).
3. **Footer:** nama berdaftar SSM (GHAZWAH TRADING, 202603084068), tagline, social links placeholder.
4. SEO basics: meta title/description, Open Graph tags, favicon dari logo GHZ.
5. Deployment: build production, sediakan `.env.example` untuk API keys, dokumentasikan langkah deploy (Vercel/VPS ikut keputusan akhir).

**Guardrail:**
- Borang inquiry: jangan hantar terus ke email dari client-side (elak spam/expose email) — guna serverless function atau service seperti Formspree/Pipedream.
- Pastikan semua CTA button ("Collab Dengan Kami") konsisten warna & wording sepanjang laman — jangan variasi tanpa sebab.
- Test lighthouse score asas (performance & accessibility) sebelum deploy akhir.

---

## 6. Guardrail Am (Untuk Semua Brief)

- Antigravity kekal dalam scope brief semasa — jangan build feature dari brief seterusnya sebelum diarah.
- Semua copy (teks laman) kena tulis dalam **Bahasa Malaysia sebagai bahasa utama**, dengan opsyen toggle EN kalau nak (rujuk projek Sistem Maklum Balas QR yang dah ada BM/EN toggle — boleh reuse pattern sama kalau sesuai).
- Jangan reka data syarikat/produk baru — rujuk fail company profile sahaja.
- Setiap brief selesai, Antigravity patut report apa yang siap + screenshot/preview sebelum brief seterusnya dihantar.
