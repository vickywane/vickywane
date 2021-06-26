module.exports = {
  siteMetadata: {
    title: `Victory Nwani`,
    description: `FullStack developer and Certified Cloud Engineer from Lagos, Nigeria, Africa.`,
    author: `@vickywane`,
  },
  plugins: [
    'gatsby-plugin-nullish-coalescing-operator',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/my_avatar.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
