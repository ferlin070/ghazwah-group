import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Boxes, Building2, CalendarDays } from 'lucide-react';

const stats = [
  {
    target: 10,
    suffix: '+',
    label: 'Produk Siap Industri',
    detail: 'Merentasi kesihatan, POS, AI, automasi dan cloud.',
    icon: Boxes,
  },
  {
    target: 4,
    suffix: '',
    label: 'Cabang Perniagaan',
    detail: 'Cloud, Store, Marketing dan Agroteknologi.',
    icon: Building2,
  },
  {
    target: 2026,
    suffix: '',
    label: 'Tahun Ditubuhkan',
    detail: 'Beroperasi dari Inkubator DFK TVETMARA Besut.',
    icon: CalendarDays,
  },
  {
    target: 8,
    suffix: ' AI',
    label: 'Ejen Pintar 24/7',
    detail: 'Automasi operasi, jualan, kewangan dan sokongan.',
    icon: Bot,
  },
];

function CountUp({ target, duration = 1600, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return undefined;

    const end = Number.parseInt(target, 10);
    if (Number.isNaN(end)) {
      setCount(target);
      return undefined;
    }

    const start = end > 1000 ? end - 50 : 0;
    const startTime = performance.now();
    let frameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setCount(Math.floor(start + easedProgress * (end - start)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, trigger]);

  return <>{count}</>;
}

export default function StatsStrip() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55 }}
      className="relative z-10 border-y border-white/10 bg-ghz-black-deep/72 py-8 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="surface-card-soft group relative overflow-hidden p-5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ghz-blue-electric/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-1 font-display text-3xl font-semibold tracking-[-0.04em] text-ghz-white sm:text-4xl">
                      <CountUp target={stat.target} trigger={hasIntersected} />
                      <span className="text-lg font-medium text-ghz-gold">{stat.suffix}</span>
                    </div>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ghz-blue-electric">
                      {stat.label}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-xs leading-6 text-ghz-silver-muted">{stat.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
