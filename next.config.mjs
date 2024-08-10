/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // auth code check
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
