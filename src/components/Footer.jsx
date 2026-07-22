import React from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import logoGhazwah from '../assets/logo ghazwah group.png';
import logoDfk from '../assets/logo dfk incubator.jpg';
import { trackEvent } from '../utils/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ghz-black text-ghz-silver font-sans mt-auto">
      {/* CTA Band */}
      <div className="border-y border-ghz-silver/10 bg-gradient-to-r from-ghz-blue-deep/10 via-ghz-blue-electric/5 to-ghz-blue-deep/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display font-bold text-xl md:text-2xl text-ghz-white mb-2">
                Sedia untuk <span className="text-ghz-blue-electric">Bertransformasi?</span>
              </h3>
              <p className="font-sans text-sm text-ghz-silver/70 max-w-lg">
                Bincang dengan pasukan kami tentang bagaimana Ghazwah Group boleh membantu perniagaan anda melangkau ke era digital.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <a
                href="#hubungi"
                onClick={() => trackEvent('conversion', 'cta_click', 'Footer — Hubungi Kami')}
                className="inline-flex items-center gap-2 bg-ghz-red hover:bg-ghz-red/90 text-ghz-white px-6 py-3.5 rounded-md text-sm font-bold transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-ghz-red/20 btn-gradient"
              >
                <MessageSquare className="w-4 h-4" />
                Hubungi Kami
              </a>
              <a
                href="https://wa.me/60195132821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('conversion', 'whatsapp_click', 'Footer CTA')}
                className="inline-flex items-center gap-1.5 border border-ghz-silver/30 hover:border-emerald-500/50 text-ghz-silver hover:text-white px-6 py-3.5 rounded-md text-sm font-semibold transition-all btn-gradient"
              >
                WhatsApp Kami
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Brief & Logo */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img 
                src={logoGhazwah} 
                alt="Ghazwah Group" 
                className="h-8 w-auto object-contain"
              />
              <span className="font-display font-bold text-base tracking-wider text-ghz-white">
                GHAZWAH <span className="text-ghz-blue-electric">GROUP</span>
              </span>
            </div>
            <p className="text-xs text-ghz-silver/70 max-w-sm">
              Entiti korporat dan syarikat induk dinamik yang memacu transformasi digital merentasi perkomputeran awan, e-dagang, agroteknologi, dan pemasaran.
            </p>
            <div className="text-[11px] font-mono text-ghz-silver/70">
              <div>Nama Berdaftar: GHAZWAH TRADING</div>
              <div>No. Pendaftaran SSM: 202603084068 (003836930-K)</div>
            </div>
          </div>

          {/* Quick Links Placeholder */}
          <div>
            <h3 className="font-display font-semibold text-ghz-white text-sm tracking-wider uppercase mb-3">
              Kategori Teras
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#portfolio" className="hover:text-ghz-blue-electric transition-colors">Healthcare Technology</a></li>
              <li><a href="#portfolio" className="hover:text-ghz-blue-electric transition-colors">Business & Point of Sale (POS)</a></li>
              <li><a href="#portfolio" className="hover:text-ghz-blue-electric transition-colors">AI & Automasi Perniagaan</a></li>
              <li><a href="#portfolio" className="hover:text-ghz-blue-electric transition-colors">Cloud & Infrastruktur Digital</a></li>
            </ul>
          </div>

          {/* Location & Incubator */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <img 
                src={logoDfk} 
                alt="DFK Incubator" 
                className="h-8 w-auto object-contain"
              />
              <h3 className="font-display font-semibold text-ghz-white text-sm tracking-wider uppercase">
                DFK Incubator
              </h3>
            </div>
            <p className="text-xs text-ghz-silver/70 leading-relaxed">
              Inkubator DFK (Ghazwah Group),<br />
              Institut Kemahiran MARA Besut (TVETMARA Besut),<br />
              Jalan Batu Tumbuh, Alor Lintang,<br />
              22200 Kampung Raja, Terengganu.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ghz-silver/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ghz-silver/70">
          <p>
            &copy; {currentYear} Ghazwah Group (Ghazwah Trading). Hak Cipta Terpelihara.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-ghz-blue-electric transition-colors">Penafian</a>
            <a href="#" className="hover:text-ghz-blue-electric transition-colors">Dasar Privasi</a>
            <a href="https://wa.me/60195132821" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('conversion', 'whatsapp_click', 'Footer Bottom Bar')} className="hover:text-ghz-blue-electric transition-colors font-mono">
              WhatsApp: +60 19-513 2821
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
