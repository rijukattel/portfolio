require(`dotenv`).config();
// const capitalize = require(`remark-capitalize`);
// const emoji = require(`remark-emoji`);

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
};

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-jodie/gatsby-config.js
    siteTitle: `Raghav Kattel`,
    siteTitleAlt: `Raghav - A personal portfolio`,
    siteHeadline: `Raghav - A personal portfolio`,
    siteUrl: `https://raghavkattel.com.np`,
    siteDescription: `A Software Engineer who writes in React, Node, React Native, Flutter and Python.`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `@argahv`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-jodie`,

      // See the theme's README for all available options
      options: {
        navigation: [
          { name: `Projects`, slug: `/projects` },
          { name: `Art`, slug: `/art` },
          { name: `About`, slug: `/about` },
          { name: `Contact`, slug: `/contact` },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [netlifyCmsPaths],
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        // If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
        // See: https://github.com/LekoArts/gatsby-themes/tree/main/examples/jodie#changing-your-fonts
        web: [
          {
            name: `Work Sans`,
            file: `https://fonts.googleapis.com/css2?family=Work+Sans:wght@400..700&display=swap`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Raghav Kattel`,
        short_name: `argahv`,
        description: `A Software Engineer who writes in React, Node, React Native, Flutter and Python.`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#b75e09`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
