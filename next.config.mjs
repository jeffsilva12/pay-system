/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, 
      },
    ]
  },
}


export default nextConfig;
