import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoGhazwah from '../assets/logo ghazwah group.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Anak Syarikat', href: '#syarikat' },
    { name: 'Hubungi', href: '#hubungi' },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled
        ? 'bg-ghz-black/95 backdrop-blur-lg border-b border-ghz-silver/10 shadow-lg shadow-black/20'
        : 'bg-ghz-black/80 backdrop-blur-sm border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#" className="flex items-center gap-2 group">
              <img 
                src={logoGhazwah} 
                alt="Ghazwah Group" 
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight tracking-wider text-ghz-white">
                  GHAZWAH <span className="text-ghz-blue-electric">GROUP</span>
                </span>
                <span className="text-[9px] font-mono text-ghz-silver tracking-widest leading-none">
                  DFK INCUBATOR
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ghz-silver hover:text-ghz-blue-electric px-3 py-2 text-sm font-medium transition-colors duration-250 font-sans"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* CTA Button */}
            <a
              href="#collab"
              className="inline-flex items-center gap-1.5 bg-ghz-red hover:bg-ghz-red/90 text-ghz-white px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-ghz-red/20 font-display btn-gradient"
            >
              Collab Dengan Kami
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-ghz-silver hover:text-ghz-white hover:bg-ghz-blue-deep/30 focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-ghz-black border-b border-ghz-silver/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-ghz-silver hover:text-ghz-blue-electric block px-3 py-3 rounded-md text-base font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 px-3">
            <a
              href="#collab"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-ghz-red hover:bg-ghz-red/90 text-ghz-white px-4 py-3 rounded-md text-base font-semibold transition-all shadow-md shadow-ghz-red/25 w-full font-display"
            >
              Collab Dengan Kami
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
