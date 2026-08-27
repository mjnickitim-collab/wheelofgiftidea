import React, { useEffect } from 'react';
import { FAQ_ITEMS } from '../data/seedData';

interface SeoSectionProps {
  onNavigateBlog: () => void;
}

export const SeoSection: React.FC<SeoSectionProps> = ({ onNavigateBlog }) => {
  // Inject & synchronize JSON-LD Schema
  useEffect(() => {
    const existingScript = document.getElementById('wheelofgiftidea-faq-schema');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'wheelofgiftidea-faq-schema';
    script.type = 'application/ld+json';

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('wheelofgiftidea-faq-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <section
      id="seo-content"
      className="bg-[#2C2149]/60 border border-[#40335F] rounded-2xl p-8 md:p-12 mb-12 shadow-xl backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto">
        {/* H2 Title & Intro */}
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6 text-center md:text-left">
          What is Wheel of Gift Idea?
        </h2>

        <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-4 mb-12">
          <p>
            Finding the perfect gift shouldn&apos;t feel like an exhausting chore. Every year, millions of shoppers suffer from intense decision fatigue when faced with birthdays, holidays, graduations, and wedding anniversaries. You scroll through endless generic search results and sponsor-laden listicles, only to end up settling for another impersonal supermarket gift card.
          </p>
          <p>
            <strong className="text-white font-semibold">Wheel of Gift Idea</strong> (wheelofgiftidea.com) is a <strong className="text-[#06D6A0]">100% free, non-commercial discovery tool</strong> built for pure fun and inspiration. Simply tell our interactive engine who you are shopping for—their age group, your relationship, the special occasion, and your budget constraint—and we immediately build a custom spinning wheel populated with hand-curated gift matches. There are zero accounts to create, no sales pressure, and no hidden fees—just instant, delightful gift discovery.
          </p>
        </div>

        {/* 3-Step "How It Works" */}
        <div className="border-t border-[#40335F] pt-10 mb-12">
          <h3 className="text-2xl font-heading font-bold text-white mb-8 text-center md:text-left">
            How Wheel of Gift Idea Works in 3 Simple Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A132F]/70 border border-[#40335F] p-6 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#FFD166]/20 text-[#FFD166] font-mono font-bold flex items-center justify-center mb-4 text-lg">
                1
              </div>
              <h3 className="text-xl font-heading font-bold text-[#FFD166] mb-2">
                1. Tell Us About Them
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Use the criteria filters to set who the recipient is, what occasion you are celebrating, and your strict budget range.
              </p>
            </div>

            <div className="bg-[#1A132F]/70 border border-[#40335F] p-6 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#4CC9F0]/20 text-[#4CC9F0] font-mono font-bold flex items-center justify-center mb-4 text-lg">
                2
              </div>
              <h3 className="text-xl font-heading font-bold text-[#4CC9F0] mb-2">
                2. Build Your Wheel
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our smart progressive matching engine sifts through hundreds of curated items to craft your personalized wheel.
              </p>
            </div>

            <div className="bg-[#1A132F]/70 border border-[#40335F] p-6 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] font-mono font-bold flex items-center justify-center mb-4 text-lg">
                3
              </div>
              <h3 className="text-xl font-heading font-bold text-[#FF6B6B] mb-2">
                3. Spin For an Idea
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Hit the golden center hub and let fate decide! Enjoy the anticipation and get an inspired, relevant suggestion instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Why Use a Wheel vs Search Engine */}
        <div className="border-t border-[#40335F] pt-10 mb-12">
          <h3 className="text-2xl font-heading font-bold text-white mb-4">
            Why use a gift-picking wheel instead of a standard search engine?
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Search engines are designed to return millions of links, but when you are looking for a gift, having too many choices causes cognitive overload. Here is why the wheel approach is superior:
          </p>

          <ul className="space-y-3 text-slate-300 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#06D6A0] text-lg font-bold">✓</span>
              <div>
                <strong className="text-white">Beats Decision Fatigue:</strong> Instead of drowning in 50 open browser tabs, you focus on high-relevance winners.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#06D6A0] text-lg font-bold">✓</span>
              <div>
                <strong className="text-white">Discover Unexpected Gems:</strong> The randomized spin introduces you to clever products and experiences you might never have thought to type into a search bar.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#06D6A0] text-lg font-bold">✓</span>
              <div>
                <strong className="text-white">Strict Budget Respect:</strong> We treat your spending limit as a primary constraint so you never get recommended out-of-reach luxury items.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#06D6A0] text-lg font-bold">✓</span>
              <div>
                <strong className="text-white">It Makes Shopping Fun:</strong> The visual spin, smooth physics, and celebratory reveal bring joy back into the gifting ritual.
              </div>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#40335F] pt-10">
          <h3 className="text-2xl font-heading font-bold text-white mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-6">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1A132F]/50 border border-[#40335F]/60 rounded-xl p-5"
              >
                <h4 className="text-lg font-heading font-bold text-[#06D6A0] mb-2">
                  {faq.question}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Internal link to blog */}
          <div className="mt-10 text-center">
            <button
              onClick={onNavigateBlog}
              className="inline-flex items-center gap-2 text-[#4CC9F0] hover:text-white font-heading font-bold text-lg border-b border-[#4CC9F0] hover:border-white transition-all pb-1 cursor-pointer"
            >
              <span>Browse our in-depth gift guides & ideas</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
