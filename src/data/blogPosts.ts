import { BlogPost } from '../types';
import { WORKPLACE_POSTS } from './posts/workplace';
import { MILESTONE_POSTS } from './posts/milestones';
import { RELATIONSHIP_POSTS } from './posts/relationships';
import { LIFESTYLE_POSTS } from './posts/lifestyle';
import { BUDGET_POSTS } from './posts/budgets';
import { COMMUNITY_AND_CARE_POSTS } from './posts/communityAndCare';
import { CELEBRATIONS_AND_MILESTONES_POSTS } from './posts/celebrationsAndMilestones';
import { SMART_GIFTING_AND_GUIDES_POSTS } from './posts/smartGiftingAndGuides';
import { HIGH_INTENT_TRENDING_POSTS } from './posts/highIntentTrending';

// Combine all categorized blog posts into a single unified list
const ALL_RAW_POSTS: BlogPost[] = [
  ...WORKPLACE_POSTS,
  ...MILESTONE_POSTS,
  ...RELATIONSHIP_POSTS,
  ...LIFESTYLE_POSTS,
  ...BUDGET_POSTS,
  ...COMMUNITY_AND_CARE_POSTS,
  ...CELEBRATIONS_AND_MILESTONES_POSTS,
  ...SMART_GIFTING_AND_GUIDES_POSTS,
  ...HIGH_INTENT_TRENDING_POSTS,
];

// Sort posts numerically by ID (p1, p2, ... p28) or maintain standard sequence
export const INITIAL_BLOG_POSTS: BlogPost[] = ALL_RAW_POSTS.map(post => ({
  ...post,
  published: post.published !== undefined ? post.published : true,
  date: post.date || '2026-02-20',
})).sort((a, b) => {
  const numA = parseInt(a.id.replace('p', ''), 10) || 0;
  const numB = parseInt(b.id.replace('p', ''), 10) || 0;
  return numA - numB;
});
