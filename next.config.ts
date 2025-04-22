import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    // Optimize for Vercel deployment
    output: 'standalone',
    // Ensure static assets are properly served
    images: {
        domains: ['vercel.app'],
    },
    // Disable source maps in production for better performance
    productionBrowserSourceMaps: false
}

export default nextConfig
