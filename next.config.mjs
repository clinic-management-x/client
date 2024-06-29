/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "clinic-management-dev.s3.ap-southeast-1.amazonaws.com",
      "s3.ap-southeast-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
