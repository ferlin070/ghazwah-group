import React from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cloud,
  MessageSquareCode,
  ShoppingBag,
  Sprout,
  TrendingUp,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
import FloatingTechIcons from '../components/FloatingTechIcons';
import logoGhazwah from '../assets/logo ghazwah group.png';
import { trackEvent } from '../utils/analytics';

const businessLines = [
  { icon: Cloud, title: 'Cloud & DevOps', copy: 'Infrastruktur awan, pelayan hibrid, automasi hosting.' },
  { icon: ShoppingBag, title: 'Digital Commerce', copy: 'Sistem POS, e-dagang, dan operasi runcit pintar.' },
  { icon: TrendingUp, title: 'Growth Marketing', copy: 'Pemerolehan pelanggan, tender, dan penjenamaan digital.' },
  { icon: Sprout, title: 'Agroteknologi', copy: 'Sekuriti makanan dan pertanian moden berasaskan data.' },
];

const proofPoints = [
  'Syarikat berdaftar SSM',
  'Beroperasi dari Inkubator DFK TVETMARA Besut',
  '10 produk teknologi siap industri',
];

export default function Hero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 560], [0, 90]);
  const contentY = useTransform(scrollY, [0, 560], [0, -28]);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ghz-black-deep px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-35">
        <CircuitBackground />
      </motion.div>
      <div className="absolute inset-0 bg-executive-mesh" />
      <div className="absolute left-1/2 top-20 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-ghz-blue-electric/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-ghz-gold/10 blur-[110px]" />
      <div className="absolute inset-0 opacity-45">
        <FloatingTechIcons />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <span className="premium-badge">
              <span className="h-2 w-2 rounded-full bg-ghz-green" />
              Era baharu inovasi digital Malaysia
            </span>
            <span className="premium-badge border-ghz-gold/20 text-ghz-gold">
              SSM 202603084068
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-ghz-white sm:text-6xl lg:text-7xl"
          >
            Ekosistem teknologi untuk perniagaan Malaysia yang mahu bergerak lebih pantas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-ghz-silver-muted sm:text-lg lg:mx-0"
          >
            Ghazwah Group membina penyelesaian awan, automasi AI, POS, pemasaran digital,
            dan agroteknologi di bawah satu payung korporat dari Inkubator DFK TVETMARA Besut.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#collab"
              onClick={() => trackEvent('conversion', 'cta_click', 'Hero — Jom Collab')}
              className="btn-primary"
            >
              <MessageSquareCode className="h-5 w-5" />
              Bincang Projek Anda
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#portfolio"
              onClick={() => trackEvent('navigation', 'cta_click', 'Hero — Lihat Portfolio')}
              className="btn-secondary"
            >
              Lihat Portfolio Produk
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-8 grid gap-3 text-left sm:grid-cols-3"
          >
            {proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ghz-silver-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ghz-green" />
                <span>{point}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="surface-card relative overflow-hidden p-5 sm:p-6"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ghz-blue-electric/12 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-64 w-64 rounded-full bg-ghz-gold/10 blur-3xl" />

          <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <img src={logoGhazwah} alt="" className="h-8 w-auto" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-ghz-white">Ghazwah Operating System</p>
                <p className="text-xs text-ghz-silver-muted">Cloud • AI • Commerce • Agro</p>
              </div>
            </div>
            <span className="hidden rounded-full border border-ghz-green/20 bg-ghz-green/10 px-3 py-1 text-xs font-semibold text-ghz-green sm:inline-flex">
              Active
            </span>
          </div>

          <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2">
            {businessLines.map((line, index) => {
              const Icon = line.icon;
              return (
                <motion.div
                  key={line.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.34 + index * 0.06 }}
                  className="surface-card-soft p-4"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ghz-white">{line.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-ghz-silver-muted">{line.copy}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 mt-5 rounded-3xl border border-ghz-gold/20 bg-ghz-gold/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ghz-gold/15 text-ghz-gold ring-1 ring-ghz-gold/25">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-ghz-white">8 Ejen AI 24/7</p>
                <p className="text-xs leading-5 text-ghz-silver-muted">Automasi operasi, jualan, teknikal, pemasaran dan kewangan.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto mt-12 hidden max-w-7xl justify-center md:flex">
        <a
          href="#tentang"
          className="flex flex-col items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-ghz-silver-muted transition hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
        >
          Teroka Syarikat
          <ArrowDown className="h-4 w-4 text-ghz-blue-electric" />
        </a>
      </div>
    </section>
  );
}
