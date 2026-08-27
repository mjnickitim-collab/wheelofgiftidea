import React from 'react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const isHome = currentPath === '/' || currentPath === '';
  const isBlog = currentPath.startsWith('/blog');

  return (
    <header className="sticky top-0 z-50 bg-[#101530]/85 backdrop-blur-md border-b border-[#40335F]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="font-heading font-extrabold text-2xl tracking-wide flex items-center gap-2 hover:opacity-90 transition-opacity text-white"
          id="nav-logo"
        >
          <span className="text-2xl sm:text-3xl filter drop-shadow">🎁</span>
          <span className="text-xl sm:text-2xl">
            Wheel of <span className="text-[#FFD166]">Gift Idea</span><span className="text-[#FF6B6B]">.</span>
          </span>
        </a>

        <div className="flex items-center gap-1.5 bg-[#2C2149] p-1.5 rounded-full border border-[#40335F] shadow-inner">
          <button
            onClick={() => onNavigate('/')}
            id="nav-link-home"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isHome
                ? 'bg-[#40335F] text-white shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#40335F]/50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('/blog')}
            id="nav-link-blog"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              isBlog
                ? 'bg-[#40335F] text-white shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#40335F]/50'
            }`}
          >
            Blog & Guides
          </button>
        </div>
      </div>
    </header>
  );
};
