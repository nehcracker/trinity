const fs = require('fs');
const path = require('path');

// Your site URL
const siteUrl = 'https://www.trinityfinancing.com';

// Current date in YYYY-MM-DD format for lastmod
const date = new Date().toISOString().split('T')[0];

// Define your site pages and their priorities
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/stats', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.9', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// Write sitemap to public folder
fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated!');