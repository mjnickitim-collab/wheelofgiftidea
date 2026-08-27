import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onNavigateHome: () => void;
}

const POSTS_PER_PAGE = 10;

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  onSelectPost,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const publishedPosts = posts
    .filter(p => p.published)
    .sort((a, b) => {
      const timeDiff = new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      if (timeDiff !== 0) return timeDiff;
      const numA = parseInt(a.id.replace('p', ''), 10) || 0;
      const numB = parseInt(b.id.replace('p', ''), 10) || 0;
      return numA - numB;
    });

  const categories = ['all', ...Array.from(new Set(publishedPosts.map(p => p.category)))];

  const filteredPosts = publishedPosts.filter(post => {
    return selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#2C2149] border border-[#40335F] px-4 py-1.5 rounded-full text-xs font-mono text-[#06D6A0] uppercase tracking-wider mb-4">
          <span>📚</span> Curated Gift Guides & Insights
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
          Gift Guides, Ideas & Inspiration
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Expert recommendations, thoughtful shopping advice, and etiquette guides to help you pick the right present for every occasion.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 bg-[#2C2149]/60 border border-[#40335F] p-4 rounded-2xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#9B5DE5] text-white shadow-md scale-105'
                : 'bg-[#1A132F] text-slate-300 hover:text-white hover:bg-[#40335F]'
            }`}
          >
            {cat === 'all' ? 'All Guides' : cat}
          </button>
        ))}
      </div>

      {/* Post count badge */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 px-1">
          <span>Showing {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} guides</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      )}

      {/* Blog Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[#2C2149] border border-[#40335F] rounded-2xl p-12 text-center text-slate-400">
          <p className="text-lg font-heading text-slate-300 mb-2">No gift guides found in this category.</p>
          <p className="text-sm">Please select a different category above.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className="bg-[#2C2149] border border-[#40335F] rounded-2xl p-6 sm:p-8 hover:border-[#9B5DE5] transition-all duration-200 cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono-tags text-xs font-semibold text-[#06D6A0] bg-[#06D6A0]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="font-mono-tags text-xs text-slate-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 group-hover:text-[#4CC9F0] transition-colors leading-tight">
                {post.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {post.excerpt}
              </p>

              {post.keywords && post.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.keywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className="text-[10px] font-mono bg-[#1A132F] text-slate-400 px-2 py-0.5 rounded border border-[#40335F]">
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center text-[#4CC9F0] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                <span>Read Full Gift Guide</span>
                <span className="ml-1">→</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentPage === 1
                ? 'bg-[#1A132F] text-slate-600 cursor-not-allowed border border-[#40335F]/40'
                : 'bg-[#2C2149] text-slate-200 hover:text-white hover:bg-[#40335F] border border-[#40335F]'
            }`}
          >
            &larr; Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-[#9B5DE5] to-[#7928CA] text-white shadow-md'
                  : 'bg-[#2C2149] text-slate-300 hover:text-white hover:bg-[#40335F] border border-[#40335F]'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentPage === totalPages
                ? 'bg-[#1A132F] text-slate-600 cursor-not-allowed border border-[#40335F]/40'
                : 'bg-[#2C2149] text-slate-200 hover:text-white hover:bg-[#40335F] border border-[#40335F]'
            }`}
          >
            Next &rarr;
          </button>
        </div>
      )}

      {/* Return to Wheel CTA */}
      <div className="mt-12 bg-gradient-to-r from-[#2C2149] to-[#1A132F] border border-[#40335F] rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-heading font-bold text-white mb-2">
          Ready to let the wheel pick your gift?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
          Set your recipient&apos;s details and spin for customized, instant inspiration.
        </p>
        <button
          onClick={onNavigateHome}
          className="bg-gradient-to-r from-[#FFD166] to-[#FF9F1C] hover:from-[#ffe45e] hover:to-[#ffd166] text-[#101530] font-heading font-bold text-base px-8 py-3 rounded-full transition-all shadow-lg cursor-pointer"
        >
          🎡 Spin the Wheel of Gift Idea
        </button>
      </div>
    </div>
  );
};
