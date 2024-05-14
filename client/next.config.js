/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/_next/static/chunks/pages/pdf.worker.js',
        destination: 'https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js',
      },
    ];
  },
  
};

module.exports = nextConfig;
