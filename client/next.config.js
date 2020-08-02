const withPWA = require("next-pwa")
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const runtimeCaching = require('next-pwa/cache')

const isProd = process.env.NODE_ENV === "production";

if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withCSS(withPWA({
  pageExtensions: ["tsx"],
  pwa: {
    disable: true,
    dest: "public",
    runtimeCaching
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    })
  ),
}))