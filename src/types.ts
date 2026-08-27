export type BudgetBand = 'any' | 'under10' | '10to30' | '30to50' | '50to100' | 'over100';

export type Gender = 'any' | 'female' | 'male';

export type AgeBand = 'any' | 'child' | 'teen' | 'twenties' | 'thirties' | 'forties' | 'fifty_plus';

export type Relationship = 'any' | 'partner_spouse' | 'partner' | 'spouse' | 'parent' | 'child' | 'friend' | 'colleague';

export type Occasion = 'any' | 'birthday' | 'anniversary' | 'graduation' | 'housewarming' | 'christmas' | 'parentsday' | 'teachersday';

export interface Gift {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  affiliateLink?: string;
  budget: BudgetBand;
  genders: Gender[];
  ageBands: AgeBand[];
  relationships: Relationship[];
  occasions: Occasion[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  readTime: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  published?: boolean;
  date?: string;
  relatedPostSlugs?: string[];
}

export interface StaticPage {
  title: string;
  content: string;
}

export interface AdSettings {
  enabled: boolean;
  clientCode: string;
}

export interface FilterCriteria {
  gender: Gender | string;
  age: AgeBand | string;
  relationship: Relationship | string;
  occasion: Occasion | string;
  budget: BudgetBand | string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AppStoreData {
  version: number;
  gifts: Gift[];
  posts: BlogPost[];
  pages: Record<string, StaticPage>;
  adSettings: AdSettings;
  spins: number;
}
