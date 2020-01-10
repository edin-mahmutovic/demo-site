module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Overbit', // Navigation and Site Title
  titleAlt: 'Overbit Gatsby', // Title for JSONLD
  description: 'Bitcoin Dervates Trading',
  headline: 'Initial setup', // Headline for schema.org JSONLD
  url: 'https://abc-techgroup.prismic.io', // Domain of your site. No trailing slash!
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'en_GB', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Overbit', // shortname for manifest. MUST be shorter than 12 characters
  author: 'ABC TECH Group', // Author for schemaORGJSONLD

  twitter: '@twitter', // Twitter Username
  facebook: 'facebook', // Facebook Site Name
  googleAnalyticsID: 'UA-XXXXXX-X',

  skipNavId: 'reach-skip-nav' // ID for the "Skip to content" a11y feature
};
