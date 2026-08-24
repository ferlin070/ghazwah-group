import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, MessageSquareCode, TrendingUp, ShieldCheck, Bot } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
import FloatingTechIcons from '../components/FloatingTechIcons';
import logoGhazwah from '../assets/logo ghazwah group.png';
import heroIllustration from '../assets/hero.png';
import { trackEvent } from '../utils/analytics';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax transforms
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const yContent = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Magnetic cursor effect on Hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setMousePosition({
        x: (clientX - centerX) * 0.02,
        y: (clientY - centerY) * 0.02,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-[90svh] flex flex-col items-center justify-center overflow-hidden bg-ghz-black px-4 sm:px-6 lg:px-8 py-12 md:py-24 border-b border-ghz-silver/5">
      {/* Dynamic Digital Circuit Background with parallax */}
      <motion.div
        style={{ y: yBg }} className="absolute inset-0">
        <CircuitBackground />
      </motion.div>

      {/* Enhanced Decorative Radial Glowing Overlays with neon effect */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-ghz-blue-electric/10 blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-ghz-purple/8 blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 left-10 w-[300px] h-[300px] rounded-full bg-ghz-red/6 blur-[90px] pointer-events-none z-0"
      />

      {/* Floating tech icons with enhanced parallax effect */}
      <motion.div
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      >
        <FloatingTechIcons />
      </motion.div>

      {/* Hero brand illustration with enhanced parallax and motion */}
      <motion.div
        style={{
          y: yBg,
          x: mousePosition.x * 0.8,
        }}
        className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden"
      >
        <div className="relative flex items-center justify-center">
          {/* Soft glow behind the illustration with pulse */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-ghz-blue-electric/10 rounded-full blur-[120px]"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={heroIllustration}
            alt=""
            aria-hidden="true"
            className="w-auto h-[260px] sm:h-[360px] object-contain"
          />
        </div>
      </motion.div>

      {/* Hero Content Container with parallax */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8"
      >

        {/* Brand Badge with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-ghz-blue-deep/20 border border-ghz-silver/10 px-4 py-2 rounded-full backdrop-blur-sm hover:border-ghz-blue-electric/30 transition-colors cursor-pointer"
          >
            <img
              src={logoGhazwah}
              alt="Ghazwah Group"
              className="h-7 w-auto object-contain"
            />
            <div className="h-4 w-px bg-ghz-silver/20" />
            <span className="text-[10px] font-mono text-ghz-silver/60 tracking-wider uppercase">
              SSM: 202603084068
            </span>
          </motion.div>
        </motion.div>

        {/* Top Tagline Badge with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-ghz-blue-deep/30 border border-ghz-blue-electric/30 px-4 py-1.5 rounded-full text-xs font-mono text-ghz-blue-electric tracking-wide select-none"
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-ghz-blue-electric"
          />
          ERA BARU INOVASI DIGITAL
        </motion.div>

        {/* Main Headline with stagger reveal and neon gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-ghz-white leading-[1.05] tracking-tight max-w-4xl"
        >
          Transformasi Digital Untuk
          <motion.span
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-ghz-blue-electric via-ghz-purple to-ghz-blue-electric bg-[length:200%_auto] neon-text"
          >
            Perniagaan Malaysia
          </motion.span>
        </motion.h1>

        {/* Sub-headline with fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-sans text-sm sm:text-base md:text-lg text-ghz-silver/80 leading-relaxed max-w-3xl"
        >
          Satu ekosistem bersepadu merentasi <span className="text-ghz-white font-medium">perkomputeran awan, automasi AI, perniagaan runcit digital, dan agroteknologi lestari</span> — diterajui dari Inkubator DFK TVETMARA Besut.
        </motion.p>

        {/* Benefit Pills with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          {[
            { icon: TrendingUp, text: "Jimat 70% Kos Operasi", color: "blue-electric" },
            { icon: ShieldCheck, text: "10 Produk Siap Industri", color: "red" },
            { icon: Bot, text: "8 Ejen AI 24/7", color: "emerald" },
          ].map((pill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono ${
                pill.color === "blue-electric"
                  ? "bg-ghz-blue-deep/20 border-ghz-blue-electric/20 text-ghz-blue-electric"
                  : pill.color === "red"
                  ? "bg-ghz-red/10 border-ghz-red/20 text-ghz-red"
                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              }`}
            >
              <pill.icon className="w-3.5 h-3.5" />
              {pill.text}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with enhanced neon animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
        >
          <motion.a
            href="#collab"
            onClick={() => trackEvent('conversion', 'cta_click', 'Hero — Jom Collab')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-ghz-blue-electric to-ghz-purple hover:from-ghz-purple hover:to-ghz-blue-electric text-ghz-white px-8 py-4 rounded-lg text-base font-bold transition-all duration-300 shadow-neon gap-2 group btn-gradient relative overflow-hidden neon-glow"
          >
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <MessageSquareCode className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Jom Collab — Bincang Projek Anda</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
          </motion.a>
          <motion.a
            href="#portfolio"
            onClick={() => trackEvent('navigation', 'cta_click', 'Hero — Lihat Portfolio')}
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-ghz-blue-electric/50 hover:border-ghz-blue-electric text-ghz-blue-electric hover:text-ghz-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-ghz-blue-electric/10 backdrop-blur-sm"
          >
            Lihat Portfolio
          </motion.a>
        </motion.div>

        {/* Scroll Indicator with bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="hidden md:flex flex-col items-center gap-2 mt-12 select-none"
        >
          <span className="text-[9px] font-mono tracking-[0.2em] text-ghz-silver">SCROLL UNTUK TEROKA</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-ghz-blue-electric" />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
