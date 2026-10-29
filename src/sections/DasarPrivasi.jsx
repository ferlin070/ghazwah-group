import React from 'react';

const items = [
  {
    title: 'Maklumat Yang Dikumpul',
    text: 'Laman ini mungkin mengumpul maklumat yang anda berikan secara sukarela melalui borang hubungi atau WhatsApp, seperti nama, nama syarikat, dan mesej anda. Laman ini juga mungkin mengumpul data penggunaan asas melalui alat analitik untuk memahami cara laman digunakan.',
  },
  {
    title: 'Tujuan Penggunaan',
    text: 'Maklumat yang dikumpul digunakan untuk menjawab pertanyaan, membincangkan projek atau peluang kolaborasi, dan menambah baik laman web serta perkhidmatan kami. Maklumat anda tidak akan dijual kepada pihak ketiga.',
  },
  {
    title: 'Chatbot GIA Assistant',
    text: 'Perbualan dengan chatbot di laman ini digunakan untuk membantu menjawab soalan anda. Jangan kongsikan maklumat sensitif seperti kata laluan, nombor kad, atau maklumat perbankan melalui chatbot atau borang hubungi.',
  },
  {
    title: 'Pautan Pihak Ketiga',
    text: 'Pautan ke WhatsApp dan laman pihak ketiga tertakluk kepada dasar privasi pihak tersebut. Ghazwah Group tidak bertanggungjawab terhadap amalan privasi laman atau perkhidmatan pihak ketiga.',
  },
  {
    title: 'Keselamatan Dan Hak Anda',
    text: 'Kami mengambil langkah yang munasabah untuk melindungi maklumat anda, tetapi tiada kaedah penghantaran melalui internet yang sepenuhnya selamat. Anda boleh menghubungi kami di ghazwahgroup@gmail.com untuk bertanya tentang maklumat anda atau meminta pembetulan.',
  },
];

export default function DasarPrivasi() {
  return (
    <section id="dasar-privasi" className="section-shell py-12 md:py-16">
      <p className="section-eyebrow">Dasar Privasi</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ghz-white">
        Dasar Privasi
      </h2>
      <p className="section-copy mt-3 max-w-3xl">
        Dasar ini menerangkan maklumat yang dikumpul melalui laman web Ghazwah Group dan cara maklumat tersebut digunakan.
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
