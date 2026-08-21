const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
const vercelUrl = process.env.VERCEL_URL;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: configuredUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  generateRobotsTxt: true,
};
