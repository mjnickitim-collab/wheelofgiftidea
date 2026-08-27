import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#40335F] mt-auto bg-[#101530]/80 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎁</span>
          <span>
            &copy; {currentYear} <strong className="text-slate-300 font-medium">Wheel of Gift Idea</strong> (wheelofgiftidea.com). All rights reserved.
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <a
            href="mailto:contact@wheelofgiftidea.com"
            className="hidden sm:inline text-xs font-mono text-slate-400 hover:text-[#4CC9F0] transition-colors"
          >
            contact@wheelofgiftidea.com
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <button
            onClick={() => onNavigate('/about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('/privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('/terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};
