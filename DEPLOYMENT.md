# Panduan Penempatan (Deployment Guide) - Ghazwah Group

Dokumen ini menyediakan panduan langkah demi langkah untuk melakukan penempatan (deployment) laman web korporat Ghazwah Group.

---

## Pilihan 1: Penempatan Awan Statik (Dicadangkan: Vercel)

Vercel adalah platform paling mudah untuk menempatkan aplikasi React + Vite secara percuma dengan sokongan HTTPS automatik.

### Langkah-langkah:
1. **Sediakan Repositori Git**:
   * Tolak (push) kod laman web ini ke GitHub, GitLab, atau Bitbucket.
2. **Sambungkan ke Vercel**:
   * Log masuk ke [Vercel Dashboard](https://vercel.com).
   * Klik **"Add New"** > **"Project"** dan import repositori laman web anda.
3. **Konfigurasi Pembinaan (Build Settings)**:
   * Vercel akan mengesan projek Vite secara automatik:
     * **Framework Preset**: `Vite`
     * **Build Command**: `npm run build`
     * **Output Directory**: `dist`
4. **Masukkan Environment Variable (PENTING)**:
   * Di bawah seksyen **"Environment Variables"**, tambahkan pembolehubah berikut:
     * **Key**: `VITE_GEMINI_API_KEY`
     * **Value**: *[Masukkan API Key Gemini anda dari Google AI Studio]*
5. **Klik Deploy**:
   * Vercel akan membina dan menyediakan subdomain percuma (contoh: `ghazwahgroup.vercel.app`).
   * Anda boleh menghubungkan domain rasmi `ghazwahgroup.com` melalui tab **Settings > Domains** di Vercel.

---

## Pilihan 2: Pengehosan VPS Persendirian (Ghazwah Cloud Infra)

Sekiranya anda ingin menghostkan projek ini secara disendiri menggunakan infrastruktur **Proxmox / VPS Ubuntu** Ghazwah Cloud.

### Kaedah A: Menggunakan Nginx (Terus pada VPS)
1. **Bina Projek Tempatan**:
   ```bash
   npm run build
   ```
2. **Pindahkan fail `dist` ke Pelayan**:
   Pindahkan semua kandungan folder `dist/` ke direktori web pelayan (contoh: `/var/www/ghazwahgroup`).
3. **Konfigurasi Nginx**:
   Sediakan fail konfigurasi blok pelayan `/etc/nginx/sites-available/ghazwahgroup`:
   ```nginx
   server {
       listen 80;
       server_name ghazwahgroup.com www.ghazwahgroup.com;
       root /var/www/ghazwahgroup;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       error_page 404 /index.html;
   }
   ```
4. **Aktifkan & Uji**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ghazwahgroup /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Kaedah B: Menggunakan Docker
Kami telah menyediakan `Dockerfile` sedia ada untuk pembungkusan kontena.

1. **Bina Imej Docker**:
   ```bash
   docker build -t ghazwah-website .
   ```
2. **Jalankan Kontena**:
   ```bash
   docker run -d -p 8080:80 --name ghazwah-site-container ghazwah-website
   ```

*Nota: Pastikan API Key diuruskan menerusi parameter `-e VITE_GEMINI_API_KEY=xxx` semasa membina atau menjalankan kontena sekiranya API Key diperlukan.*

---

## Sokongan SSL/HTTPS
Bagi mana-mana pilihan penempatan, pastikan sambungan HTTPS diaktifkan (menggunakan **Let's Encrypt** di Nginx / Cloudflare Tunnels atau SSL percuma dari Vercel) bagi menjamin keselamatan data borang dan sambungan API Gemini.
