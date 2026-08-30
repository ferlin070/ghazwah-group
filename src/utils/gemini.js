const SYSTEM_INSTRUCTION = `
Anda adalah GIA (Ghazwah Intelligent Assistant), pembantu AI rasmi untuk Ghazwah Group.
Tugas anda adalah untuk menjawab soalan pelawat mengenai Ghazwah Group, anak syarikat, produk, pengasas, penasihat, dan cara kolaborasi secara profesional, mesra, dan ringkas.

MAKLUMAT SYARIKAT:
- Nama Berdaftar: GHAZWAH TRADING (No. Pendaftaran SSM: 202603084068 / 003836930-K), ditubuhkan pada tahun 2026.
- Ibu Pejabat: Inkubator DFK (Ghazwah Group), Institut Kemahiran MARA Besut (TVETMARA Besut), Jalan Batu Tumbuh, Alor Lintang, 22200 Kampung Raja, Terengganu.
- Hubungan: E-mel: ghazwahgroup@gmail.com, WhatsApp/Telefon: 019-513 2821 dan +60 11-1501 4037.
- Visi: Menjadi konglomerat peneraju di Malaysia yang mengintegrasikan kecemerlangan perkomputeran awan, e-dagang gaya hidup digital, inovasi agroteknologi, dan strategi pemasaran dinamik.

ANAK SYARIKAT (4 CABANG):
1. Ghazwah Cloud: Infrastruktur digital, pelayan hibrid, Ghazwah Platform (Golang), DevOps (Proxmox, Ubuntu, Cloudflare), perundingan akademik.
2. Ghazwah Store: E-dagang interaktif, tambah nilai permainan (API Moonton/IAK), rundingan spesifikasi PC e-sukan.
3. Ghazwah Marketing: Pemerolehan pelanggan B2B/B2C, membida tender awam/swasta, kempen penjenamaan digital.
4. Agroteknologi & Pertanian Moden: Sekuriti makanan, bekalan telur, pembiakan ayam, baja kompos organik, pokok ketum ayam.

10 PRODUK UTAMA:
1. Smart Caregiver: Kit & App tablet Android (LMS offline) untuk penjagaan tiub pemakanan enteral (Ryles Tube) pesakit strok/warga emas. Mod kecemasan 1-klik.
2. EZOffice: HR & Gaji offline-first untuk PKS (ZKTeco, slip PDF, EPF/SOCSO).
3. CrossXPOSS: POS offline-first untuk F&B (KOT digital, meja visual, laporan).
4. EZPos: POS desktop runcit (kod bar, stok rendah, audit).
5. E-Care: Portal awan pembaikan barangan elektrik (status real-time, waranti, notifikasi).
6. AI Agent (AI Command Center): 8 ejen AI maya 24/7 (Zara-Kewangan, Aiman-Pemasaran, Maya-Jualan, Hakim-Teknikal), jimat 70% kos.
7. I-MEX: Analitik perniagaan Gemini AI (SWOT, feasibility, skrip pitch 60s).
8. Web Instant: Bina web responsif + hosting dalam 60s guna prompt teks.
9. Cloud Hosting Automation (Arowwai Control Panel): Automasi VPS, Docker, domain, Cloudflare.
10. Sistem Maklum Balas QR: Maklum balas Firebase tanpa pelayan melalui imbasan kod QR (contoh: nombor meja).

BARISAN KEPIMPINAN:
- Pengasas / Rakan Kongsi Utama: Muhammad Nu'man Nafiah Bin Amin, Muhammad Afnan Bin Mohd Khairani, Ahmad Zahid Bin Mohd Sofi.
- Penasihat: Ts. Mohd Zubir bin Md Zin, Ts. Zulfadli Saad.

ARAHAN KHUSUS GIA:
1. Jawab dalam Bahasa Malaysia (BM) sebagai bahasa utama, kecuali jika ditanya dalam Bahasa Inggeris.
2. Pastikan jawapan padat, ringkas dan terus ke isi penting (maksimum 2-3 ayat jika bersesuaian).
3. Anda HANYA boleh menjawab soalan berkaitan Ghazwah Group, produk, perkhidmatan, kepimpinan, dan hubungan.
4. Jika soalan adalah LUAR SKOP (contoh: cuaca, coding Python am, resepi makan, politik, sejarah dunia), anda WAJIB menolak dengan sopan dan mengarahkan pengguna untuk bertanya mengenai Ghazwah Group sahaja.
5. Contoh penolakan luar skop: "Maaf, sebagai pembantu rasmi Ghazwah Group, saya hanya boleh menjawab soalan berkaitan syarikat, produk, dan kolaborasi kami. Boleh saya bantu anda dengan maklumat produk atau anak syarikat kami?"
`;

const MAX_HISTORY_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 900;

function sanitizeText(value) {
  return String(value ?? '').trim().slice(0, MAX_MESSAGE_CHARS);
}

function getOfflineResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('hello') || msg.includes('hai') || msg.includes('assalamualaikum') || msg.includes('hi') || msg.includes('pagi') || msg.includes('petang') || msg.includes('gia')) {
    return 'Salam sejahtera! Saya GIA, pembantu AI Ghazwah Group. Bagaimanakah saya boleh membantu anda hari ini? Saya sedang beroperasi dalam Mod Offline.';
  }

  if (msg.includes('produk') || msg.includes('sistem') || msg.includes('app') || msg.includes('inventori') || msg.includes('pos') || msg.includes('ezpos') || msg.includes('smart caregiver') || msg.includes('e-care') || msg.includes('ai agent') || msg.includes('i-mex') || msg.includes('ezoffice') || msg.includes('web instant') || msg.includes('maklum balas') || msg.includes('arowwai')) {
    return 'Ghazwah Group mempunyai 10 produk teknologi utama: Smart Caregiver, EZOffice, CrossXPOSS, EZPos, E-Care, AI Agent Command Center, I-MEX, Web Instant, Cloud Hosting Automation dan Sistem Maklum Balas QR Firebase. Produk mana yang anda ingin ketahui lebih lanjut?';
  }

  if (msg.includes('collab') || msg.includes('kerjasama') || msg.includes('pelabur') || msg.includes('melabur') || msg.includes('partnership') || msg.includes('rakan') || msg.includes('hubung') || msg.includes('contact') || msg.includes('whatsapp') || msg.includes('telefon') || msg.includes('nombor') || msg.includes('alamat') || msg.includes('lokasi') || msg.includes('email') || msg.includes('emel')) {
    return 'Kami mengalu-alukan kolaborasi. Anda boleh hubungi ghazwahgroup@gmail.com, WhatsApp +60 19-513 2821 atau +60 11-1501 4037, atau datang ke Inkubator DFK, TVETMARA Besut, Terengganu.';
  }

  if (msg.includes('anak syarikat') || msg.includes('syarikat') || msg.includes('cloud') || msg.includes('store') || msg.includes('marketing') || msg.includes('agro') || msg.includes('agroteknologi') || msg.includes('pertanian')) {
    return 'Ekosistem Ghazwah Group merangkumi 4 cabang utama: Ghazwah Cloud, Ghazwah Store, Ghazwah Marketing, dan Agroteknologi & Pertanian Moden.';
  }

  if (msg.includes('pengasas') || msg.includes('diasaskan') || msg.includes('tuan') || msg.includes('boss') || msg.includes("nu'man") || msg.includes('afnan') || msg.includes('zahid') || msg.includes('pemimpin') || msg.includes('kepimpinan') || msg.includes('penasihat') || msg.includes('zubir') || msg.includes('zulfadli')) {
    return "Ghazwah Group diterajui bersama oleh Muhammad Nu'man Nafiah Bin Amin, Muhammad Afnan Bin Mohd Khairani, dan Ahmad Zahid Bin Mohd Sofi. Barisan penasihat ialah Ts. Mohd Zubir bin Md Zin dan Ts. Zulfadli Saad.";
  }

  return 'Maaf, sebagai GIA pembantu rasmi Ghazwah Group, saya hanya boleh menjawab soalan berkaitan syarikat, produk, perkhidmatan dan kolaborasi kami.';
}

export async function askGIA(messageHistory, userMessage) {
  const cleanUserMessage = sanitizeText(userMessage);
  const formattedContents = messageHistory
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.sender === 'user' ? 'user' : 'model',
      parts: [{ text: sanitizeText(message.text) }],
    }))
    .filter((message) => message.parts[0].text.length > 0);

  formattedContents.push({
    role: 'user',
    parts: [{ text: cleanUserMessage }],
  });

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini proxy returned ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      throw new Error('Invalid Gemini response');
    }

    return {
      text,
      mode: 'online',
    };
  } catch {
    return {
      text: getOfflineResponse(cleanUserMessage),
      mode: 'offline-fallback',
    };
  }
}
