module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-font-magician")({
      foundries: "google",
      variants: {
        "Open Sans": {
          "300": [],
          "400": [],
          "700": []
        }
      }
    })
  ]
};
