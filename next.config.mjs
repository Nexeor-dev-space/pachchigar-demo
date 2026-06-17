/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "api.staging-obj-blob.client2.nexeor.com",
    },
  ],
},
};

export default nextConfig;
