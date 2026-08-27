import React from 'react';
import { StaticPage } from '../types';

interface StaticPageViewProps {
  slug: string;
  page: StaticPage;
  onNavigateHome: () => void;
}

export const StaticPageView: React.FC<StaticPageViewProps> = ({
  slug,
  page,
  onNavigateHome
}) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <button
        onClick={onNavigateHome}
        className="text-[#4CC9F0] hover:text-white text-sm font-semibold mb-6 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <span>&larr;</span>
        <span>Back to Wheel of Gift Idea</span>
      </button>

      <div className="bg-[#2C2149] border border-[#40335F] rounded-[18px] p-6 sm:p-10 md:p-12 shadow-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-8 capitalize border-b border-[#40335F] pb-4">
          {page.title || slug.replace('-', ' ')}
        </h1>

        <div
          className="prose prose-invert prose-lg max-w-none text-slate-200 space-y-4 leading-relaxed [&>h2]:text-2xl [&>h2]:font-heading [&>h2]:font-bold [&>h2]:text-[#FFD166] [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-[#4CC9F0] [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:text-slate-300 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>em]:text-slate-400"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
};
