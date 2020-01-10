require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const prismicHtmlSerializer = require('./src/gatsby/htmlSerializer')
const prismicLinkResolver = require('./src/gatsby/linkResolver')

const website = require('./config/website')

const pathPrefix = website.pathPrefix === '/' ? '' : website.pathPrefix

module.exports = {
  /* General Information */
  pathPrefix: website.pathPrefix,
  siteMetadata: {
    siteUrl: website.url + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    banner: website.logo,
    ogLanguage: website.ogLanguage,
    author: website.author,
    twitter: website.twitter,
    facebook: website.facebook
  },
  /* Plugins */
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: `${process.env.REPOSITORY_NAME_PRISMIC}`,
        // accessToken: `MC5YYmxISlJFQUFDRUFoRGdE.VO-_vUcNO3wO77-9Ce-_ve-_ve-_vU96XO-_vUPvv73vv73vv71fYXDvv73vv70I77-977-9Yu-_ve-_vUM`,
        accessToken: `${process.env.API_KEY_PRISMIC}`,
        // Get the correct URLs in blog posts
        linkResolver: () => prismicLinkResolver,
        // PrismJS highlighting for labels and slices
        htmlSerializer: () => prismicHtmlSerializer
      }
    },
    "gatsby-plugin-lodash",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: website.googleAnalyticsID
      }
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: website.title,
        short_name: website.titleAlt,
        description: website.description,
        start_url: pathPrefix,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: "standalone",
        icon: website.favicon
      }
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `${process.env.REPOSITORY_NAME_GHOST}`,
        contentApiKey: `${process.env.API_KEY_GHOST}`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/static/fonts/`
      }
    },
    // Must be placed at the end
    "gatsby-plugin-offline"
  ]
};
