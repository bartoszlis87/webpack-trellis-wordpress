module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-font-magician")({
      variants: {
        "Open Sans": {
          "300": ["woff, eot, woff2"],
          "400 italic": ["woff2"]
        }
      }
    })
  ]
};
