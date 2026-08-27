import { Gift, BlogPost, StaticPage, AdSettings, AppStoreData } from '../types';
import {
  SEED_VERSION,
  INITIAL_GIFTS,
  INITIAL_BLOG_POSTS,
  INITIAL_STATIC_PAGES,
  INITIAL_AD_SETTINGS
} from './seedData';

const STORAGE_KEYS = {
  VERSION: 'gw_version',
  GIFTS: 'gw_gifts',
  POSTS: 'gw_posts',
  PAGES: 'gw_pages',
  ADS: 'gw_ads',
  SPINS: 'gw_spins'
};

type ChangeListener = (data: AppStoreData) => void;
const listeners: Set<ChangeListener> = new Set();

class StorageManager {
  private data: AppStoreData = {
    version: SEED_VERSION,
    gifts: [],
    posts: [],
    pages: {},
    adSettings: INITIAL_AD_SETTINGS,
    spins: 0
  };

  private initialized = false;

  constructor() {
    this.init();
  }

  public init(): AppStoreData {
    if (this.initialized) return this.data;

    try {
      const storedVersionStr = localStorage.getItem(STORAGE_KEYS.VERSION);
      const storedVersion = storedVersionStr ? parseInt(storedVersionStr, 10) : 0;

      if (!storedVersion || storedVersion < SEED_VERSION) {
        this.migrate(storedVersion);
      } else {
        this.loadFromStorage();
      }
    } catch (err) {
      console.warn('LocalStorage unavailable or restricted, using in-memory store:', err);
      this.loadMemoryDefaults();
    }

    this.initialized = true;
    return this.data;
  }

  private loadMemoryDefaults() {
    this.data = {
      version: SEED_VERSION,
      gifts: [...INITIAL_GIFTS],
      posts: [...INITIAL_BLOG_POSTS],
      pages: { ...INITIAL_STATIC_PAGES },
      adSettings: { ...INITIAL_AD_SETTINGS },
      spins: 0
    };
  }

  private migrate(oldVersion: number) {
    try {
      const storedGiftsJson = localStorage.getItem(STORAGE_KEYS.GIFTS);
      const storedPostsJson = localStorage.getItem(STORAGE_KEYS.POSTS);
      const storedPagesJson = localStorage.getItem(STORAGE_KEYS.PAGES);
      const storedAdsJson = localStorage.getItem(STORAGE_KEYS.ADS);
      const storedSpinsStr = localStorage.getItem(STORAGE_KEYS.SPINS);

      const storedGifts: Gift[] = storedGiftsJson ? JSON.parse(storedGiftsJson) : [];
      const storedPosts: BlogPost[] = storedPostsJson ? JSON.parse(storedPostsJson) : [];
      const storedPages: Record<string, StaticPage> = storedPagesJson ? JSON.parse(storedPagesJson) : INITIAL_STATIC_PAGES;
      const storedAds: AdSettings = storedAdsJson ? JSON.parse(storedAdsJson) : INITIAL_AD_SETTINGS;
      const storedSpins: number = storedSpinsStr ? parseInt(storedSpinsStr, 10) : 0;

      // Merge gifts preserving user additions/edits
      const mergedGifts = [...storedGifts];
      for (const seedGift of INITIAL_GIFTS) {
        if (!mergedGifts.some(g => g.id === seedGift.id)) {
          mergedGifts.push(seedGift);
        }
      }

      // Merge posts: upgrade default seed posts (p1-p8) to new long-form SEO content, and keep user-created posts
      const userCustomPosts = storedPosts.filter(p => !p.id.startsWith('p') || isNaN(Number(p.id.replace('p', ''))));
      const mergedPosts = [...INITIAL_BLOG_POSTS, ...userCustomPosts];

      // Merge pages: updated default static pages take precedence, plus user custom static pages
      const mergedPages = { ...storedPages, ...INITIAL_STATIC_PAGES };

      this.data = {
        version: SEED_VERSION,
        gifts: mergedGifts.length > 0 ? mergedGifts : [...INITIAL_GIFTS],
        posts: mergedPosts.length > 0 ? mergedPosts : [...INITIAL_BLOG_POSTS],
        pages: mergedPages,
        adSettings: storedAds,
        spins: storedSpins
      };

      this.persistAll();
      localStorage.setItem(STORAGE_KEYS.VERSION, String(SEED_VERSION));
    } catch (e) {
      console.error('Migration error:', e);
      this.loadMemoryDefaults();
    }
  }

  private loadFromStorage() {
    try {
      const g = localStorage.getItem(STORAGE_KEYS.GIFTS);
      const p = localStorage.getItem(STORAGE_KEYS.POSTS);
      const pg = localStorage.getItem(STORAGE_KEYS.PAGES);
      const a = localStorage.getItem(STORAGE_KEYS.ADS);
      const s = localStorage.getItem(STORAGE_KEYS.SPINS);

      const parsedPosts: BlogPost[] = p ? JSON.parse(p) : [];
      // Keep any user created posts (not p1-p28)
      const userCustomPosts = parsedPosts.filter(item => !item.id.startsWith('p') || isNaN(Number(item.id.replace('p', ''))));
      
      // Check if any seed posts are missing or outdated
      const mergedPosts = [...INITIAL_BLOG_POSTS, ...userCustomPosts];

      this.data = {
        version: SEED_VERSION,
        gifts: g ? JSON.parse(g) : [...INITIAL_GIFTS],
        posts: mergedPosts,
        pages: pg ? JSON.parse(pg) : { ...INITIAL_STATIC_PAGES },
        adSettings: a ? JSON.parse(a) : { ...INITIAL_AD_SETTINGS },
        spins: s ? parseInt(s, 10) : 0
      };

      // Persist updated posts if needed
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(this.data.posts));
      localStorage.setItem(STORAGE_KEYS.VERSION, String(SEED_VERSION));
    } catch (err) {
      console.warn('Failed to parse localStorage:', err);
      this.loadMemoryDefaults();
    }
  }

  private persistAll() {
    try {
      localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(this.data.gifts));
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(this.data.posts));
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(this.data.pages));
      localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(this.data.adSettings));
      localStorage.setItem(STORAGE_KEYS.SPINS, String(this.data.spins));
    } catch (err) {
      console.warn('Failed to write to localStorage:', err);
    }
  }

  private notify() {
    for (const listener of listeners) {
      listener({ ...this.data });
    }
  }

  public getData(): AppStoreData {
    return { ...this.data };
  }

  public subscribe(listener: ChangeListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  public incrementSpins(): number {
    this.data.spins += 1;
    try {
      localStorage.setItem(STORAGE_KEYS.SPINS, String(this.data.spins));
    } catch (e) {}
    this.notify();
    return this.data.spins;
  }

  // --- CRUD for Gifts ---
  public saveGift(gift: Gift): Gift {
    const idx = this.data.gifts.findIndex(g => g.id === gift.id);
    if (idx >= 0) {
      this.data.gifts[idx] = gift;
    } else {
      this.data.gifts.unshift(gift);
    }
    this.persistAll();
    this.notify();
    return gift;
  }

  public deleteGift(id: string): boolean {
    const initialLen = this.data.gifts.length;
    this.data.gifts = this.data.gifts.filter(g => g.id !== id);
    if (this.data.gifts.length !== initialLen) {
      this.persistAll();
      this.notify();
      return true;
    }
    return false;
  }

  // --- CRUD for Blog Posts ---
  public savePost(post: BlogPost): BlogPost {
    // Check for slug collision on new/edited post
    let uniqueSlug = post.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    if (!uniqueSlug) uniqueSlug = 'untitled-guide';

    let count = 1;
    let finalSlug = uniqueSlug;
    while (this.data.posts.some(p => p.slug === finalSlug && p.id !== post.id)) {
      count++;
      finalSlug = `${uniqueSlug}-${count}`;
    }
    post.slug = finalSlug;

    const idx = this.data.posts.findIndex(p => p.id === post.id);
    if (idx >= 0) {
      this.data.posts[idx] = post;
    } else {
      this.data.posts.unshift(post);
    }
    this.persistAll();
    this.notify();
    return post;
  }

  public deletePost(id: string): boolean {
    const initialLen = this.data.posts.length;
    this.data.posts = this.data.posts.filter(p => p.id !== id);
    if (this.data.posts.length !== initialLen) {
      this.persistAll();
      this.notify();
      return true;
    }
    return false;
  }

  // --- Static Pages ---
  public savePage(slug: string, page: StaticPage): void {
    this.data.pages[slug] = page;
    this.persistAll();
    this.notify();
  }

  // --- Ad Settings ---
  public saveAdSettings(settings: AdSettings): void {
    this.data.adSettings = settings;
    this.persistAll();
    this.notify();
  }

  // --- Reset to Factory Defaults ---
  public resetToDefaults(): void {
    this.loadMemoryDefaults();
    this.persistAll();
    localStorage.setItem(STORAGE_KEYS.VERSION, String(SEED_VERSION));
    this.notify();
  }
}

export const StorageService = new StorageManager();
