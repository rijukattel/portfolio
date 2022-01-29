const siteUrl = 'https://raghavkattel.com.np';

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-plugin-gatsby-cloud',
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-netlify`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: 'Raleway',
            weights: ['100', '400', '700'],
          },
          {
            family: 'Kurale',
            weights: ['100', '400'],
          },
          {
            family: 'Noto Sans',
            weights: ['100', '400'],
          },
          {
            family: 'Open Sans',
            weights: ['100', '400', '700'],
          },
          {
            family: 'Poppins',
            weights: ['100', '400'],
          },
          {
            family: 'Anton',
            weights: ['100', '400'],
          },
          {
            family: 'Source Code Pro',
            weights: ['100', '400', '700'],
          },
          {
            family: 'Righteous',
            weights: ['100', '400', '700'],
          },
          {
            family: 'Comforter',
            weights: ['100', '400', '700'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: 'd6d5f69b3b1612cef18305d66e47db',

        /**
         * Example of how locale fallbacks should be set,
         * refer to README.md for more infos
         */
        localeFallbacks: {
          'lt-LT': 'en',
          'sv-FI': 'it',
        },
      },
    },
  ],
};
