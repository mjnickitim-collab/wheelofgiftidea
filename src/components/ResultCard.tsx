import React from 'react';
import { Gift } from '../types';
import { AFFILIATE_ENABLED } from '../data/seedData';

interface ResultCardProps {
  gift: Gift | null;
  needsFilters: boolean;
  onStartOver: () => void;
  relaxedMessage: string | null;
  thinWarning: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  gift,
  needsFilters,
  onStartOver,
  relaxedMessage,
  thinWarning
}) => {
  // If needs filters
  if (needsFilters) {
    return (
      <div className="w-full max-w-[500px] mt-6 bg-[#2C2149] border-2 border-[#FF9F1C] rounded-2xl p-6 text-center shadow-2xl animate-fade-in">
        <div className="text-3xl mb-2">🎯</div>
        <h3 className="text-xl font-heading font-bold text-[#FF9F1C] mb-2">
          Wait a second!
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Tell us who you are shopping for on the right and click{' '}
          <strong className="text-white">&ldquo;Build My Wheel &amp; Spin!&rdquo;</strong> to get a personalized recommendation.
        </p>
        <div className="text-xs font-mono text-slate-400 bg-[#1A132F] py-2 px-3 rounded-lg inline-block">
          👆 Use the criteria form to tailor the wheel
        </div>
      </div>
    );
  }

  // If no genuine result yet (empty state before spin)
  if (!gift) {
    return (
      <div className="w-full max-w-[500px] mt-6">
        {relaxedMessage && (
          <div className="bg-[#FF9F1C]/15 border border-[#FF9F1C]/40 text-[#FFD166] p-3.5 rounded-xl text-center text-xs font-medium mb-3">
            {relaxedMessage}
          </div>
        )}
        {thinWarning && (
          <div className="bg-[#40335F]/60 border border-[#40335F] text-slate-300 p-3 rounded-xl text-center text-xs">
            💡 Note: We found a small number of exact matches. Try selecting &ldquo;Any&rdquo; on some filters for more variety!
          </div>
        )}
      </div>
    );
  }

  // Format tags
  const budgetLabels: Record<string, string> = {
    any: 'Any Budget',
    under10: 'Under $10',
    '10to30': '$10–$30',
    '30to50': '$30–$50',
    '50to100': '$50–$100',
    over100: 'Over $100'
  };

  const occasionTags = gift.occasions
    .filter(o => o !== 'any')
    .slice(0, 2)
    .map(o => o.charAt(0).toUpperCase() + o.slice(1));

  return (
    <div className="w-full max-w-[500px] mt-6 space-y-3">
      {relaxedMessage && (
        <div className="bg-[#FF9F1C]/15 border border-[#FF9F1C]/40 text-[#FFD166] p-3 rounded-xl text-center text-xs font-medium">
          {relaxedMessage}
        </div>
      )}

      {/* Genuine Result Card */}
      <div
        id="winning-result-card"
        className="bg-[#2C2149] border border-[#40335F] rounded-2xl p-6 shadow-2xl transition-all duration-300 relative overflow-hidden group"
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#06D6A0]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/95 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-md shrink-0 border-2 border-white">
            <span className="filter drop-shadow-sm">{gift.emoji}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#06D6A0] bg-[#06D6A0]/10 px-2 py-0.5 rounded uppercase font-semibold">
                Winning Pick
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-snug break-words">
              {gift.name}
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono-tags text-[11px] font-semibold uppercase bg-[#1A132F] text-[#4CC9F0] px-2.5 py-1 rounded-md border border-[#40335F]/60">
            Budget: {budgetLabels[gift.budget] || gift.budget}
          </span>
          {occasionTags.map((occ) => (
            <span
              key={occ}
              className="font-mono-tags text-[11px] font-semibold uppercase bg-[#1A132F] text-[#F72585] px-2.5 py-1 rounded-md border border-[#40335F]/60"
            >
              {occ}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5">
          {gift.desc}
        </p>

        {/* Affiliate Buy Link (Dark if disabled as per prompt) */}
        {AFFILIATE_ENABLED && gift.affiliateLink && (
          <a
            href={gift.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block bg-[#06D6A0] hover:bg-[#05b889] text-[#101530] font-heading font-bold text-base py-3 rounded-full text-center transition-colors shadow-lg mb-3 cursor-pointer"
          >
            🛒 Buy This Gift
          </a>
        )}

        {/* Start Over Button */}
        <button
          onClick={onStartOver}
          className="w-full border border-slate-600 hover:border-slate-300 text-slate-300 hover:text-white font-semibold py-2.5 rounded-full transition-colors text-sm flex items-center justify-center gap-1.5 cursor-pointer bg-[#1A132F]/50 hover:bg-[#1A132F]"
        >
          <span>↩</span>
          <span>Start Over & Reset Filters</span>
        </button>
      </div>
    </div>
  );
};
