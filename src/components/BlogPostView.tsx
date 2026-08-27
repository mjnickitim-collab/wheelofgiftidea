import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../types';

interface BlogPostViewProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onNavigateHome: () => void;
  onNavigateSlug?: (slug: string) => void;
  onNavigatePath?: (path: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  onBackToBlog,
  onNavigateHome,
  onNavigateSlug,
  onNavigatePath
}) => {
  // Dynamically set Document Title, Meta tags, and JSON-LD Structured Data for SEO
  useEffect(() => {
    // 1. Title
    const originalTitle = document.title;
    document.title = `${post.seoTitle || post.title} | Wheel of Gift Idea`;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute('content', post.metaDescription || post.excerpt);

    // 3. Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const prevKeywords = metaKeywords.getAttribute('content');
    metaKeywords.setAttribute('content', (post.keywords || []).join(', '));

    // 4. OpenGraph tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', post.seoTitle || post.title);
    updateOrCreateMeta('og:description', post.metaDescription || post.excerpt);
    updateOrCreateMeta('og:type', 'article');
    updateOrCreateMeta('og:url', window.location.href);

    // 5. JSON-LD Article Schema
    const scriptId = 'blog-post-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      name: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      articleBody: post.content.replace(/[#*`_\[\]()]/g, ' ').slice(0, 5000),
      wordCount: post.content.split(/\s+/).length,
      timeRequired: post.readTime || '7 min read',
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        name: 'Wheel of Gift Idea',
        url: 'https://wheelofgiftidea.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Wheel of Gift Idea',
        url: 'https://wheelofgiftidea.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://wheelofgiftidea.com/favicon.svg'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href
      },
      keywords: (post.keywords || []).join(', ')
    };

    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      if (prevDesc && metaDesc) metaDesc.setAttribute('content', prevDesc);
      if (prevKeywords && metaKeywords) metaKeywords.setAttribute('content', prevKeywords);
      const injectedScript = document.getElementById(scriptId);
      if (injectedScript) injectedScript.remove();
    };
  }, [post]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string | undefined) => {
    if (!href) return;
    if (href.startsWith('/')) {
      e.preventDefault();
      if (href.startsWith('/blog/')) {
        const slug = href.replace('/blog/', '').replace(/\/$/, '');
        if (onNavigateSlug) {
          onNavigateSlug(slug);
        } else if (onNavigatePath) {
          onNavigatePath(href);
        }
      } else if (onNavigatePath) {
        onNavigatePath(href);
      } else if (href === '/') {
        onNavigateHome();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Back navigation */}
      <button
        onClick={onBackToBlog}
        className="text-[#4CC9F0] hover:text-white text-sm font-semibold mb-6 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <span>&larr;</span>
        <span>Back to All Gift Guides</span>
      </button>

      <article className="bg-[#2C2149] border border-[#40335F] rounded-[20px] p-6 sm:p-10 md:p-14 shadow-2xl mb-12">
        {/* Category & Date Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[#40335F]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono-tags text-xs font-semibold text-[#06D6A0] uppercase tracking-wider bg-[#06D6A0]/10 px-3 py-1 rounded-full border border-[#06D6A0]/30">
              {post.category}
            </span>
            <span className="font-mono-tags text-xs text-slate-400">
              Published on {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Lead Excerpt Callout */}
        <div className="bg-[#1A132F] border-l-4 border-[#FFD166] p-5 rounded-r-2xl mb-8 text-slate-200 text-base sm:text-lg font-medium leading-relaxed italic shadow-inner">
          {post.excerpt}
        </div>

        {/* Target Keywords Pill Cloud for SEO transparency */}
        {post.keywords && post.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-[#40335F]/60">
            <span className="text-xs font-mono text-slate-400 mr-1">Topics:</span>
            {post.keywords.map((kw, i) => (
              <span
                key={i}
                className="text-[11px] font-mono bg-[#1A132F] text-slate-300 px-2.5 py-0.5 rounded-md border border-[#40335F]"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}

        {/* Rich Article Body via ReactMarkdown with Custom Component Renderers */}
        <div className="markdown-body text-slate-200 text-base sm:text-lg leading-relaxed space-y-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              hr: () => null,
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl sm:text-3xl font-heading font-bold text-white mt-10 mb-4 pt-2 flex items-center gap-2"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl sm:text-2xl font-heading font-bold text-[#FFD166] mt-8 mb-3"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-slate-300 leading-relaxed my-4 text-base sm:text-lg" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 space-y-2.5 text-slate-300 my-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 space-y-2.5 text-slate-300 my-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-relaxed text-slate-300" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-[#06D6A0] bg-[#1A132F]/80 px-5 py-4 rounded-r-xl my-6 text-slate-200 font-medium italic"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-white" {...props} />
              ),
              a: ({ node, href, children, ...props }) => {
                const isInternal = href?.startsWith('/');
                return (
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    target={isInternal ? undefined : '_blank'}
                    rel={isInternal ? undefined : 'noopener noreferrer'}
                    className={`font-semibold underline decoration-2 underline-offset-4 transition-colors ${
                      isInternal
                        ? 'text-[#4CC9F0] hover:text-[#9B5DE5] decoration-[#4CC9F0]/60'
                        : 'text-[#06D6A0] hover:text-[#FFD166] decoration-[#06D6A0]/60'
                    }`}
                    {...props}
                  >
                    {children}
                    {!isInternal && <span className="inline-block ml-1 text-xs opacity-75">↗</span>}
                  </a>
                );
              },
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-7 bg-[#1A132F] rounded-xl border border-[#40335F] shadow-xl">
                  <table className="w-full min-w-[500px] text-left text-sm text-slate-200 border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-[#120E22] text-[#FFD166] font-mono text-xs uppercase tracking-wider border-b border-[#40335F]" {...props} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody className="divide-y divide-[#40335F]/60" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="hover:bg-[#2C2149]/50 transition-colors odd:bg-[#1A132F] even:bg-[#1F1738]/50" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-4 py-3.5 font-bold font-mono text-xs text-[#FFD166] whitespace-nowrap" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-3 text-slate-200 text-sm leading-relaxed" {...props} />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Bottom Interactive CTA to Spin Wheel */}
        <div className="mt-14 pt-8 border-t border-[#40335F] bg-[#1A132F]/80 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <span className="text-4xl block mb-3 animate-bounce">🎡</span>
          <h3 className="text-2xl font-heading font-extrabold text-white mb-2">
            Ready to let the wheel pick your next gift?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
            Eliminate decision fatigue in seconds. Choose your recipient, set your exact budget, and spin the Wheel of Gift Idea for curated, delightful suggestions.
          </p>
          <button
            onClick={onNavigateHome}
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] hover:from-[#ff5252] hover:to-[#e03a3a] text-white font-heading font-bold text-base sm:text-lg px-8 py-3.5 rounded-full transition-all shadow-xl hover:shadow-[#FF6B6B]/30 cursor-pointer"
          >
            🎡 Launch Wheel of Gift Idea Now
          </button>
        </div>
      </article>
    </div>
  );
};
