import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Server, ShoppingBag, Sprout, TrendingUp } from 'lucide-react';
import subsidiariesData from '../data/subsidiaries.json';

const iconConfig = {
  'ghazwah-cloud': {
    icon: Server,
    tone: 'text-ghz-blue-electric bg-ghz-blue-electric/10 ring-ghz-blue-electric/20',
  },
  'ghazwah-store': {
    icon: ShoppingBag,
    tone: 'text-ghz-gold bg-ghz-gold/10 ring-ghz-gold/20',
  },
  'ghazwah-marketing': {
    icon: TrendingUp,
    tone: 'text-ghz-red bg-ghz-red/10 ring-ghz-red/20',
  },
  agroteknologi: {
    icon: Sprout,
    tone: 'text-ghz-green bg-ghz-green/10 ring-ghz-green/20',
  },
};

export default function Subsidiaries() {
  const [activeCard, setActiveCard] = useState(subsidiariesData[0]?.id ?? null);

  return (
    <motion.section
      id="syarikat"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.55 }}
      className="section-shell border-b border-white/10"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="section-eyebrow">Operating model</p>
          <h2 className="section-title mt-3">Empat cabang yang bergerak sebagai satu ekosistem.</h2>
          <p className="section-copy mt-5">
            Setiap cabang mempunyai fokus tersendiri, tetapi disusun untuk berkongsi teknologi,
            data, pelanggan, dan peluang pasaran secara bersepadu.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="surface-card-soft p-4">
              <p className="font-display text-3xl font-semibold text-ghz-white">4</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ghz-silver-muted">Cabang operasi</p>
            </div>
            <div className="surface-card-soft p-4">
              <p className="font-display text-3xl font-semibold text-ghz-white">1</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ghz-silver-muted">Induk strategi</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {subsidiariesData.map((sub, index) => {
            const config = iconConfig[sub.id] ?? iconConfig['ghazwah-cloud'];
            const Icon = config.icon;
            const isActive = activeCard === sub.id;

            return (
              <motion.article
                key={sub.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                onMouseEnter={() => setActiveCard(sub.id)}
                className={`surface-card relative overflow-hidden p-6 transition ${
                  isActive ? 'border-ghz-blue-electric/35 bg-white/[0.07]' : ''
                }`}
              >
                <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-ghz-blue-electric/8 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${config.tone}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ghz-silver-muted">
                      Cabang {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-ghz-white">
                    {sub.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ghz-gold">
                    {sub.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ghz-silver-muted">{sub.description}</p>

                  <button
                    type="button"
                    onClick={() => setActiveCard(isActive ? null : sub.id)}
                    className="mt-6 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-ghz-silver transition hover:border-ghz-blue-electric/40 hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
                    aria-expanded={isActive}
                  >
                    Servis teras
                    <ChevronRight className={`h-4 w-4 transition ${isActive ? 'rotate-90 text-ghz-blue-electric' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="space-y-3 overflow-hidden pt-4"
                      >
                        {sub.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3 text-xs leading-6 text-ghz-silver-muted">
                            <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ghz-blue-electric" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
