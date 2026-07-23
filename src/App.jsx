import React, { Suspense, lazy, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TrustBar from './components/TrustBar';
import { initGA, trackPageView } from './utils/analytics';

// Code-split below-the-fold sections to reduce initial JS bundle size.
// Vite will create separate chunks loaded only when each section scrolls into view.
const StatsStrip = lazy(() => import('./components/StatsStrip'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./sections/About'));
const Portfolio = lazy(() => import('./sections/Portfolio'));
const Subsidiaries = lazy(() => import('./sections/Subsidiaries'));
const CollabAndContact = lazy(() => import('./sections/CollabAndContact'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));
const Footer = lazy(() => import('./components/Footer'));

// Minimal placeholder for lazy-loaded sections
function SectionFallback() {
  return (
    <div className="w-full h-32 bg-ghz-black animate-pulse" />
  );
}

export default function App() {
  useEffect(() => {
    initGA();
    // Track initial page view + subsequent hash changes
    trackPageView();
    const handleHashChange = () => trackPageView();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-ghz-black text-ghz-white selection:bg-ghz-blue-electric selection:text-ghz-white">
      {/* Sticky Header Navigation — always visible, static import */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section — above fold, static import */}
        <Hero />

        {/* Trust Bar — trust signals, SSM reg, always visible */}
        <TrustBar />

        {/* Below-the-fold sections loaded on demand via React.lazy */}
        <Suspense fallback={<SectionFallback />}>
          <StatsStrip />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Subsidiaries />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <CollabAndContact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>

      {/* Vercel Analytics — page views and web vitals */}
      <Analytics />

      {/* Vercel Speed Insights — Core Web Vitals monitoring */}
      <SpeedInsights />
    </div>
  );
}
