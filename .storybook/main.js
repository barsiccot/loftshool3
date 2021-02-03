const custom =require("../webpack.config")(null,"development")
module.exports = {
  "stories": [
    "../src/admin/components/**/*.stories.js",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-backgrounds",
      "@storybook/addon-knobs"


  ],
 webpackFinal:config => {
   return {
        ...config,
       module:{...config.module,rules:custom.module.rules},
      resolve:custom.resolve
   }
 }
};