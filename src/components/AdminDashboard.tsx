import React, { useState } from 'react';
import { Gift, BlogPost, StaticPage, AdSettings, AppStoreData, BudgetBand, Gender, AgeBand, Relationship, Occasion } from '../types';
import { StorageService } from '../data/storage';
import { AFFILIATE_ENABLED } from '../data/seedData';

interface AdminDashboardProps {
  data: AppStoreData;
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'gifts' | 'blog' | 'pages' | 'ads' | 'firestore'>('overview');

  // Gift Modal state
  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [giftForm, setGiftForm] = useState<Partial<Gift>>({
    emoji: '🎁',
    name: '',
    desc: '',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['any'],
    occasions: ['any'],
    affiliateLink: ''
  });

  // Blog Modal state
  const [isBlogModalOpen, setIsBlogModalOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    seoTitle: '',
    metaDescription: '',
    keywords: [],
    readTime: '7 min read',
    author: 'Wheel of Gift Idea Editorial Team',
    category: 'Guides',
    excerpt: '',
    content: '',
    published: true,
    date: new Date().toISOString().split('T')[0]
  });
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState<boolean>(false);
  const [keywordsInput, setKeywordsInput] = useState<string>('');

  // Pages state
  const [selectedPageKey, setSelectedPageKey] = useState<string>('about');
  const [pageContent, setPageContent] = useState<string>(data.pages['about']?.content || '');
  const [pageTitle, setPageTitle] = useState<string>(data.pages['about']?.title || '');

  // Ad Settings state
  const [adEnabled, setAdEnabled] = useState<boolean>(data.adSettings.enabled);
  const [adCode, setAdCode] = useState<string>(data.adSettings.clientCode);

  // Search in Gifts & Posts
  const [giftSearch, setGiftSearch] = useState<string>('');
  const [blogSearch, setBlogSearch] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length === 4) {
      setIsAuthenticated(true);
    } else {
      alert('Please enter a 4-digit PIN (e.g. 2026 or any 4 digits for this prototype).');
    }
  };

  // --- Slug Auto-generation logic ---
  const handleBlogTitleChange = (val: string) => {
    const updated = { ...postForm, title: val };
    if (!isSlugManuallyEdited) {
      updated.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setPostForm(updated);
  };

  const handleBlogSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setPostForm({
      ...postForm,
      slug: val
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    });
  };

  // --- Gift Modal handlers ---
  const openAddGift = () => {
    setEditingGift(null);
    setGiftForm({
      id: `g_${Date.now()}`,
      emoji: '🎁',
      name: '',
      desc: '',
      budget: '30to50',
      genders: ['any'],
      ageBands: ['any'],
      relationships: ['any'],
      occasions: ['any'],
      affiliateLink: ''
    });
    setIsGiftModalOpen(true);
  };

  const openEditGift = (gift: Gift) => {
    setEditingGift(gift);
    setGiftForm({ ...gift });
    setIsGiftModalOpen(true);
  };

  const handleSaveGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftForm.name?.trim()) {
      alert('Please provide a gift name.');
      return;
    }
    const newGift: Gift = {
      id: editingGift ? editingGift.id : `g_${Date.now()}`,
      emoji: giftForm.emoji?.trim() || '🎁',
      name: giftForm.name.trim(),
      desc: giftForm.desc?.trim() || '',
      budget: (giftForm.budget as BudgetBand) || 'any',
      genders: (giftForm.genders as Gender[]) || ['any'],
      ageBands: (giftForm.ageBands as AgeBand[]) || ['any'],
      relationships: (giftForm.relationships as Relationship[]) || ['any'],
      occasions: (giftForm.occasions as Occasion[]) || ['any'],
      affiliateLink: giftForm.affiliateLink?.trim() || ''
    };

    StorageService.saveGift(newGift);
    setIsGiftModalOpen(false);
    showFeedback('Gift successfully saved!');
  };

  const handleDeleteGift = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gift from the catalog?')) {
      StorageService.deleteGift(id);
      showFeedback('Gift deleted.');
    }
  };

  // --- Blog Modal handlers ---
  const openAddPost = () => {
    setEditingPost(null);
    setIsSlugManuallyEdited(false);
    setKeywordsInput('');
    setPostForm({
      id: `p_${Date.now()}`,
      title: '',
      slug: '',
      seoTitle: '',
      metaDescription: '',
      keywords: [],
      readTime: '8 min read',
      author: 'Wheel of Gift Idea Editorial Team',
      category: 'Guides',
      excerpt: '',
      content: '',
      published: true,
      date: new Date().toISOString().split('T')[0]
    });
    setIsBlogModalOpen(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsSlugManuallyEdited(true);
    setKeywordsInput(post.keywords ? post.keywords.join(', ') : '');
    setPostForm({ ...post });
    setIsBlogModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title?.trim()) {
      alert('Please provide a post title.');
      return;
    }
    const parsedKeywords = keywordsInput
      ? keywordsInput.split(',').map((k) => k.trim()).filter((k) => k.length > 0)
      : postForm.keywords || [];

    const newPost: BlogPost = {
      id: editingPost ? editingPost.id : `p_${Date.now()}`,
      title: postForm.title.trim(),
      slug: postForm.slug?.trim() || postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      seoTitle: postForm.seoTitle?.trim() || postForm.title.trim(),
      metaDescription: postForm.metaDescription?.trim() || postForm.excerpt?.trim() || '',
      keywords: parsedKeywords,
      readTime: postForm.readTime?.trim() || '8 min read',
      author: postForm.author?.trim() || 'Wheel of Gift Idea Editorial Team',
      category: postForm.category?.trim() || 'Guides',
      excerpt: postForm.excerpt?.trim() || '',
      content: postForm.content?.trim() || '',
      published: !!postForm.published,
      date: postForm.date || new Date().toISOString().split('T')[0]
    };

    StorageService.savePost(newPost);
    setIsBlogModalOpen(false);
    showFeedback('Blog post successfully saved!');
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      StorageService.deletePost(id);
      showFeedback('Blog post deleted.');
    }
  };

  // --- Static Pages handler ---
  const handlePageSelect = (key: string) => {
    setSelectedPageKey(key);
    setPageTitle(data.pages[key]?.title || key);
    setPageContent(data.pages[key]?.content || '');
  };

  const handleSavePage = () => {
    StorageService.savePage(selectedPageKey, {
      title: pageTitle,
      content: pageContent
    });
    showFeedback(`Page "${selectedPageKey}" saved!`);
  };

  // --- Ad Settings handler ---
  const handleSaveAds = () => {
    StorageService.saveAdSettings({
      enabled: adEnabled,
      clientCode: adCode
    });
    showFeedback('Ad settings updated!');
  };

  // Helper toggle chip array
  const toggleArrayItem = <T,>(currentArr: T[] = [], item: T): T[] => {
    if (item === 'any') {
      return ['any' as unknown as T];
    }
    const withoutAny = currentArr.filter(x => x !== ('any' as unknown as T));
    if (withoutAny.includes(item)) {
      const filtered = withoutAny.filter(x => x !== item);
      return filtered.length === 0 ? ['any' as unknown as T] : filtered;
    } else {
      return [...withoutAny, item];
    }
  };

  // --- If PIN screen ---
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 text-center px-4">
        <div className="bg-[#2C2149] border border-[#40335F] rounded-2xl p-8 shadow-2xl">
          <div className="text-4xl mb-3">🔐</div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            Admin Access Gateway
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            This is a demonstration prototype lock. Enter any 4-digit PIN (e.g.{' '}
            <code className="text-[#FFD166]">2026</code>) to proceed.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="••••"
              autoFocus
              className="w-full bg-[#101530] border border-[#40335F] rounded-xl p-3 text-center text-3xl font-mono tracking-widest text-[#FFD166] focus:outline-none focus:border-[#9B5DE5]"
            />
            <button
              type="submit"
              className="w-full bg-[#9B5DE5] hover:bg-[#8644d3] text-white font-heading font-bold text-base py-3 rounded-full transition-colors shadow-lg cursor-pointer"
            >
              Enter Dashboard
            </button>
          </form>

          <button
            onClick={onExit}
            className="mt-6 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to public Wheel of Gift Idea
          </button>
        </div>
      </div>
    );
  }

  // --- Authenticated Dashboard ---
  const filteredGifts = data.gifts.filter(g =>
    g.name.toLowerCase().includes(giftSearch.toLowerCase()) ||
    g.desc.toLowerCase().includes(giftSearch.toLowerCase()) ||
    g.budget.toLowerCase().includes(giftSearch.toLowerCase())
  );

  const filteredBlogPosts = data.posts.filter(p =>
    p.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    p.slug.toLowerCase().includes(blogSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-[#40335F]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-3xl font-heading font-extrabold text-white">
              Wheel of Gift Idea Admin Dashboard
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Manage live gift catalog, SEO articles, legal pages & monetization
          </p>
        </div>

        <div className="flex items-center gap-3">
          {feedbackMsg && (
            <span className="bg-[#06D6A0]/20 text-[#06D6A0] text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-[#06D6A0]/40 animate-pulse">
              ✓ {feedbackMsg}
            </span>
          )}
          <button
            onClick={onExit}
            className="bg-[#1A132F] hover:bg-[#40335F] text-slate-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-full border border-[#40335F] transition-colors cursor-pointer"
          >
            Exit Admin View
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#40335F] mb-8 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-3 font-heading font-bold text-base transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'text-[#FFD166] border-[#FFD166]'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setActiveTab('gifts')}
          className={`px-5 py-3 font-heading font-bold text-base transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'gifts'
              ? 'text-[#FFD166] border-[#FFD166]'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          🎁 Gift Catalog ({data.gifts.length})
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-5 py-3 font-heading font-bold text-base transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'blog'
              ? 'text-[#FFD166] border-[#FFD166]'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          ✍️ Blog Posts ({data.posts.length})
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-5 py-3 font-heading font-bold text-base transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'pages'
              ? 'text-[#FFD166] border-[#FFD166]'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          📄 Static Pages
        </button>
        <button
          onClick={() => setActiveTab('ads')}
          className={`px-5 py-3 font-heading font-bold text-base transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'ads'
              ? 'text-[#FFD166] border-[#FFD166]'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          💰 Monetization & Ads
        </button>
        <button
          onClick={() => setActiveTab('firestore')}
          className={`px-5 py-3 font-heading font-bold text-base transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'firestore'
              ? 'text-[#06D6A0] border-[#06D6A0]'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          ☁️ Cloud / Firestore Ready
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2C2149] border border-[#40335F] p-6 rounded-2xl text-center shadow-lg">
              <h3 className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                Active Catalog Gifts
              </h3>
              <div className="text-5xl font-heading font-black text-[#4CC9F0]">
                {data.gifts.length}
              </div>
              <p className="text-xs text-slate-400 mt-2">Available across wheel slices</p>
            </div>

            <div className="bg-[#2C2149] border border-[#40335F] p-6 rounded-2xl text-center shadow-lg">
              <h3 className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                Published Blog Guides
              </h3>
              <div className="text-5xl font-heading font-black text-[#F72585]">
                {data.posts.filter(p => p.published).length}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {data.posts.length - data.posts.filter(p => p.published).length} drafts
              </p>
            </div>

            <div className="bg-[#2C2149] border border-[#40335F] p-6 rounded-2xl text-center shadow-lg">
              <h3 className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                Total Wheel Spins
              </h3>
              <div className="text-5xl font-heading font-black text-[#FFD166]">
                {data.spins}
              </div>
              <p className="text-xs text-slate-400 mt-2">Tracked user engagements</p>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-[#2C2149] border border-[#40335F] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-heading font-bold text-white mb-4">
              Quick Admin Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openAddGift}
                className="bg-[#06D6A0] hover:bg-[#05b889] text-[#101530] font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                + Add New Gift
              </button>
              <button
                onClick={openAddPost}
                className="bg-[#9B5DE5] hover:bg-[#8644d3] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                + Write New Guide
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Reset all catalog and posts to initial factory seed?')) {
                    StorageService.resetToDefaults();
                    showFeedback('Restored to default catalog!');
                  }
                }}
                className="bg-[#1A132F] hover:bg-red-950 text-red-400 hover:text-red-200 border border-red-900/50 font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                Reset Catalog to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gifts Catalog */}
      {activeTab === 'gifts' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#2C2149] p-4 rounded-xl border border-[#40335F]">
            <input
              type="text"
              placeholder="Search gifts by name, budget, desc..."
              value={giftSearch}
              onChange={(e) => setGiftSearch(e.target.value)}
              className="bg-[#1A132F] border border-[#40335F] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4CC9F0] w-full sm:w-72"
            />
            <button
              onClick={openAddGift}
              className="bg-[#06D6A0] hover:bg-[#05b889] text-[#101530] font-heading font-bold text-sm px-5 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer"
            >
              + Add Gift
            </button>
          </div>

          <div className="overflow-x-auto bg-[#2C2149] border border-[#40335F] rounded-2xl shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#1A132F] border-b border-[#40335F] text-xs font-mono uppercase text-slate-400">
                <tr>
                  <th className="p-4 w-16 text-center">Icon</th>
                  <th className="p-4">Name & Description</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Occasions</th>
                  {AFFILIATE_ENABLED && <th className="p-4">Affiliate</th>}
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#40335F]/60">
                {filteredGifts.slice(0, 100).map((gift) => (
                  <tr key={gift.id} className="hover:bg-[#1A132F]/50 transition-colors">
                    <td className="p-4 text-center text-2xl">{gift.emoji}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{gift.name}</div>
                      <div className="text-xs text-slate-400 line-clamp-1 max-w-md">
                        {gift.desc}
                      </div>
                    </td>
                    <td className="p-4 font-mono-tags text-xs text-[#4CC9F0]">
                      {gift.budget}
                    </td>
                    <td className="p-4 text-xs">
                      {gift.occasions.slice(0, 2).join(', ')}
                    </td>
                    {AFFILIATE_ENABLED && (
                      <td className="p-4 text-xs font-mono">
                        {gift.affiliateLink ? '🔗 Linked' : '—'}
                      </td>
                    )}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditGift(gift)}
                        className="text-[#9B5DE5] hover:text-white text-xs font-bold uppercase cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGift(gift.id)}
                        className="text-red-400 hover:text-red-200 text-xs font-bold uppercase cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Blog Posts */}
      {activeTab === 'blog' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#2C2149] p-4 rounded-xl border border-[#40335F]">
            <input
              type="text"
              placeholder="Search guides by title or slug..."
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              className="bg-[#1A132F] border border-[#40335F] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#9B5DE5] w-full sm:w-72"
            />
            <button
              onClick={openAddPost}
              className="bg-[#9B5DE5] hover:bg-[#8644d3] text-white font-heading font-bold text-sm px-5 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer"
            >
              + Write New Post
            </button>
          </div>

          <div className="overflow-x-auto bg-[#2C2149] border border-[#40335F] rounded-2xl shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#1A132F] border-b border-[#40335F] text-xs font-mono uppercase text-slate-400">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Live URL Slug</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#40335F]/60">
                {filteredBlogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#1A132F]/50 transition-colors">
                    <td className="p-4 font-bold text-white">{post.title}</td>
                    <td className="p-4 font-mono-tags text-xs text-[#4CC9F0]">
                      /blog/{post.slug}
                    </td>
                    <td className="p-4 text-xs font-mono-tags text-slate-300">
                      {post.category}
                    </td>
                    <td className="p-4 text-xs font-mono font-bold">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          post.published
                            ? 'bg-[#06D6A0]/10 text-[#06D6A0]'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditPost(post)}
                        className="text-[#9B5DE5] hover:text-white text-xs font-bold uppercase cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-400 hover:text-red-200 text-xs font-bold uppercase cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Pages */}
      {activeTab === 'pages' && (
        <div className="bg-[#2C2149] border border-[#40335F] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2 pb-4 border-b border-[#40335F]">
            {['about', 'contact', 'privacy', 'terms'].map((key) => (
              <button
                key={key}
                onClick={() => handlePageSelect(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                  selectedPageKey === key
                    ? 'bg-[#4CC9F0] text-[#101530]'
                    : 'bg-[#1A132F] text-slate-300 hover:text-white'
                }`}
              >
                /{key} Page
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                Page Title
              </label>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2 text-white font-heading font-bold text-lg focus:outline-none focus:border-[#4CC9F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                Page Content (HTML / Rich Text)
              </label>
              <textarea
                rows={12}
                value={pageContent}
                onChange={(e) => setPageContent(e.target.value)}
                className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-[#4CC9F0] leading-relaxed"
              />
            </div>

            <button
              onClick={handleSavePage}
              className="bg-[#06D6A0] hover:bg-[#05b889] text-[#101530] font-heading font-bold text-base px-8 py-2.5 rounded-full transition-all cursor-pointer shadow-lg"
            >
              Save Page Changes
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Monetization & Ad Settings */}
      {activeTab === 'ads' && (
        <div className="bg-[#2C2149] border border-[#40335F] rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl">
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-1">
              Google AdSense & Ad Placement Settings
            </h3>
            <p className="text-xs text-slate-400">
              Configure on-page advertising units. (Preview-only until official approval).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1A132F] p-4 rounded-xl border border-[#40335F]">
            <input
              type="checkbox"
              id="enable-ads"
              checked={adEnabled}
              onChange={(e) => setAdEnabled(e.target.checked)}
              className="w-5 h-5 accent-[#06D6A0] cursor-pointer"
            />
            <label htmlFor="enable-ads" className="text-sm font-semibold text-white cursor-pointer">
              Enable On-Page Ad Slots on Homepage
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              AdSense Client ID / Snippet Code (Preview)
            </label>
            <textarea
              rows={4}
              value={adCode}
              onChange={(e) => setAdCode(e.target.value)}
              placeholder="<!-- Paste Google AdSense script or placeholder here -->"
              className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-[#4CC9F0]"
            />
          </div>

          <button
            onClick={handleSaveAds}
            className="bg-[#FFD166] hover:bg-[#ffe45e] text-[#101530] font-heading font-bold text-base px-8 py-2.5 rounded-full transition-all cursor-pointer shadow-lg"
          >
            Save Ad Configuration
          </button>
        </div>
      )}

      {/* Tab 6: Cloud / Firestore Migration Readiness */}
      {activeTab === 'firestore' && (
        <div className="bg-[#2C2149] border border-[#06D6A0]/40 rounded-2xl p-8 shadow-xl space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☁️</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-white">
                Cloud Firestore & Firebase Auth Architecture
              </h3>
              <p className="text-xs font-mono text-[#06D6A0]">
                Prepared for future seamless cloud connection
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            The data layer of Wheel of Gift Idea has been completely modularized in{' '}
            <code className="text-[#FFD166] bg-[#1A132F] px-2 py-0.5 rounded">
              src/data/storage.ts
            </code>
            . When you are ready to enable Google Cloud Firestore and Firebase Auth, all models (Gifts, Posts, Pages, Ads) can be directly synchronized with cloud collections without refactoring any UI components.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A132F] border border-[#40335F] p-5 rounded-xl">
              <h4 className="text-sm font-heading font-bold text-[#FFD166] mb-2">
                1. Data Export (Backup)
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Download your current catalog and articles as structured JSON.
              </p>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(data, null, 2)], {
                    type: 'application/json'
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `wheelofgiftidea_backup_${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-[#40335F] hover:bg-[#9B5DE5] text-white text-xs font-mono font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                📥 Export Store JSON
              </button>
            </div>

            <div className="bg-[#1A132F] border border-[#40335F] p-5 rounded-xl">
              <h4 className="text-sm font-heading font-bold text-[#4CC9F0] mb-2">
                2. Firestore Ready Schema
              </h4>
              <ul className="text-xs font-mono text-slate-300 space-y-1">
                <li>• /gifts/{'{giftId}'}</li>
                <li>• /blog/{'{slug}'}</li>
                <li>• /pages/{'{slug}'}</li>
                <li>• /stats/counters</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT GIFT MODAL --- */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#2C2149] border border-[#40335F] rounded-2xl w-full max-w-2xl p-6 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#40335F]">
              <h3 className="text-2xl font-heading font-bold text-white">
                {editingGift ? 'Edit Gift Item' : 'Add New Gift to Catalog'}
              </h3>
              <button
                onClick={() => setIsGiftModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGift} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Emoji Icon
                  </label>
                  <input
                    type="text"
                    value={giftForm.emoji}
                    onChange={(e) => setGiftForm({ ...giftForm, emoji: e.target.value })}
                    className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl p-2.5 text-2xl text-center focus:outline-none focus:border-[#4CC9F0]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Gift Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={giftForm.name}
                    onChange={(e) => setGiftForm({ ...giftForm, name: e.target.value })}
                    placeholder="e.g. Wireless Noise-Cancelling Headphones"
                    className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-[#4CC9F0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={giftForm.desc}
                  onChange={(e) => setGiftForm({ ...giftForm, desc: e.target.value })}
                  placeholder="Short, helpful summary of why this makes a great gift..."
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#4CC9F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Budget Band
                </label>
                <select
                  value={giftForm.budget}
                  onChange={(e) => setGiftForm({ ...giftForm, budget: e.target.value as BudgetBand })}
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2 text-white text-xs"
                >
                  <option value="any">Any Budget</option>
                  <option value="under10">Under $10</option>
                  <option value="10to30">$10 - $30</option>
                  <option value="30to50">$30 - $50</option>
                  <option value="50to100">$50 - $100</option>
                  <option value="over100">Over $100</option>
                </select>
              </div>

              {/* Multi-select chips for Occasions */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Matching Occasions (Select applicable)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'any',
                    'birthday',
                    'anniversary',
                    'graduation',
                    'housewarming',
                    'christmas',
                    'parentsday',
                    'teachersday'
                  ].map((occ) => {
                    const isSelected = giftForm.occasions?.includes(occ as Occasion);
                    return (
                      <button
                        type="button"
                        key={occ}
                        onClick={() =>
                          setGiftForm({
                            ...giftForm,
                            occasions: toggleArrayItem(giftForm.occasions, occ as Occasion)
                          })
                        }
                        className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF6B6B] text-white'
                            : 'bg-[#1A132F] text-slate-400 hover:text-white'
                        }`}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Affiliate Link */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Affiliate Link (Optional)
                </label>
                <input
                  type="url"
                  value={giftForm.affiliateLink || ''}
                  onChange={(e) => setGiftForm({ ...giftForm, affiliateLink: e.target.value })}
                  placeholder="https://amazon.com/dp/..."
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#4CC9F0]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#40335F]">
                <button
                  type="button"
                  onClick={() => setIsGiftModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-slate-600 text-slate-300 text-xs font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#06D6A0] hover:bg-[#05b889] text-[#101530] text-xs font-heading font-bold shadow-lg"
                >
                  Save Gift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT BLOG POST MODAL --- */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#2C2149] border border-[#40335F] rounded-2xl w-full max-w-3xl p-6 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#40335F]">
              <h3 className="text-2xl font-heading font-bold text-white">
                {editingPost ? 'Edit Blog Guide' : 'Write New Blog Guide'}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={postForm.title}
                  onChange={(e) => handleBlogTitleChange(e.target.value)}
                  placeholder="e.g. 10 Best Housewarming Gifts Under $50"
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-[#9B5DE5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  URL Slug (auto-fills, editable)
                </label>
                <input
                  type="text"
                  required
                  value={postForm.slug}
                  onChange={(e) => handleBlogSlugChange(e.target.value)}
                  placeholder="best-housewarming-gifts"
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2 font-mono text-xs text-[#4CC9F0] focus:outline-none focus:border-[#9B5DE5]"
                />
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  Live at: <span className="text-[#06D6A0]">/blog/{postForm.slug || 'slug-preview'}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    placeholder="e.g. Guides, Milestones, Technology"
                    className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={postForm.published ? 'true' : 'false'}
                    onChange={(e) => setPostForm({ ...postForm, published: e.target.value === 'true' })}
                    className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2 text-xs text-white"
                  >
                    <option value="true">Live (Published)</option>
                    <option value="false">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Short Excerpt / Meta Description
                </label>
                <textarea
                  rows={2}
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  placeholder="A concise summary for cards and search engine snippets..."
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl p-3 text-xs text-white"
                />
              </div>

              {/* SEO & Meta Info Card */}
              <div className="bg-[#1A132F] border border-[#40335F] rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#06D6A0] uppercase font-bold tracking-wider">
                  <span>⚡</span> Search Engine Optimization (SEO) & Metadata
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      SEO Title (Target 50-60 chars)
                    </label>
                    <input
                      type="text"
                      value={postForm.seoTitle || ''}
                      onChange={(e) => setPostForm({ ...postForm, seoTitle: e.target.value })}
                      placeholder="e.g. 10 Best Coworker Gifts | Etiquette Guide"
                      className="w-full bg-[#101530] border border-[#40335F] rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={postForm.author || ''}
                      onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                      placeholder="Wheel of Gift Idea Editorial Team"
                      className="w-full bg-[#101530] border border-[#40335F] rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Keywords (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={keywordsInput}
                      onChange={(e) => setKeywordsInput(e.target.value)}
                      placeholder="coworker gifts, office etiquette, desk gear"
                      className="w-full bg-[#101530] border border-[#40335F] rounded-lg px-3 py-1.5 text-xs text-[#FFD166]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      value={postForm.readTime || ''}
                      onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                      placeholder="e.g. 8 min read"
                      className="w-full bg-[#101530] border border-[#40335F] rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    Meta Description (Target 140-160 chars)
                  </label>
                  <input
                    type="text"
                    value={postForm.metaDescription || ''}
                    onChange={(e) => setPostForm({ ...postForm, metaDescription: e.target.value })}
                    placeholder="Short, keyword-rich meta snippet for Google search previews..."
                    className="w-full bg-[#101530] border border-[#40335F] rounded-lg px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Article Body (Markdown & HTML supported: ## headings, links, lists)
                </label>
                <textarea
                  rows={8}
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  placeholder="Write full article here..."
                  className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl p-3 text-xs text-white leading-relaxed font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#40335F]">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-slate-600 text-slate-300 text-xs font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#9B5DE5] hover:bg-[#8644d3] text-white text-xs font-heading font-bold shadow-lg"
                >
                  Save Blog Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
