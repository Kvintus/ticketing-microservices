const withPWA = require("next-pwa")
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const runtimeCaching = require('next-pwa/cache')
const withOffline = require('next-offline')


const isProd = process.env.NODE_ENV === "production";

if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withOffline(withCSS(withPWA({
  pageExtensions: ["tsx"],
  workboxOpts: {
  },
  pwa: {
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
})))