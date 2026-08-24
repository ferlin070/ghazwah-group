import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, Award, MessageSquare, ExternalLink } from 'lucide-react';
import productsData from '../data/products.json';
import { trackEvent } from '../utils/analytics';

// Single product card component with enhanced 3D tilt effect
function ProductCard({ product, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Get color theme for badge based on category
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Healthcare Technology':
        return 'bg-ghz-red/20 text-ghz-red border-ghz-red/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
      case 'Business & POS':
        return 'bg-ghz-gold/20 text-ghz-gold border-ghz-gold/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]';
      case 'AI & Automation':
        return 'bg-ghz-blue-electric/20 text-ghz-blue-electric border-ghz-blue-electric/40 shadow-[0_0_10px_rgba(0,212,255,0.3)]';
      case 'Cloud':
        return 'bg-ghz-purple/20 text-ghz-purple border-ghz-purple/40 shadow-[0_0_10px_rgba(99,102,241,0.3)]';
      default:
        return 'bg-ghz-silver/10 text-ghz-silver border-ghz-silver/20';
    }
  };

  // 3D Tilt effect on mouse move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="bg-gradient-to-br from-ghz-black-deep/60 to-ghz-black/90 border border-ghz-blue-electric/20 hover:border-ghz-blue-electric/60 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between hover:shadow-neon relative overflow-hidden group card-lift neon-border"
    >
      {/* Glassmorphism overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-ghz-blue-electric/10 to-ghz-purple/10 pointer-events-none z-0"
      />

      {/* Animated corner accent with neon glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 right-0 w-32 h-32 bg-ghz-blue-electric/20 blur-2xl rounded-full"
      />

      {/* Bottom glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ghz-blue-electric to-transparent"
      />
      <div className="relative z-10">
        {/* Category Badge with shimmer */}
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getCategoryColor(product.category)} mb-4 relative overflow-hidden`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          <span className="relative z-10">{product.category}</span>
        </motion.span>

        {/* Title with enhanced hover */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display font-bold text-lg text-ghz-white group-hover:text-ghz-blue-electric transition-colors mb-2"
        >
          {product.name}
        </motion.h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-ghz-silver/80 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Collapsible Features with smooth animation */}
        <div className="border-t border-ghz-silver/5 pt-4 mt-4">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between w-full text-left text-xs font-mono font-medium text-ghz-silver hover:text-ghz-blue-electric transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-ghz-blue-electric" />
              CIRI-CIRI UTAMA
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-3 space-y-2 list-disc pl-4 text-xs text-ghz-silver/70 leading-relaxed overflow-hidden"
              >
                {product.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Impact + CTA with enhanced styling */}
      <div className="border-t border-ghz-silver/5 pt-4 mt-4 space-y-3 relative z-10">
        {product.impact && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-2 text-xs"
          >
            <Award className="w-4 h-4 text-ghz-red flex-shrink-0 mt-0.5" />
            <span className="text-ghz-silver/70 leading-snug">
              {product.impact}
            </span>
          </motion.div>
        )}

        {/* Inquiry CTA with magnetic hover */}
        <motion.a
          href={`#hubungi?product=${encodeURIComponent(product.name)}`}
          onClick={() => trackEvent('conversion', 'portfolio_inquiry', product.name)}
          whileHover={{ x: 3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-ghz-blue-electric hover:text-ghz-white transition-colors group/cta relative"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Tanya tentang produk ini</span>
          <motion.div
            className="inline-block"
            whileHover={{ x: 2, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink className="w-3 h-3" />
          </motion.div>
        </motion.a>
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

  // Container variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
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
      {/* Title with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-4"
        >
          Portfolio & <span className="text-transparent bg-clip-text bg-gradient-to-r from-ghz-blue-electric via-ghz-purple to-ghz-blue-deep neon-text">Inovasi Digital</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-sm text-ghz-silver/70 max-w-xl mx-auto"
        >
          Sebagai peneraju teknologi di bawah Inkubator DFK, kami komited membangunkan sistem bertaraf industri.
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-1 bg-ghz-blue-electric mx-auto rounded-full mt-4"
        />
      </motion.div>

      {/* Filter Tabs with enhanced micro-interactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center items-center gap-2 mb-12"
      >
        {categories.map((category, idx) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-xs font-mono border transition-all duration-300 relative overflow-hidden ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-ghz-blue-electric to-ghz-purple border-ghz-blue-electric text-ghz-white shadow-neon'
                : 'bg-ghz-black-deep/60 border-ghz-blue-electric/30 text-ghz-silver hover:border-ghz-blue-electric hover:text-ghz-white hover:shadow-neon-sm backdrop-blur-sm'
            }`}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-ghz-blue-electric -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">
              {category === 'Semua' ? 'SEMUA PRODUK' : category.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Products Grid with stagger animation */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 rounded-full bg-ghz-blue-deep/20 border border-ghz-silver/10 flex items-center justify-center mb-4"
              >
                <Cpu className="w-7 h-7 text-ghz-silver/40" />
              </motion.div>
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
