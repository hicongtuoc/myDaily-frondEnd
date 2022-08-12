const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles", "themes")],
    prependData: `@import "./global";`,
  },
  webpack(config) {
    // if not work, try `config.module.rules[2]...`
    if (config.module.rules[2].oneOf) {
      config.module.rules[2].oneOf.forEach((one) => {
        if (!`${one.issuer?.and}`.includes("_app")) return;
        one.issuer.and = [path.resolve(__dirname)];
      });
    }
    return config;
  },
};

module.exports = nextConfig;
