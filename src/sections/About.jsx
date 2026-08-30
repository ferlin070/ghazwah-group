import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Building2,
  Calendar,
  Globe,
  Handshake,
  Package,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';

import imgNuaman from '../assets/MUHAMMAD NU\'MAN NAFIAH BIN AMIN.png';
import imgAfnan from '../assets/MUHAMMAD AFNAN BIN MOHD KHAIRANI.png';
import imgZahid from '../assets/AHMAD ZAHID BIN MOHAMAD SOFI.jpeg';
import imgZubir from '../assets/SIR ZUBIR.jpeg';
import imgZulfadli from '../assets/SIR ZULFADLI.jpg';

const teamPhotos = {
  "Muhammad Nu'man Nafiah Bin Amin": imgNuaman,
  'Muhammad Afnan Bin Mohd Khairani': imgAfnan,
  'Ahmad Zahid Bin Mohd Sofi': imgZahid,
  'Ts. Mohd Zubir bin Md Zin': imgZubir,
  'Ts. Zulfadli Saad': imgZulfadli,
};

const partners = [
  { name: "Muhammad Nu'man Nafiah Bin Amin", role: 'Rakan Kongsi Utama / Pengasas' },
  { name: 'Muhammad Afnan Bin Mohd Khairani', role: 'Rakan Kongsi Utama / Pengasas' },
  { name: 'Ahmad Zahid Bin Mohd Sofi', role: 'Rakan Kongsi Utama / Pengasas' },
];

const advisors = [
  { name: 'Ts. Mohd Zubir bin Md Zin', role: 'Penasihat Teknikal & Akademik' },
  { name: 'Ts. Zulfadli Saad', role: 'Penasihat Strategik & Industri' },
];

const milestones = [
  {
    year: '2026',
    title: 'Penubuhan Ghazwah Group',
    desc: 'Ghazwah Trading didaftarkan dengan SSM Malaysia. Satu ekosistem digital bersepadu mula dibina dari Inkubator DFK, TVETMARA Besut.',
    icon: Calendar,
    tone: 'text-ghz-blue-electric bg-ghz-blue-electric/10 ring-ghz-blue-electric/20',
  },
  {
    year: '2026',
    title: 'Inkubator DFK TVETMARA',
    desc: 'Beroperasi sepenuhnya dari Institut Kemahiran MARA Besut, Terengganu — pusat inovasi teknologi dan pembangunan produk digital.',
    icon: Building2,
    tone: 'text-ghz-green bg-ghz-green/10 ring-ghz-green/20',
  },
  {
    year: '2026',
    title: '4 Cabang Perniagaan',
    desc: 'Ghazwah Cloud, Ghazwah Store, Ghazwah Marketing, dan Agroteknologi & Pertanian Moden beroperasi di bawah satu payung korporat.',
    icon: Rocket,
    tone: 'text-ghz-blue-electric bg-ghz-blue-electric/10 ring-ghz-blue-electric/20',
  },
  {
    year: '2026',
    title: '10 Produk Siap Industri',
    desc: 'Berjaya melancarkan 10 produk teknologi merentasi Healthcare, Business & POS, AI & Automation, dan Cloud Infrastructure.',
    icon: Package,
    tone: 'text-ghz-red bg-ghz-red/10 ring-ghz-red/20',
  },
  {
    year: '2027+',
    title: 'Pengembangan Serantau',
    desc: 'Memperluas jangkauan pasaran ke seluruh Semenanjung Malaysia dan rantau Asia Tenggara.',
    icon: Globe,
    tone: 'text-ghz-gold bg-ghz-gold/10 ring-ghz-gold/20',
  },
];

const coreValues = [
  {
    icon: Sparkles,
    title: 'Inovasi Berterusan',
    desc: 'Meneroka teknologi baharu untuk menghasilkan penyelesaian yang lebih pintar, cepat dan efektif.',
  },
  {
    icon: ShieldCheck,
    title: 'Integriti & Amanah',
    desc: 'Membina produk dan perkhidmatan di atas ketelusan, tanggungjawab dan standard kualiti tinggi.',
  },
  {
    icon: Zap,
    title: 'Automasi Pintar',
    desc: 'Menggantikan proses manual yang kompleks dengan sistem automasi AI yang boleh dipercayai.',
  },
  {
    icon: Handshake,
    title: 'Kolaborasi Strategik',
    desc: 'Bekerjasama dengan institusi, industri dan komuniti untuk membina impak yang lebih besar.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function PersonCard({ person, accent = 'blue' }) {
  const accentClass = accent === 'gold'
    ? 'ring-ghz-gold/25 text-ghz-gold border-ghz-gold/20'
    : 'ring-ghz-blue-electric/25 text-ghz-blue-electric border-ghz-blue-electric/20';

  return (
    <motion.article variants={fadeUp} className="surface-card-soft relative overflow-hidden p-6 text-center">
      <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-ghz-blue-electric/10 blur-3xl" />
      <div className="relative z-10">
        <div className={`mx-auto h-28 w-28 overflow-hidden rounded-3xl border bg-white/[0.04] ring-1 ${accentClass}`}>
          <img
            src={teamPhotos[person.name]}
            alt={person.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <h4 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-ghz-white">
          {person.name}
        </h4>
        <p className={`mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${accentClass.split(' ')[1]}`}>
          {person.role}
        </p>
      </div>
    </motion.article>
  );
}

export default function About() {
  return (
    <motion.section
      id="tentang"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55 }}
      className="section-shell border-b border-white/10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-eyebrow">Tentang Ghazwah Group</p>
        <h2 className="section-title mt-3">Syarikat induk teknologi untuk produk digital, cloud dan automasi.</h2>
        <p className="section-copy mt-5">
          Ghazwah Group beroperasi dari Inkubator DFK, TVETMARA Besut dengan mandat membina
          ekosistem perniagaan yang menggabungkan perkomputeran awan, e-dagang, pemasaran,
          automasi AI dan agroteknologi.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <motion.article variants={fadeUp} className="surface-card relative overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ghz-blue-electric/10 blur-3xl" />
          <div className="relative z-10 flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-ghz-white">Pengenalan Korporat</h3>
              <p className="mt-4 text-sm leading-7 text-ghz-silver-muted">
                Ditubuhkan pada tahun 2026, <strong className="text-ghz-white">Ghazwah Group</strong>{' '}
                berdaftar di bawah SSM sebagai <em>Ghazwah Trading</em>. Syarikat ini merintis
                pendekatan pengurusan berautomasi tinggi dengan integrasi aplikasi, data dan
                infrastruktur moden.
              </p>
            </div>
          </div>
        </motion.article>

        <motion.article variants={fadeUp} className="surface-card relative overflow-hidden p-6 sm:p-8">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-ghz-gold/10 blur-3xl" />
          <div className="relative z-10 flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ghz-gold/10 text-ghz-gold ring-1 ring-ghz-gold/20">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-ghz-white">Visi Syarikat</h3>
              <div className="mt-4 flex gap-3 text-sm leading-7 text-ghz-silver-muted">
                <Quote className="mt-1 h-4 w-4 shrink-0 text-ghz-gold" />
                <p>
                  Menjadi konglomerat peneraju di Malaysia yang mengintegrasikan kecemerlangan
                  perkomputeran awan, e-dagang gaya hidup digital, inovasi agroteknologi dan
                  strategi pemasaran dinamik.
                </p>
              </div>
            </div>
          </div>
        </motion.article>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-eyebrow">Foundation</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ghz-white">
              Nilai teras yang membentuk cara kami bekerja.
            </h3>
          </div>
          <p className="section-copy max-w-xl">
            Setiap produk dan kerjasama dirancang supaya pelanggan mendapat penyelesaian yang
            praktikal, boleh berkembang dan mudah diselenggara.
          </p>
        </div>

        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <motion.article key={value.title} variants={fadeUp} className="surface-card-soft p-5">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-display text-base font-semibold text-ghz-white">{value.title}</h4>
                <p className="mt-3 text-xs leading-6 text-ghz-silver-muted">{value.desc}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-20">
        <div className="mb-10 text-center">
          <p className="section-eyebrow">Journey</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ghz-white">
            Garis masa perkembangan syarikat.
          </h3>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-ghz-blue-electric/40 via-white/10 to-ghz-gold/40 md:left-1/2" />
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isLeft = index % 2 === 0;
              return (
                <motion.article
                  key={milestone.title}
                  variants={fadeUp}
                  className={`relative grid gap-4 pl-14 md:grid-cols-2 md:pl-0 ${isLeft ? '' : 'md:text-right'}`}
                >
                  <div className={`surface-card-soft p-5 ${isLeft ? 'md:mr-8' : 'md:col-start-2 md:ml-8'}`}>
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${milestone.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-ghz-gold">
                      {milestone.year}
                    </p>
                    <h4 className="mt-2 font-display text-lg font-semibold text-ghz-white">{milestone.title}</h4>
                    <p className="mt-3 text-xs leading-6 text-ghz-silver-muted">{milestone.desc}</p>
                  </div>
                  <div className="absolute left-5 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-ghz-blue-electric ring-4 ring-ghz-black md:left-1/2" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-eyebrow">Leadership</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ghz-white">
            Dipimpin oleh pengasas dan penasihat strategik.
          </h3>
          <p className="section-copy mt-4">
            Barisan kepimpinan menggabungkan kekuatan teknikal, akademik, operasi dan pembangunan industri.
          </p>
        </div>

        <div className="mb-10 flex items-center justify-center gap-3">
          <Users className="h-5 w-5 text-ghz-blue-electric" />
          <h4 className="font-display text-lg font-semibold text-ghz-white">Rakan Kongsi Utama</h4>
        </div>
        <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="grid gap-5 md:grid-cols-3">
          {partners.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </motion.div>

        <div className="mb-10 mt-14 flex items-center justify-center gap-3">
          <ShieldCheck className="h-5 w-5 text-ghz-gold" />
          <h4 className="font-display text-lg font-semibold text-ghz-white">Barisan Penasihat</h4>
        </div>
        <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
          {advisors.map((person) => (
            <PersonCard key={person.name} person={person} accent="gold" />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
