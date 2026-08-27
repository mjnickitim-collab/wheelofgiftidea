import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gift, FilterCriteria, AppStoreData } from './types';
import { StorageService } from './data/storage';
import { filterGifts, FilterResult } from './utils/wheelLogic';
import { Navbar } from './components/Navbar';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { Wheel } from './components/Wheel';
import { FilterForm } from './components/FilterForm';
import { ResultCard } from './components/ResultCard';
import { SeoSection } from './components/SeoSection';
import { AdSlot } from './components/AdSlot';
import { BlogList } from './components/BlogList';
import { BlogPostView } from './components/BlogPostView';
import { StaticPageView } from './components/StaticPageView';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

const INITIAL_FILTERS: FilterCriteria = {
  gender: 'any',
  age: 'any',
  relationship: 'any',
  occasion: 'any',
  budget: 'any'
};

export default function App() {
  const [store, setStore] = useState<AppStoreData>(() => StorageService.getData());
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const pathname = window.location.pathname || '/';
    const hash = window.location.hash || '';

    // Legacy hash migration to clean paths
    if (hash.startsWith('#/blog/')) {
      return hash.replace('#', '');
    }
    if (hash === '#/blog' || hash === '#blog') {
      return '/blog';
    }
    if (['#about', '#contact', '#privacy', '#terms'].includes(hash)) {
      return '/' + hash.replace('#', '');
    }
    return pathname;
  });

  // Wheel & Filters state
  const [filters, setFilters] = useState<FilterCriteria>(INITIAL_FILTERS);
  const [wheelReady, setWheelReady] = useState<boolean>(true);
  const [wheelItems, setWheelItems] = useState<Gift[]>([]);
  const [lastWinningId, setLastWinningId] = useState<string | null>(null);
  const [spinTrigger, setSpinTrigger] = useState<number>(0);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);
  const [needsFiltersMessage, setNeedsFiltersMessage] = useState<boolean>(false);
  const [isFormPulsing, setIsFormPulsing] = useState<boolean>(false);

  const [filterInfo, setFilterInfo] = useState<{ message: string | null; thinWarning: boolean }>({
    message: null,
    thinWarning: false
  });

  const formSectionRef = useRef<HTMLDivElement>(null);

  // Subscribe to storage changes
  useEffect(() => {
    const unsubscribe = StorageService.subscribe((updated) => {
      setStore(updated);
    });
    return () => unsubscribe();
  }, []);

  // Initialize sample wheel on first load
  useEffect(() => {
    if (store.gifts.length > 0 && wheelItems.length === 0) {
      // Pick random 12 sample items for initial display
      const shuffled = [...store.gifts].sort(() => 0.5 - Math.random());
      setWheelItems(shuffled.slice(0, 12));
    }
  }, [store.gifts, wheelItems.length]);

  // Route & History handling
  const navigateTo = (path: string) => {
    try {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
    } catch (e) {
      console.warn('pushState not supported in environment, fallback to memory router:', e);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#gw-admin' || hash === '#gw-admin-2026') {
        navigateTo('/admin');
      } else if (hash.startsWith('#/blog/')) {
        navigateTo(hash.replace('#', ''));
      } else if (hash === '#/blog' || hash === '#blog') {
        navigateTo('/blog');
      } else if (['#about', '#contact', '#privacy', '#terms'].includes(hash)) {
        navigateTo('/' + hash.replace('#', ''));
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    // Initial hash cleanup if applicable
    if (window.location.hash.startsWith('#/blog') || ['#about', '#contact', '#privacy', '#terms'].includes(window.location.hash)) {
      const cleanPath = window.location.hash.startsWith('#/blog')
        ? window.location.hash.replace('#', '')
        : '/' + window.location.hash.replace('#', '');
      try {
        window.history.replaceState({}, '', cleanPath);
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // --- Filter change handler ---
  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // --- Build Wheel & Spin button click (1-click Build & Spin) ---
  const handleBuildWheelAndSpin = () => {
    const result: FilterResult = filterGifts(store.gifts, filters);
    setWheelItems(result.items);
    setFilterInfo({
      message: result.relaxedMessage,
      thinWarning: result.thinWarning
    });
    setWheelReady(true);
    setNeedsFiltersMessage(false);
    setWonGift(null);

    // Increment spinTrigger to trigger wheel spin immediately
    setSpinTrigger((prev) => prev + 1);

    // If on mobile / narrow screen, gently scroll wheel into view
    if (window.innerWidth < 768) {
      const wheelEl = document.getElementById('wheel-section');
      if (wheelEl) {
        wheelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // --- Spin Started ---
  const handleSpinStart = () => {
    setIsSpinning(true);
    setNeedsFiltersMessage(false);
    setWonGift(null);
  };

  // --- Spin Completed ---
  const handleSpinEnd = (winningGift: Gift) => {
    setIsSpinning(false);

    if (!wheelReady) {
      // Gated result: show prompt to configure criteria first!
      setNeedsFiltersMessage(true);
      setIsFormPulsing(true);

      // Scroll form into view gently
      const formEl = document.getElementById('filter-form-card');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setTimeout(() => {
        setIsFormPulsing(false);
      }, 1600);
      return;
    }

    // Genuine result!
    setWonGift(winningGift);
    setLastWinningId(winningGift.id);
    StorageService.incrementSpins();

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#FFD166', '#06D6A0', '#4CC9F0', '#F72585', '#9B5DE5']
      });
    } catch (e) {}

    // Scroll result card into view
    setTimeout(() => {
      const resEl = document.getElementById('winning-result-card');
      if (resEl) {
        resEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // --- Start Over ---
  const handleStartOver = () => {
    setFilters(INITIAL_FILTERS);
    setWheelReady(false);
    setWonGift(null);
    setNeedsFiltersMessage(false);
    setFilterInfo({ message: null, thinWarning: false });

    // Reload random sample
    const shuffled = [...store.gifts].sort(() => 0.5 - Math.random());
    setWheelItems(shuffled.slice(0, 12));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- View Router ---
  const renderCurrentView = () => {
    // Admin Dashboard
    if (currentPath === '/admin') {
      return (
        <AdminDashboard
          data={store}
          onExit={() => navigateTo('/')}
        />
      );
    }

    // Blog Post View
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      const post = store.posts.find((p) => p.slug === slug && p.published);
      if (post) {
        return (
          <BlogPostView
            post={post}
            onBackToBlog={() => navigateTo('/blog')}
            onNavigateHome={() => navigateTo('/')}
            onNavigateSlug={(s) => navigateTo(`/blog/${s}`)}
            onNavigatePath={(p) => navigateTo(p)}
          />
        );
      } else {
        // Fallback to Blog List if not found
        return (
          <BlogList
            posts={store.posts}
            onSelectPost={(s) => navigateTo(`/blog/${s}`)}
            onNavigateHome={() => navigateTo('/')}
          />
        );
      }
    }

    // Blog List View
    if (currentPath === '/blog') {
      return (
        <BlogList
          posts={store.posts}
          onSelectPost={(s) => navigateTo(`/blog/${s}`)}
          onNavigateHome={() => navigateTo('/')}
        />
      );
    }

    // Static Pages (About, Contact, Privacy, Terms)
    const staticSlug = currentPath.replace(/^\//, '').replace(/\/$/, '');
    if (['about', 'contact', 'privacy', 'terms'].includes(staticSlug)) {
      const page = store.pages[staticSlug] || {
        title: staticSlug,
        content: '<p>Page content coming soon.</p>'
      };
      return (
        <StaticPageView
          slug={staticSlug}
          page={page}
          onNavigateHome={() => navigateTo('/')}
        />
      );
    }

    // Default: Home Page
    return (
      <div className="w-full">
        {/* Hero Header */}
        <div className="text-center mb-10 pt-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#2C2149] border border-[#40335F] px-4 py-1.5 rounded-full text-xs font-mono text-[#FFD166] uppercase tracking-wider mb-4 shadow-sm">
            <span>🎡</span> Interactive Gift Discovery • Spin &amp; Find
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-4 leading-tight text-white">
            Stop guessing. Start <br className="hidden sm:block" />
            <span className="text-gradient">spinning for the perfect gift.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            Turn stressful gift shopping into a fun game! Pick who you&apos;re shopping for, set your budget, and let the wheel surprise you with clever, hand-picked gift ideas in seconds.
          </p>
        </div>

        {/* 2/3 - 1/3 Desktop Grid (Collapses on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10 items-start">
          {/* Left 2/3: The Wheel Focal Point & Result Slot */}
          <div className="md:col-span-2 flex flex-col items-center justify-center">
            <Wheel
              items={wheelItems}
              isSpinning={isSpinning}
              onSpinStart={handleSpinStart}
              onSpinEnd={handleSpinEnd}
              lastWinningId={lastWinningId}
              spinTrigger={spinTrigger}
            />

            {/* Shared Result Card / Needs Filter Card Slot */}
            <ResultCard
              gift={wonGift}
              needsFilters={needsFiltersMessage}
              onStartOver={handleStartOver}
              relaxedMessage={filterInfo.message}
              thinWarning={filterInfo.thinWarning}
            />
          </div>

          {/* Right 1/3: Compact Criteria Filter Form */}
          <div ref={formSectionRef} className="md:col-span-1 w-full">
            <FilterForm
              filters={filters}
              onChange={handleFilterChange}
              onSubmit={handleBuildWheelAndSpin}
              isPulsing={isFormPulsing}
            />
          </div>
        </div>

        {/* Full-Width SEO-Structured Section */}
        <SeoSection onNavigateBlog={() => navigateTo('/blog')} />

        {/* On-page Monetization Ad Slot (if enabled by admin) */}
        <AdSlot settings={store.adSettings} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#101530] text-[#f8fafc]">
      {/* Background Animated Blobs */}
      <BackgroundBlobs />

      {/* Sticky Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main id="app-root" className="flex-grow w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
