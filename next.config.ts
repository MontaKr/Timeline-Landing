import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "Timeline-Landing";
const basePath = isProd ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
