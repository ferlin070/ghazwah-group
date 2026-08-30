import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const initialFormData = {
  name: '',
  company: '',
  collabType: 'Kerjasama Teknologi',
  message: '',
};

const valueProps = [
  {
    icon: Sparkles,
    title: 'Automasi AI untuk operasi harian',
    description: '8 ejen AI khusus membantu kewangan, pemasaran, jualan dan sokongan teknikal secara 24/7.',
  },
  {
    icon: GitBranch,
    title: 'Sinergi ekosistem bersepadu',
    description: 'Cloud, e-dagang, pemasaran dan agroteknologi digerakkan sebagai satu rangkaian operasi.',
  },
  {
    icon: ShieldCheck,
    title: 'Produk siap skala industri',
    description: '10 penyelesaian teknologi sedia digunakan untuk PKS, F&B, servis, kesihatan dan infrastruktur.',
  },
];

const roiMetrics = [
  {
    icon: Zap,
    value: '70%',
    label: 'Penjimatan kos operasi',
    desc: 'Automasi AI mengurangkan kerja manual berulang.',
  },
  {
    icon: TrendingUp,
    value: '24/7',
    label: 'Operasi tanpa henti',
    desc: 'Sokongan AI dan cloud sentiasa tersedia.',
  },
  {
    icon: Clock,
    value: '60s',
    label: 'Web instant',
    desc: 'Idea ke laman responsif melalui prompt teks.',
  },
  {
    icon: ShieldCheck,
    value: '4',
    label: 'Cabang sinergi',
    desc: 'Satu induk menghubungkan empat operasi utama.',
  },
];

const contactCards = [
  {
    icon: MapPin,
    title: 'Pejabat & Inkubator',
    body: (
      <p>
        Inkubator DFK (Ghazwah Group),<br />
        Institut Kemahiran MARA Besut (TVETMARA Besut),<br />
        Jalan Batu Tumbuh, Alor Lintang,<br />
        22200 Kampung Raja, Terengganu.
      </p>
    ),
  },
  {
    icon: Mail,
    title: 'E-mel Rasmi',
    body: (
      <a href="mailto:ghazwahgroup@gmail.com" className="text-ghz-blue-electric transition hover:text-ghz-white">
        ghazwahgroup@gmail.com
      </a>
    ),
  },
];

export default function CollabAndContact() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const applyProductInquiry = (productName) => {
      if (!productName) return;

      setFormData((prev) => ({
        ...prev,
        message: `Saya berminat untuk mendapatkan maklumat lanjut mengenai produk: ${productName}\n\n(Boleh mula taip di sini...)`,
      }));
      setIsSubmitted(false);
    };

    const scrollToContact = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.requestAnimationFrame(() => {
        document.getElementById('hubungi')?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    };

    const applyProductPrefill = () => {
      const hash = window.location.hash;
      const queryPart = hash.includes('?') ? hash.split('?')[1] : '';
      const params = new URLSearchParams(queryPart);
      applyProductInquiry(params.get('product'));

      if (hash.startsWith('#hubungi?')) {
        scrollToContact();
      }
    };

    const handleProductInquiry = (event) => {
      applyProductInquiry(event.detail?.productName);
    };

    applyProductPrefill();
    window.addEventListener('hashchange', applyProductPrefill);
    window.addEventListener('ghazwah:product-inquiry', handleProductInquiry);
    return () => {
      window.removeEventListener('hashchange', applyProductPrefill);
      window.removeEventListener('ghazwah:product-inquiry', handleProductInquiry);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppLink = () => {
    const phone = '60195132821';
    const text = `Salam sejahtera Ghazwah Group,\n\nNama saya *${formData.name}* dari syarikat *${formData.company || 'Persendirian'}*.\n\nSaya berminat untuk berkolaborasi dalam bidang *${formData.collabType}*.\n\nMesej/Pertanyaan:\n"${formData.message}"\n\n(Dihantar dari Laman Web Korporat Ghazwah Group)`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitted(true);
    trackEvent('conversion', 'form_submit', 'Hubungi Kami');
  };

  return (
    <>
      <motion.section
        id="collab"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.55 }}
        className="section-shell border-b border-white/10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Peluang kolaborasi</p>
          <h2 className="section-title mt-3">Bina projek digital dengan rakan teknologi yang lengkap.</h2>
          <p className="section-copy mt-5">
            Ghazwah Group sesuai untuk organisasi yang memerlukan gabungan produk siap,
            infrastruktur cloud, automasi AI dan sokongan komersial dalam satu pasukan.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roiMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="surface-card-soft p-5 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-ghz-white">{metric.value}</p>
                <h3 className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ghz-gold">{metric.label}</h3>
                <p className="mt-3 text-xs leading-6 text-ghz-silver-muted">{metric.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <article key={prop.title} className="surface-card relative overflow-hidden p-6">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-ghz-blue-electric/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-ghz-blue-electric ring-1 ring-white/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ghz-white">{prop.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ghz-silver-muted">{prop.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#hubungi"
            onClick={() => trackEvent('conversion', 'cta_click', 'Collab — Bincang Peluang')}
            className="btn-primary"
          >
            <MessageSquare className="h-5 w-5" />
            Bincang Peluang Kolaborasi
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </motion.section>

      <motion.section
        id="hubungi"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.55 }}
        className="section-shell"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Mulakan perbualan</p>
          <h2 className="section-title mt-3">Hubungi pasukan Ghazwah Group.</h2>
          <p className="section-copy mt-5">
            Isi ringkasan projek dan kami akan sediakan mesej WhatsApp berstruktur untuk dihantar
            terus kepada pasukan utama Ghazwah Group.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="surface-card-soft flex gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ghz-white">{card.title}</h3>
                    <div className="mt-2 text-sm leading-7 text-ghz-silver-muted">{card.body}</div>
                  </div>
                </article>
              );
            })}

            <article className="surface-card-soft p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ghz-green/10 text-ghz-green ring-1 ring-ghz-green/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ghz-white">WhatsApp Direct</h3>
                  <p className="text-xs text-ghz-silver-muted">Talian utama untuk pertanyaan pantas.</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href="https://wa.me/60195132821"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_click', 'Talian Utama')}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ghz-silver transition hover:border-ghz-green/40 hover:text-ghz-white"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-ghz-green" />
                    Talian Utama: 019-513 2821
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/601115014037"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_click', 'Talian Kedua')}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ghz-silver transition hover:border-ghz-green/40 hover:text-ghz-white"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-ghz-green" />
                    Talian Kedua: +60 11-1501 4037
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          </div>

          <div className="surface-card relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ghz-blue-electric/10 blur-3xl" />
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ghz-silver">
                        Nama Penuh *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Contoh: Ali Bin Abu"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ghz-silver">
                        Syarikat / Organisasi
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Contoh: Maju Sdn Bhd"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-collab-type" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ghz-silver">
                      Jenis Kolaborasi
                    </label>
                    <select
                      id="contact-collab-type"
                      name="collabType"
                      value={formData.collabType}
                      onChange={handleInputChange}
                      className="input-field cursor-pointer"
                    >
                      <option value="Kerjasama Teknologi">Kerjasama Teknologi (Tech Partnership)</option>
                      <option value="Pelaburan Strategik">Pelaburan Strategik (Investment)</option>
                      <option value="Pemasaran B2B">Pemasaran & Jualan (Marketing)</option>
                      <option value="Lain-lain">Lain-lain (Others)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ghz-silver">
                      Mesej / Pertanyaan *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tulis mesej atau cadangan kolaborasi anda di sini..."
                      className="input-field resize-y"
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full">
                    Sediakan Mesej WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  className="relative z-10 flex flex-col items-center py-10 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-ghz-green/10 text-ghz-green ring-1 ring-ghz-green/20">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ghz-white">Mesej WhatsApp sudah disediakan.</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-ghz-silver-muted">
                    Maklumat ini belum dihantar ke sistem kami. Klik butang WhatsApp di bawah
                    untuk membuka mesej yang telah diisi awal dan hantar sendiri kepada pasukan Ghazwah Group.
                  </p>
                  <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('conversion', 'whatsapp_click', 'Form Success — Kirim ke WhatsApp')}
                      className="btn-primary flex-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Buka WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData(initialFormData);
                      }}
                      className="btn-secondary flex-1"
                    >
                      Isi Semula
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>
  );
}
