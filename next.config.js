/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Para Vercel, permite imágenes locales sin optimización
  },
}

module.exports = nextConfig

