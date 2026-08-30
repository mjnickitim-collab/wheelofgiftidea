import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Scan all blog posts directories to collect slugs
const postsDir = path.join(rootDir, 'src', 'data', 'posts');
const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

const slugs = new Set();

for (const file of postFiles) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  // Match slug: '...' or slug: "..."
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[1]) {
      slugs.add(match[1]);
    }
  }
}

const today = new Date().toISOString().split('T')[0];
const baseUrl = 'https://wheelofgiftidea.com';

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->\n`;

for (const page of staticPages) {
  xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
}

xml += `\n  <!-- Dynamic Blog Posts & Gift Guides (${slugs.size} articles) -->\n`;

for (const slug of Array.from(slugs).sort()) {
  xml += `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
}

xml += `</urlset>\n`;

// Write to public/sitemap.xml
const publicPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, xml, 'utf-8');
console.log(`[Sitemap Generator] Successfully generated ${publicPath} with ${staticPages.length + slugs.size} total URLs (${slugs.size} blog posts).`);
