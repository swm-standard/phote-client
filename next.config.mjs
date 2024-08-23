/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // auth code check
    images: {
        domains: ['phote-be-bucket.s3.amazonaws.com'],
    },
};

export default nextConfig;
