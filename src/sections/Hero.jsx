import React from 'react';
import { ArrowDown, ArrowUpRight, MessageSquareCode, TrendingUp, ShieldCheck, Bot } from 'lucide-react';
import CircuitBackground from '../components/CircuitBackground';
import FloatingTechIcons from '../components/FloatingTechIcons';
import logoGhazwah from '../assets/logo ghazwah group.png';
import heroIllustration from '../assets/hero.png';
import { trackEvent } from '../utils/analytics';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90svh] flex flex-col items-center justify-center overflow-hidden bg-ghz-black px-4 sm:px-6 lg:px-8 py-12 md:py-24 border-b border-ghz-silver/5">
      {/* Dynamic Digital Circuit Background */}
      <CircuitBackground />

      {/* Decorative Radial Glowing Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-ghz-blue-electric/5 blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full bg-ghz-red/4 blur-[80px] pointer-events-none z-0"></div>

      {/* Floating tech icons with parallax effect */}
      <FloatingTechIcons />

      {/* Hero brand illustration — subtle watermark behind the content */}
      <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
        <div className="relative flex items-center justify-center">
          {/* Soft glow behind the illustration */}
          <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-ghz-blue-electric/10 rounded-full blur-[120px]"></div>
          <img
            src={heroIllustration}
            alt=""
            aria-hidden="true"
            className="w-auto h-[260px] sm:h-[360px] object-contain opacity-[0.08] sm:opacity-[0.12] animate-pulse-slow"
          />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        
        {/* Brand Badge — logo above headline */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-3 bg-ghz-blue-deep/20 border border-ghz-silver/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <img 
              src={logoGhazwah} 
              alt="Ghazwah Group" 
              className="h-7 w-auto object-contain"
            />
            <div className="h-4 w-px bg-ghz-silver/20" />
            <span className="text-[10px] font-mono text-ghz-silver/60 tracking-wider uppercase">
              SSM: 202603084068
            </span>
          </div>
        </div>

        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 bg-ghz-blue-deep/30 border border-ghz-blue-electric/30 px-4 py-1.5 rounded-full text-xs font-mono text-ghz-blue-electric tracking-wide select-none">
          <span className="w-2 h-2 rounded-full bg-ghz-blue-electric animate-pulse"></span>
          ERA BARU INOVASI DIGITAL
        </div>

        {/* Main Headline — value-prop driven */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-ghz-white leading-[1.05] tracking-tight max-w-4xl">
          Transformasi Digital Untuk 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ghz-blue-electric via-ghz-white to-ghz-blue-electric"> Perniagaan Malaysia</span>
        </h1>
        
        {/* Sub-headline — benefit focused */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-ghz-silver/80 leading-relaxed max-w-3xl">
          Satu ekosistem bersepadu merentasi <span className="text-ghz-white font-medium">perkomputeran awan, automasi AI, perniagaan runcit digital, dan agroteknologi lestari</span> — diterajui dari Inkubator DFK TVETMARA Besut.
        </p>

        {/* Benefit Pills — quick trust/ROI signals */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ghz-blue-deep/20 border border-ghz-blue-electric/20 text-[11px] font-mono text-ghz-blue-electric">
            <TrendingUp className="w-3.5 h-3.5" />
            Jimat 70% Kos Operasi
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ghz-red/10 border border-ghz-red/20 text-[11px] font-mono text-ghz-red">
            <ShieldCheck className="w-3.5 h-3.5" />
            10 Produk Siap Industri
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <Bot className="w-3.5 h-3.5" />
            8 Ejen AI 24/7
          </div>
        </div>

        {/* CTA Buttons — with urgency */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <a
            href="#collab"
            onClick={() => trackEvent('conversion', 'cta_click', 'Hero — Jom Collab')}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-ghz-red hover:bg-ghz-red/90 text-ghz-white px-8 py-4 rounded-md text-base font-bold transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-ghz-red/25 gap-2 group btn-gradient"
          >
            <MessageSquareCode className="w-5 h-5" />
            Jom Collab — Bincang Projek Anda
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#portfolio"
            onClick={() => trackEvent('navigation', 'cta_click', 'Hero — Lihat Portfolio')}
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-ghz-silver/30 hover:border-ghz-blue-electric text-ghz-silver hover:text-ghz-white px-8 py-4 rounded-md text-base font-semibold transition-all duration-300 hover:bg-ghz-blue-electric/5 btn-gradient"
          >
            Lihat Portfolio
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex flex-col items-center gap-2 mt-12 animate-bounce opacity-40 select-none">
          <span className="text-[9px] font-mono tracking-[0.2em] text-ghz-silver">SCROLL UNTUK TEROKA</span>
          <ArrowDown className="w-4 h-4 text-ghz-blue-electric" />
        </div>

      </div>
    </section>
  );
}
