/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      new URL('https://www.gamerpower.com/offers/**'),
    ],
  },
}

export default nextConfig
