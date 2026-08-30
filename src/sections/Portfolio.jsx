import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, CheckCircle2, ChevronDown, Cpu, ExternalLink, MessageSquare } from 'lucide-react';
import productsData from '../data/products.json';
import { trackEvent } from '../utils/analytics';

const categories = [
  'Semua',
  'Healthcare Technology',
  'Business & POS',
  'AI & Automation',
  'Cloud',
];

const categoryTone = {
  'Healthcare Technology': 'border-ghz-red/20 bg-ghz-red/10 text-ghz-red',
  'Business & POS': 'border-ghz-gold/20 bg-ghz-gold/10 text-ghz-gold',
  'AI & Automation': 'border-ghz-blue-electric/20 bg-ghz-blue-electric/10 text-ghz-blue-electric',
  Cloud: 'border-ghz-green/20 bg-ghz-green/10 text-ghz-green',
};

function ProductCard({ product, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tone = categoryTone[product.category] ?? 'border-white/10 bg-white/[0.05] text-ghz-silver';
  const visibleFeatures = isExpanded ? product.features : product.features.slice(0, 3);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="surface-card group relative flex h-full flex-col overflow-hidden p-6"
    >
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-ghz-blue-electric/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className={`rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${tone}`}>
            {product.category}
          </span>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-ghz-blue-electric ring-1 ring-white/10">
            <Cpu className="h-5 w-5" />
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ghz-white">
          {product.name}
        </h3>
        <p className="mt-4 text-sm leading-7 text-ghz-silver-muted">{product.description}</p>

        <div className="mt-6 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-ghz-silver transition hover:border-ghz-blue-electric/40 hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
            aria-expanded={isExpanded}
          >
            Ciri utama
            <ChevronDown className={`h-4 w-4 transition ${isExpanded ? 'rotate-180 text-ghz-blue-electric' : ''}`} />
          </button>

          <ul className="mt-4 space-y-3">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-xs leading-6 text-ghz-silver-muted">
                <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-ghz-green" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {product.impact && (
          <div className="mt-6 rounded-2xl border border-ghz-gold/20 bg-ghz-gold/10 p-4">
            <div className="flex items-start gap-3 text-xs leading-6 text-ghz-silver">
              <Award className="mt-1 h-4 w-4 shrink-0 text-ghz-gold" />
              <span>{product.impact}</span>
            </div>
          </div>
        )}

        <a
          href={`#hubungi?product=${encodeURIComponent(product.name)}`}
          onClick={() => {
            window.dispatchEvent(new CustomEvent('ghazwah:product-inquiry', {
              detail: { productName: product.name },
            }));
            trackEvent('conversion', 'portfolio_inquiry', product.name);
          }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ghz-blue-electric transition hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
        >
          <MessageSquare className="h-4 w-4" />
          Tanya tentang produk ini
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const filteredProducts = selectedCategory === 'Semua'
    ? productsData
    : productsData.filter((product) => product.category === selectedCategory);

  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.55 }}
      className="section-shell border-b border-white/10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-eyebrow">Product suite</p>
        <h2 className="section-title mt-3">Portfolio digital yang dibina untuk operasi sebenar.</h2>
        <p className="section-copy mt-5">
          Sepuluh produk utama Ghazwah Group meliputi penjagaan kesihatan, operasi POS,
          automasi AI, analitik perniagaan, laman web segera dan infrastruktur awan.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric ${
                isActive
                  ? 'border-ghz-blue-electric bg-ghz-blue-electric text-ghz-white shadow-blue-soft'
                  : 'border-white/10 bg-white/[0.045] text-ghz-silver-muted hover:border-ghz-blue-electric/40 hover:text-ghz-white'
              }`}
            >
              {category === 'Semua' ? 'Semua produk' : category}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
