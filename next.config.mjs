/** @type {import('next').NextConfig} */
const nextConfig = {
  //   webpack(config) {
  //     config.module.rules.push({
  //       test: /\.svg$/i,
  //       issuer: /\.[jt]sx?$/,
  //       use: ["@svgr/webpack"],
  //     });

  //     return config;
  //   }, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        // ...
      },
      {
        protocol: "https",
        hostname: "https://www.pexels.com/",
        // ...
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
