const _ = require("lodash");
const locales = require("./config/i18n");
const {
  replaceTrailing,
  localizedSlug,
  replaceBoth,
  wrapper
} = require("./src/utils/gatsby-node-helpers");

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const homepageTemplate = require.resolve("./src/templates/homepage.jsx");
  const { createPage, deletePage } = actions;
  // Only create one 404 page at /404.html
  if (page.path.includes("404")) {
    return;
  }
  // console.log("path",page.path)

  // First delete the pages so we can re-create them
  deletePage(page);

  Object.keys(locales).map(lang => {
    // Remove the trailing slash from the path, e.g. --> /categories
    page.path = replaceTrailing(page.path);
    // Remove the leading AND traling slash from path, e.g. --> categories
    const name = replaceBoth(page.path);

    // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`;

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        ...page.context,
        language: locales[lang].locale,
        // ghostLang: locales[lang].siteLanguage,
      }
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const homepageTemplate = require.resolve("./src/templates/homepage.jsx");
  const pagesTemplate = require.resolve("./src/templates/pages.jsx");
  const result = await wrapper(
    graphql(`
      {
        homepage: allPrismicHomepage {
          edges {
            node {
              lang
            }
          }
        }
        pages: allPrismicRepeatablePage {
          edges {
            node {
              data {
                url
              }
              lang
            }
          }
        }
      }
    `)
  );
  const homepageList = result.data.homepage.edges;
  const pagesList = result.data.pages.edges;

  pagesList.forEach(edge => {
    const cleanLanguage = edge.node.lang.replace(/[-_][a-z][a-z].*$/, "");
    createPage({
      path: `${cleanLanguage}/${edge.node.data.url}`,
      component: pagesTemplate,
      context: {
        locale: edge.node.lang,
        slug: edge.node.data.url
      }
    });
  })

  homepageList.forEach(edge => {
    createPage({
      path: edge.node.lang,
      component: homepageTemplate,
      context: {
        locale: edge.node.lang
      }
    });
  }); 
};