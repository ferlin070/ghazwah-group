import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, GitBranch, ShieldCheck, Mail, MapPin, Phone, MessageSquare, ExternalLink, CheckCircle, TrendingUp, Clock, Zap } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function CollabAndContact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    collabType: 'Kerjasama Teknologi',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Parse ?product= query from hash fragment (#hubungi?product=...)
  // Portfolio CTAs link to this format so the product name is pre-filled.
  useEffect(() => {
    const hash = window.location.hash;                      // e.g. "#hubungi?product=Smart+Caregiver"
    const queryPart = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryPart);
    const productName = params.get('product');
    if (productName) {
      setFormData(prev => ({
        ...prev,
        message: `Saya berminat untuk mendapatkan maklumat lanjut mengenai produk: ${productName}\n\n(Boleh mula taip di sini...)`
      }));
    }
  }, []);

  const valueProps = [
    {
      icon: <Sparkles className="w-6 h-6 text-ghz-red" />,
      title: "Penjimatan Kos AI Ejen 70%",
      description: "Automasi kerja pintar 24/7 menggunakan 8 ejen AI khusus (termasuk kewangan, pemasaran, dan jualan) yang mengurangkan kos operasi sehingga 70%."
    },
    {
      icon: <GitBranch className="w-6 h-6 text-ghz-blue-electric" />,
      title: "Sinergi Ekosistem Bersepadu",
      description: "Integrasi menyeluruh 4 anak syarikat merentasi DevOps Cloud, e-dagang gaya hidup, agroteknologi moden, dan pemasaran digital melahirkan ekosistem berimpak tinggi."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "10 Produk Siap Skala Industri",
      description: "Keupayaan teknikal yang terbukti menerusi kejayaan melancarkan 10 produk teknologi siap untuk menyokong operasi PKS, hospitaliti, dan agrikultur."
    }
  ];

  const roiMetrics = [
    {
      icon: <Zap className="w-5 h-5 text-ghz-blue-electric" />,
      value: '70%',
      label: 'Penjimatan Kos Operasi',
      desc: 'Automasi AI menggantikan kerja manual berulang'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      value: '24/7',
      label: 'Operasi Tanpa Henti',
      desc: 'Ejen AI dan infrastruktur awan bertindak 24 jam sehari'
    },
    {
      icon: <Clock className="w-5 h-5 text-ghz-red" />,
      value: '10x',
      label: 'Kepantasan Pembangunan',
      desc: 'Daripada idea ke produk siap dalam masa 60 saat (Web Instant)'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      value: '4',
      label: 'Cabang Sinergi',
      desc: '4 anak syarikat beroperasi di bawah satu ekosistem bersepadu'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setIsSubmitted(true);
    trackEvent('conversion', 'form_submit', 'Hubungi Kami');
  };

  // Generate pre-filled WhatsApp link
  const getWhatsAppLink = () => {
    const phone = "60195132821"; // Talian Utama
    const text = `Salam sejahtera Ghazwah Group,\n\nNama saya *${formData.name}* dari syarikat *${formData.company || 'Persendirian'}*.\n\nSaya berminat untuk berkolaborasi dalam bidang *${formData.collabType}*.\n\nMesej/Pertanyaan:\n"${formData.message}"\n\n(Dihantar dari Laman Web Korporat Ghazwah Group)`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <>
      {/* SECTION: Kenapa Collab Dengan Kami — now with ROI metrics strip */}
      <motion.section
        id="collab"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-ghz-silver/5"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-ghz-red tracking-[0.2em] uppercase block mb-2">
            PELUANG PERTUMBUHAN & KOLABORASI
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-4">
            ROI & <span className="text-ghz-blue-electric">Kelebihan Strategik</span>
          </h2>
          <p className="font-sans text-sm text-ghz-silver/70 max-w-xl mx-auto">
            Kami buktikan nilai kolaborasi dengan data — bukan sekadar janji.
          </p>
          <div className="w-16 h-1 bg-ghz-blue-electric mx-auto rounded-full mt-4"></div>
        </div>

        {/* ROI Metrics Strip — animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {roiMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-ghz-blue-deep/10 border border-ghz-silver/10 rounded-xl p-6 text-center hover:border-ghz-blue-electric/30 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-lg bg-ghz-black/50 border border-ghz-silver/5">
                  {metric.icon}
                </div>
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-ghz-white tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="font-display font-semibold text-xs text-ghz-white/90 uppercase tracking-wider mb-1">
                {metric.label}
              </div>
              <p className="font-sans text-[10px] text-ghz-silver/60 leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Value Props Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {valueProps.map((prop, idx) => (
            <div
              key={idx}
              className="bg-ghz-blue-deep/10 border border-ghz-silver/10 hover:border-ghz-blue-electric/30 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-ghz-blue-electric/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-3 rounded-lg bg-ghz-black/50 border border-ghz-silver/5 w-fit mb-6">
                {prop.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-ghz-white mb-3">
                {prop.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ghz-silver/70 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mid-section Trust CTA */}
        <div className="text-center">
          <a
            href="#hubungi"
            onClick={() => trackEvent('conversion', 'cta_click', 'Collab — Bincang Peluang')}
            className="inline-flex items-center gap-2 bg-ghz-red hover:bg-ghz-red/90 text-ghz-white px-8 py-4 rounded-md text-base font-bold transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-ghz-red/20 btn-gradient"
          >
            <MessageSquare className="w-5 h-5" />
            Bincang Peluang Kolaborasi
          </a>
        </div>
      </motion.section>

      {/* SECTION: Hubungi Kami — with 'Book a Call' prompt */}
      <motion.section
        id="hubungi"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-ghz-blue-electric tracking-[0.2em] uppercase block mb-2">
            MULAKAN PERBUALAN
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-4">
            Hubungi <span className="text-ghz-blue-electric">Kami</span>
          </h2>
          <p className="font-sans text-sm text-ghz-silver/70 max-w-xl mx-auto">
            Isi borang di bawah atau terus WhatsApp kami. Maklum balas dalam masa 24 jam.
          </p>
          <div className="w-16 h-1 bg-ghz-blue-electric mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Address */}
            <div className="bg-ghz-blue-deep/10 border border-ghz-silver/10 rounded-xl p-6 flex gap-4 items-start">
              <div className="p-2.5 rounded bg-ghz-blue-deep/40 text-ghz-blue-electric flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>                    <h3 className="font-display font-semibold text-sm text-ghz-white mb-1">Pejabat & Inkubator</h3>
                <p className="font-sans text-xs sm:text-sm text-ghz-silver/70 leading-relaxed">
                  Inkubator DFK (Ghazwah Group),<br />
                  Institut Kemahiran MARA Besut (TVETMARA Besut),<br />
                  Jalan Batu Tumbuh, Alor Lintang,<br />
                  22200 Kampung Raja, Terengganu.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-ghz-blue-deep/10 border border-ghz-silver/10 rounded-xl p-6 flex gap-4 items-start">
              <div className="p-2.5 rounded bg-ghz-blue-deep/40 text-ghz-blue-electric flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>                    <h3 className="font-display font-semibold text-sm text-ghz-white mb-1">E-mel Rasmi</h3>
                <a href="mailto:ghazwahgroup@gmail.com" className="font-mono text-xs sm:text-sm text-ghz-blue-electric hover:underline block mt-1">
                  ghazwahgroup@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp Buttons */}
            <div className="bg-ghz-blue-deep/10 border border-ghz-silver/10 rounded-xl p-6">
              <div className="flex gap-4 items-start mb-4">
                <div className="p-2.5 rounded bg-ghz-blue-deep/40 text-ghz-blue-electric flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>                    <h3 className="font-display font-semibold text-sm text-ghz-white mb-1">WhatsApp Direct</h3>
                  <p className="font-sans text-xs text-ghz-silver/50 leading-tight">
                    Sila hubungi talian sokongan kami di bawah:
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/60195132821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('conversion', 'whatsapp_click', 'Talian Utama')}
                className="flex items-center justify-between bg-ghz-black border border-ghz-silver/10 hover:border-emerald-500/50 hover:bg-emerald-950/10 px-4 py-3 rounded-lg text-xs font-mono text-ghz-silver hover:text-white transition-all"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  Talian Utama: 019-513 2821
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/601115014037"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('conversion', 'whatsapp_click', 'Talian Kedua')}
                className="flex items-center justify-between bg-ghz-black border border-ghz-silver/10 hover:border-emerald-500/50 hover:bg-emerald-950/10 px-4 py-3 rounded-lg text-xs font-mono text-ghz-silver hover:text-white transition-all"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  Talian Kedua: +60 11-1501 4037
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-ghz-blue-deep/10 border border-ghz-silver/10 rounded-xl p-8 backdrop-blur-sm w-full relative">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-ghz-silver mb-2">
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
                        className="w-full px-4 py-3 bg-ghz-black/50 border border-ghz-silver/15 focus:border-ghz-blue-electric rounded text-sm text-ghz-white outline-none transition-all placeholder-ghz-silver/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-mono uppercase tracking-wider text-ghz-silver mb-2">
                        Syarikat / Organisasi
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Contoh: Maju Sdn Bhd"
                        className="w-full px-4 py-3 bg-ghz-black/50 border border-ghz-silver/15 focus:border-ghz-blue-electric rounded text-sm text-ghz-white outline-none transition-all placeholder-ghz-silver/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-collab-type" className="block text-xs font-mono uppercase tracking-wider text-ghz-silver mb-2">
                      Jenis Kolaborasi
                    </label>
                    <select
                      id="contact-collab-type"
                      name="collabType"
                      value={formData.collabType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ghz-black border border-ghz-silver/15 focus:border-ghz-blue-electric rounded text-sm text-ghz-white outline-none transition-all cursor-pointer"
                    >
                      <option value="Kerjasama Teknologi">Kerjasama Teknologi (Tech Partnership)</option>
                      <option value="Pelaburan Strategik">Pelaburan Strategik (Investment)</option>
                      <option value="Pemasaran B2B">Pemasaran & Jualan (Marketing)</option>
                      <option value="Lain-lain">Lain-lain (Others)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-ghz-silver mb-2">
                      Mesej / Pertanyaan *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tulis mesej atau cadangan kolaborasi anda di sini..."
                      className="w-full px-4 py-3 bg-ghz-black/50 border border-ghz-silver/15 focus:border-ghz-blue-electric rounded text-sm text-ghz-white outline-none transition-all placeholder-ghz-silver/30 resize-y"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ghz-red hover:bg-ghz-red/90 text-ghz-white py-3.5 rounded font-display font-semibold transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-ghz-red/10 flex items-center justify-center gap-2 btn-gradient"
                  >
                    Hantar Pertanyaan
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center gap-6"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <div>
                    <h3 className="font-display font-bold text-xl text-ghz-white mb-2">
                      Permohonan Berjaya Dihantar!
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-ghz-silver/70 max-w-md mx-auto leading-relaxed">
                      Maklumat anda telah direkodkan dalam sistem. Untuk maklum balas segera 24/7, sila klik butang di bawah untuk menghantar mesej terus ke WhatsApp kami.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('conversion', 'whatsapp_click', 'Form Success — Kirim ke WhatsApp')}
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-ghz-white px-6 py-3.5 rounded font-display font-semibold transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Kirim ke WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', company: '', collabType: 'Kerjasama Teknologi', message: '' });
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center text-xs text-ghz-silver/50 hover:text-white px-4 py-2 hover:bg-ghz-blue-deep/30 rounded transition-all font-mono"
                    >
                      ISI BORANG SEMULA
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
