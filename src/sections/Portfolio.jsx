import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, Award, MessageSquare, ExternalLink } from 'lucide-react';
import productsData from '../data/products.json';
import { trackEvent } from '../utils/analytics';

// Single product card component
function ProductCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color theme for badge based on category
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Healthcare Technology':
        return 'bg-ghz-red/10 text-ghz-red border-ghz-red/20';
      case 'Business & POS':
        return 'bg-ghz-silver/10 text-ghz-white border-ghz-silver/20';
      case 'AI & Automation':
        return 'bg-ghz-blue-electric/10 text-ghz-blue-electric border-ghz-blue-electric/20';
      case 'Cloud':
        return 'bg-ghz-blue-deep/30 text-ghz-silver border-ghz-blue-deep/50';
      default:
        return 'bg-ghz-silver/10 text-ghz-silver border-ghz-silver/20';
    }
  };

  return (
    <motion.div
      layout
      className="bg-ghz-blue-deep/10 border border-ghz-silver/10 hover:border-ghz-blue-electric/40 rounded-xl p-6 backdrop-blur-sm flex flex-col justify-between hover:shadow-xl hover:shadow-ghz-blue-electric/10 hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div>
        {/* Category Badge */}
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getCategoryColor(product.category)} mb-4`}>
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-ghz-white group-hover:text-ghz-blue-electric transition-colors mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-ghz-silver/80 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Collapsible Features */}
        <div className="border-t border-ghz-silver/5 pt-4 mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-xs font-mono font-medium text-ghz-silver hover:text-ghz-blue-electric transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-ghz-blue-electric" />
              CIRI-CIRI UTAMA
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 space-y-2 list-disc pl-4 text-xs text-ghz-silver/70 leading-relaxed overflow-hidden"
              >
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Impact + CTA */}
      <div className="border-t border-ghz-silver/5 pt-4 mt-4 space-y-3">
        {product.impact && (
          <div className="flex items-start gap-2 text-xs">
            <Award className="w-4 h-4 text-ghz-red flex-shrink-0 mt-0.5" />
            <span className="text-ghz-silver/70 leading-snug">
              {product.impact}
            </span>
          </div>
        )}
        
        {/* Inquiry CTA */}
        <a
          href={`#hubungi?product=${encodeURIComponent(product.name)}`}
          onClick={() => trackEvent('conversion', 'portfolio_inquiry', product.name)}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-ghz-blue-electric hover:text-ghz-white transition-colors group/cta"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Tanya tentang produk ini</span>
          <ExternalLink className="w-3 h-3 group-hover/cta:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Healthcare Technology',
    'Business & POS',
    'AI & Automation',
    'Cloud',
  ];

  // Filter products based on selected tab
  const filteredProducts = selectedCategory === 'Semua'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <motion.section
      id="portfolio"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={sectionVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-ghz-silver/5"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-4">
          Portfolio & <span className="text-ghz-blue-electric">Inovasi Digital</span>
        </h2>
        <p className="font-sans text-sm text-ghz-silver/70 max-w-xl mx-auto">
          Sebagai peneraju teknologi di bawah Inkubator DFK, kami komited membangunkan sistem bertaraf industri.
        </p>
        <div className="w-16 h-1 bg-ghz-blue-electric mx-auto rounded-full mt-4"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-mono border transition-all duration-250 ${
              selectedCategory === category
                ? 'bg-ghz-blue-electric border-ghz-blue-electric text-ghz-white shadow-md shadow-ghz-blue-electric/25'
                : 'bg-ghz-blue-deep/10 border-ghz-silver/10 text-ghz-silver hover:border-ghz-blue-electric/40 hover:text-ghz-white'
            }`}
          >
            {category === 'Semua' ? 'SEMUA PRODUK' : category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-ghz-blue-deep/20 border border-ghz-silver/10 flex items-center justify-center mb-4">
                <Cpu className="w-7 h-7 text-ghz-silver/40" />
              </div>
              <p className="font-display font-semibold text-lg text-ghz-silver/60 mb-1">
                Tiada Produk Dalam Kategori Ini
              </p>
              <p className="font-sans text-xs text-ghz-silver/40 max-w-xs">
                Cuba pilih kategori lain atau hubungi kami untuk pertanyaan lanjut.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
