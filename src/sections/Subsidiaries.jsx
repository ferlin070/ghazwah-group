import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ShoppingBag, TrendingUp, Sprout, ChevronRight } from 'lucide-react';
import subsidiariesData from '../data/subsidiaries.json';

// Mapping icons to subsidiary IDs
const getIcon = (id) => {
  switch (id) {
    case 'ghazwah-cloud':
      return <Server className="w-8 h-8 text-ghz-blue-electric" />;
    case 'ghazwah-store':
      return <ShoppingBag className="w-8 h-8 text-ghz-white" />;
    case 'ghazwah-marketing':
      return <TrendingUp className="w-8 h-8 text-ghz-red" />;
    case 'agroteknologi':
      return <Sprout className="w-8 h-8 text-emerald-500" />;
    default:
      return <Server className="w-8 h-8 text-ghz-blue-electric" />;
  }
};

export default function Subsidiaries() {
  const [activeCard, setActiveCard] = useState(null);

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
      id="syarikat"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={sectionVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-ghz-silver/5"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-4">
          Ekosistem <span className="text-ghz-blue-electric">Anak Syarikat</span>
        </h2>
        <p className="font-sans text-sm text-ghz-silver/70 max-w-xl mx-auto">
          Operasi strategik kami terbahagi kepada 4 cabang perniagaan bagi memaksimumkan impak dan sinergi industri.
        </p>
        <div className="w-16 h-1 bg-ghz-blue-electric mx-auto rounded-full mt-4"></div>
      </div>

      {/* Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {subsidiariesData.map((sub) => {
          const isActive = activeCard === sub.id;

          return (
            <motion.div
              layout
              key={sub.id}
              onClick={() => setActiveCard(isActive ? null : sub.id)}
              onMouseEnter={() => window.innerWidth >= 768 && setActiveCard(sub.id)}
              onMouseLeave={() => window.innerWidth >= 768 && setActiveCard(null)}
              className={`bg-ghz-blue-deep/10 border rounded-xl p-8 backdrop-blur-sm cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isActive 
                  ? 'border-ghz-blue-electric shadow-lg shadow-ghz-blue-electric/10 bg-ghz-blue-deep/20' 
                  : 'border-ghz-silver/10 hover:border-ghz-blue-electric/30'
              }`}
              style={{ minHeight: '220px' }}
            >
              {/* Background gradient trace on active */}
              {isActive && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-ghz-blue-electric/5 rounded-full blur-2xl pointer-events-none"></div>
              )}

              <div>
                {/* Header: Icon + Name */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-ghz-black/50 border border-ghz-silver/5">
                    {getIcon(sub.id)}
                  </div>
                  <span className="text-[10px] font-mono text-ghz-silver/60 tracking-wider uppercase">
                    Cabang Operasi
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display font-bold text-xl text-ghz-white mb-1">
                  {sub.name}
                </h3>
                <span className="text-xs font-mono text-ghz-blue-electric tracking-wide block mb-4 uppercase">
                  {sub.tagline}
                </span>

                {/* Short Description */}
                <p className="font-sans text-sm text-ghz-silver/80 leading-relaxed">
                  {sub.description}
                </p>

                {/* Core Activities Lists (Expandable) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-ghz-silver/10 pt-4 overflow-hidden"
                    >
                      <h4 className="font-display font-semibold text-xs text-ghz-white mb-3 uppercase tracking-wider">
                        Aktiviti & Servis Teras
                      </h4>
                      <ul className="space-y-3">
                        {sub.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-ghz-silver/80 leading-relaxed">
                            <ChevronRight className="w-3.5 h-3.5 text-ghz-blue-electric flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Click Indicator for Mobile */}
              <div className="mt-4 flex justify-end md:hidden">
                <span className="text-[10px] font-mono text-ghz-silver/60">
                  {isActive ? 'KLIK UNTUK TUTUP' : 'KLIK UNTUK BUTIRAN'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
