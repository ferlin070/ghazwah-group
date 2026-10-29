import React, { Suspense, lazy, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TrustBar from './components/TrustBar';
import { initGA, trackPageView } from './utils/analytics';

const StatsStrip = lazy(() => import('./components/StatsStrip'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./sections/About'));
const Portfolio = lazy(() => import('./sections/Portfolio'));
const Subsidiaries = lazy(() => import('./sections/Subsidiaries'));
const CollabAndContact = lazy(() => import('./sections/CollabAndContact'));
const Penafian = lazy(() => import('./sections/Penafian'));
const DasarPrivasi = lazy(() => import('./sections/DasarPrivasi'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div className="section-shell py-8" aria-hidden="true">
      <div className="surface-card-soft shimmer h-28" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initGA();
    trackPageView();
    const handleHashChange = () => trackPageView();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-ghz-black text-ghz-white selection:bg-ghz-blue-electric/40 selection:text-ghz-white">
      <Navbar />

      <main>
        <Hero />
        <TrustBar />

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

        <Suspense fallback={<SectionFallback />}>
          <Penafian />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <DasarPrivasi />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
