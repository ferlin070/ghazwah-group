import React from 'react';

const items = [
  {
    title: 'Maklumat Umum',
    text: 'Maklumat di laman web ini disediakan untuk tujuan maklumat umum sahaja mengenai Ghazwah Group (Ghazwah Trading) dan produk serta perkhidmatannya. Ia bukan nasihat profesional, kewangan, perundangan, atau teknikal, dan tidak membentuk sebarang kontrak.',
  },
  {
    title: 'Ketepatan Maklumat',
    text: 'Ghazwah Group berusaha memastikan maklumat di laman ini tepat dan terkini, tetapi tidak menjamin bahawa semua maklumat adalah lengkap, tepat, atau bebas daripada kesilapan. Ciri produk, harga, dan ketersediaan boleh berubah tanpa notis.',
  },
  {
    title: 'Pautan Luar',
    text: 'Laman ini mungkin mengandungi pautan ke laman pihak ketiga, termasuk WhatsApp. Ghazwah Group tidak mengawal kandungan laman pihak ketiga dan tidak bertanggungjawab terhadap kandungan, dasar privasi, atau amalan laman tersebut.',
  },
  {
    title: 'Had Liabiliti',
    text: 'Setakat yang dibenarkan oleh undang-undang, Ghazwah Group tidak bertanggungjawab atas sebarang kerugian atau kerosakan yang timbul daripada penggunaan laman ini atau kebergantungan kepada maklumat di dalamnya.',
  },
  {
    title: 'Hubungi Kami',
    text: 'Untuk sebarang pertanyaan mengenai penafian ini, hubungi kami di ghazwahgroup@gmail.com atau melalui bahagian Hubungi di laman ini.',
  },
];

export default function Penafian() {
  return (
    <section id="penafian" className="section-shell py-12 md:py-16">
      <p className="section-eyebrow">Penafian</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ghz-white">
        Penafian
      </h2>
      <p className="section-copy mt-3 max-w-3xl">
        Halaman ini menerangkan had dan syarat penggunaan maklumat yang dipaparkan di laman web Ghazwah Group.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="surface-card p-6">
            <h3 className="font-display text-lg font-semibold text-ghz-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ghz-silver-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
