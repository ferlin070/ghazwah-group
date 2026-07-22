import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target, Users, BookOpen, ShieldCheck,
  Sparkles, Zap, Handshake, Rocket,
  Calendar, Building2, Package, Globe,
  ChevronRight, Quote
} from 'lucide-react';

// Team photos — imported directly from assets
import imgNuaman from '../assets/MUHAMMAD NU\'MAN NAFIAH BIN AMIN.png';
import imgAfnan from '../assets/MUHAMMAD AFNAN BIN MOHD KHAIRANI.png';
import imgZahid from '../assets/AHMAD ZAHID BIN MOHAMAD SOFI.jpeg';
import imgZubir from '../assets/SIR ZUBIR.jpeg';
import imgZulfadli from '../assets/SIR ZULFADLI.jpg';

// Map full names to their image imports
const teamPhotos = {
  "Muhammad Nu'man Nafiah Bin Amin": imgNuaman,
  "Muhammad Afnan Bin Mohd Khairani": imgAfnan,
  "Ahmad Zahid Bin Mohd Sofi": imgZahid,
  "Ts. Mohd Zubir bin Md Zin": imgZubir,
  "Ts. Zulfadli Saad": imgZulfadli,
};

// ——— DATA ———

const partners = [
  { name: "Muhammad Nu'man Nafiah Bin Amin", role: "Rakan Kongsi Utama / Pengasas" },
  { name: "Muhammad Afnan Bin Mohd Khairani", role: "Rakan Kongsi Utama / Pengasas" },
  { name: "Ahmad Zahid Bin Mohd Sofi", role: "Rakan Kongsi Utama / Pengasas" }
];

const advisors = [
  { name: "Ts. Mohd Zubir bin Md Zin", role: "Penasihat Teknikal & Akademik" },
  { name: "Ts. Zulfadli Saad", role: "Penasihat Strategik & Industri" }
];

const milestones = [
  { year: '2026', title: 'Penubuhan Ghazwah Group', desc: 'Ghazwah Trading didaftarkan dengan SSM Malaysia. Satu ekosistem digital bersepadu mula dibina dari Inkubator DFK, TVETMARA Besut.', icon: Calendar, color: 'blue' },
  { year: '2026', title: 'Inkubator DFK TVETMARA', desc: 'Beroperasi sepenuhnya dari Institut Kemahiran MARA Besut, Terengganu — pusat inovasi teknologi dan pembangunan produk digital.', icon: Building2, color: 'emerald' },
  { year: '2026', title: '4 Cabang Perniagaan', desc: 'Ghazwah Cloud, Ghazwah Store, Ghazwah Marketing, dan Agroteknologi & Pertanian Moden beroperasi di bawah satu payung korporat.', icon: Rocket, color: 'blue' },
  { year: '2026', title: '10 Produk Siap Industri', desc: 'Berjaya melancarkan 10 produk teknologi merentasi Healthcare, Business & POS, AI & Automation, dan Cloud Infrastructure.', icon: Package, color: 'red' },
  { year: '2027+', title: 'Pengembangan Serantau', desc: 'Memperluas jangkauan pasaran ke seluruh Semenanjung Malaysia dan rantau Asia Tenggara.', icon: Globe, color: 'emerald' },
];

const coreValues = [
  { icon: Sparkles, title: 'Inovasi Berterusan', desc: 'Kami sentiasa meneroka sempadan teknologi baharu untuk menghasilkan penyelesaian yang lebih pintar, cepat, dan efektif.' },
  { icon: ShieldCheck, title: 'Integriti & Amanah', desc: 'Setiap produk dan perkhidmatan dibina di atas asas integriti, ketelusan, dan standard kualiti tertinggi.' },
  { icon: Zap, title: 'Automasi Pintar', desc: 'Kecekapan tanpa kompromi — menggantikan proses manual yang kompleks dengan sistem automasi AI yang dipercayai.' },
  { icon: Handshake, title: 'Kolaborasi Strategik', desc: 'Kami percaya pada kekuatan sinergi — bekerjasama dengan institusi, industri, dan komuniti untuk impak yang lebih besar.' },
];

// ——— MISC HELPERS ———

const milestoneColors = {
  blue: { dot: 'bg-ghz-blue-electric', line: 'bg-ghz-blue-electric/30', glow: 'shadow-ghz-blue-electric/30', border: 'border-ghz-blue-electric/20', hover: 'hover:border-ghz-blue-electric/50' },
  emerald: { dot: 'bg-emerald-500', line: 'bg-emerald-500/30', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50' },
  red: { dot: 'bg-ghz-red', line: 'bg-ghz-red/30', glow: 'shadow-ghz-red/30', border: 'border-ghz-red/20', hover: 'hover:border-ghz-red/50' },
};

// ——— COMPONENT ———

export default function About() {
  const [activeMilestone, setActiveMilestone] = useState(null);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      id="tentang"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-ghz-silver/5"
    >
      {/* ——— TITLE ——— */}
      <div className="text-center mb-16">
        <p className="text-[11px] font-mono text-ghz-blue-electric tracking-[0.2em] uppercase mb-3">
          Tentang Kami
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-4">
          Mengenai <span className="text-ghz-blue-electric">Kami</span>
        </h2>
        <p className="font-sans text-sm text-ghz-silver/70 max-w-xl mx-auto">
          Sebuah konglomerat teknologi Malaysia yang memacu transformasi digital menerusi
          inovasi awan, automasi AI, dan ekosistem perniagaan bersepadu.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-ghz-blue-electric to-ghz-red mx-auto rounded-full mt-4" />
      </div>

      {/* ——— PENGENALAN & VISI ——— */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
        {/* Pengenalan */}
        <motion.div
          variants={fadeUp}
          className="group relative bg-gradient-to-br from-ghz-blue-deep/20 to-transparent border border-ghz-silver/10 rounded-2xl p-8 backdrop-blur-sm hover:border-ghz-blue-electric/30 transition-all duration-500"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-ghz-blue-electric/5 rounded-full blur-3xl pointer-events-none group-hover:bg-ghz-blue-electric/10 transition-all duration-700" />
          <div className="flex gap-5 items-start relative z-10">
            <div className="p-3.5 rounded-xl bg-ghz-blue-electric/10 text-ghz-blue-electric flex-shrink-0 ring-1 ring-ghz-blue-electric/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-ghz-white mb-3">Pengenalan Korporat</h3>
              <p className="font-sans text-sm sm:text-base text-ghz-silver/80 leading-relaxed">
                Ditubuhkan pada tahun 2026, <strong className="text-ghz-white">Ghazwah Group</strong> (berdaftar di bawah SSM sebagai <em className="text-ghz-silver">Ghazwah Trading</em>) beroperasi dari ibu pejabatnya di <strong className="text-ghz-white">Inkubator DFK, TVETMARA Besut</strong>. Kami merintis pendekatan pengurusan berautomasi tinggi dengan integrasi aplikasi dan pangkalan data terkini untuk menjamin kecekapan perniagaan.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visi */}
        <motion.div
          variants={fadeUp}
          className="group relative bg-gradient-to-br from-ghz-red/5 to-transparent border border-ghz-silver/10 rounded-2xl p-8 backdrop-blur-sm hover:border-ghz-red/30 transition-all duration-500"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-ghz-red/5 rounded-full blur-3xl pointer-events-none group-hover:bg-ghz-red/10 transition-all duration-700" />
          <div className="flex gap-5 items-start relative z-10">
            <div className="p-3.5 rounded-xl bg-ghz-red/10 text-ghz-red flex-shrink-0 ring-1 ring-ghz-red/20">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-ghz-white mb-3">Visi Syarikat</h3>
              <p className="font-sans text-sm sm:text-base text-ghz-silver/80 leading-relaxed italic relative">
                <Quote className="absolute -left-1 -top-1 w-4 h-4 text-ghz-red/30" />
                <span className="ml-4">
                  Menjadi konglomerat peneraju di Malaysia yang mengintegrasikan kecemerlangan perkomputeran awan, e-dagang gaya hidup digital, inovasi agroteknologi, dan strategi pemasaran dinamik ke dalam satu ekosistem perniagaan yang mampan dan berprestasi tinggi.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ——— NILAI TERAS ——— */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-ghz-blue-electric tracking-[0.2em] uppercase mb-2">
            Foundation
          </p>
          <h3 className="font-display font-semibold text-2xl text-ghz-white">
            Nilai <span className="text-ghz-blue-electric">Teras</span>
          </h3>
        </div>

        <motion.div
          variants={staggerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="group relative bg-ghz-blue-deep/10 border border-ghz-silver/5 rounded-xl p-6 hover:border-ghz-blue-electric/30 hover:bg-ghz-blue-deep/20 transition-all duration-[400ms] cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-ghz-blue-electric/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ghz-blue-electric/20 to-ghz-blue-electric/5 flex items-center justify-center mb-4 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20 group-hover:ring-ghz-blue-electric/40 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-semibold text-base text-ghz-white mb-2">{val.title}</h4>
                  <p className="font-sans text-xs text-ghz-silver/70 leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ——— TIMELINE ——— */}
      <div className="mb-24">
        <div className="text-center mb-14">
          <p className="text-[11px] font-mono text-ghz-blue-electric tracking-[0.2em] uppercase mb-2">
            Journey
          </p>
          <h3 className="font-display font-semibold text-2xl text-ghz-white">
            Garis Masa <span className="text-ghz-blue-electric">Syarikat</span>
          </h3>
        </div>

        <div className="relative">
          {/* Vertical line — runs behind all cards */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ghz-blue-electric/40 via-ghz-red/30 to-emerald-500/40 md:-translate-x-px" />

          <div className="relative space-y-10">
            {milestones.map((ms, idx) => {
              const isActive = activeMilestone === idx;
              const colors = milestoneColors[ms.color];
              const Icon = ms.icon;
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 md:items-center
                    ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div
                    onClick={() => setActiveMilestone(isActive ? null : idx)}
                    onMouseEnter={() => setActiveMilestone(idx)}
                    onMouseLeave={() => setActiveMilestone(null)}
                    className={`relative ml-14 md:ml-0 md:w-[calc(50%-28px)] bg-ghz-blue-deep/10 border rounded-xl p-5 backdrop-blur-sm cursor-pointer transition-all duration-[400ms] ${colors.border} ${colors.hover}
                      ${isLeft ? 'md:mr-10' : 'md:ml-10'}
                      ${isActive ? 'shadow-lg ' + colors.glow + ' bg-ghz-blue-deep/20' : ''}`}
                  >
                    {/* Hover glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'} ${colors.dot}/10`} />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-2.5 rounded-lg flex-shrink-0 ${colors.dot}/10 ${colors.dot.replace('bg-', 'text-')} transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-[11px] font-mono font-bold ${colors.dot.replace('bg-', 'text-')}`}>
                            {ms.year}
                          </span>
                          <div className={`h-px flex-1 ${colors.line}`} />
                        </div>
                        <h4 className="font-display font-semibold text-sm sm:text-base text-ghz-white mb-1">{ms.title}</h4>
                        <p className={`font-sans text-xs text-ghz-silver/70 leading-relaxed transition-all duration-300 ${isActive ? 'line-clamp-4' : 'line-clamp-2'}`}>
                          {ms.desc}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-ghz-silver/40 flex-shrink-0 mt-1 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {/* Dot on the line */}
                  <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full ${colors.dot} ring-4 ring-ghz-black transition-all duration-300 ${isActive ? 'scale-125 shadow-lg ' + colors.glow : ''}`} />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-28px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ——— PASUKAN KAMI ——— */}
      <div>
        <div className="text-center mb-14">
          <p className="text-[11px] font-mono text-ghz-blue-electric tracking-[0.2em] uppercase mb-2">
            Team
          </p>
          <h3 className="font-display font-semibold text-2xl text-ghz-white">
            Pasukan <span className="text-ghz-blue-electric">Kami</span>
          </h3>
          <p className="font-sans text-sm text-ghz-silver/70 max-w-lg mx-auto mt-2">
            Dipimpin oleh pengasas dan penasihat yang berpengalaman dalam teknologi, akademik, dan industri.
          </p>
        </div>

        {/* Founders */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Users className="w-5 h-5 text-ghz-blue-electric" />
            <h3 className="font-display font-semibold text-lg text-ghz-white">Rakan Kongsi Utama</h3>
          </div>

          <motion.div
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {partners.map((person, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="group relative bg-gradient-to-b from-ghz-blue-deep/15 to-ghz-blue-deep/5 border border-ghz-silver/5 rounded-2xl p-6 hover:border-ghz-blue-electric/30 hover:shadow-lg hover:shadow-ghz-blue-electric/5 transition-all duration-[400ms] text-center"
              >
                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-ghz-blue-electric/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Photo */}
                <div className="relative z-10 mb-4 inline-block">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto ring-2 ring-ghz-blue-electric/20 group-hover:ring-ghz-blue-electric/60 transition-all duration-500 group-hover:scale-105">
                    <img
                      src={teamPhotos[person.name]}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Status dot */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-ghz-black shadow-lg shadow-emerald-500/30" />
                </div>

                <div className="relative z-10">
                  <h4 className="font-display font-semibold text-base sm:text-lg text-ghz-white tracking-wide mb-1">
                    {person.name}
                  </h4>
                  <span className="text-[10px] font-mono text-ghz-blue-electric uppercase tracking-widest">
                    {person.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Advisors */}
        <div>
          <div className="flex items-center gap-3 mb-8 justify-center">
            <ShieldCheck className="w-5 h-5 text-ghz-red" />
            <h3 className="font-display font-semibold text-lg text-ghz-white">Barisan Penasihat</h3>
          </div>

          <motion.div
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            {advisors.map((person, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="group relative bg-gradient-to-b from-ghz-red/5 to-transparent border border-ghz-silver/5 rounded-2xl p-6 hover:border-ghz-red/30 hover:shadow-lg hover:shadow-ghz-red/5 transition-all duration-[400ms] text-center"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-ghz-red/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Photo */}
                <div className="relative z-10 mb-4 inline-block">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto ring-2 ring-ghz-red/20 group-hover:ring-ghz-red/60 transition-all duration-500 group-hover:scale-105">
                    <img
                      src={teamPhotos[person.name]}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-ghz-black shadow-lg shadow-emerald-500/30" />
                </div>

                <div className="relative z-10">
                  <h4 className="font-display font-semibold text-base sm:text-lg text-ghz-white tracking-wide mb-1">
                    {person.name}
                  </h4>
                  <span className="text-[10px] font-mono text-ghz-red uppercase tracking-widest">
                    {person.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
