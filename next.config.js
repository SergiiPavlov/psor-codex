const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};


/** Ensure root redirects permanently to default locale (SEO-friendly 308) */
module.exports = withNextIntl({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/uk',
        permanent: true, // Next.js will use 308
      },
    ]
  }
});

