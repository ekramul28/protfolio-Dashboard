import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ibb.co.com", "res.cloudinary.com", "via.placeholder.com", "*"],
  },
  // images: {
  //   domains: ["*"], // Allows images from all domains
  // },
};

export default nextConfig;
