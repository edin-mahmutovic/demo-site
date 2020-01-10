import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './Navigation.module.scss';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const Navigation = ({ language }) => {
  const NavigationQuery = useStaticQuery(query);

  const data = NavigationQuery.allPrismicNavigation.edges;
  let filteredData = [];
  let logoUrl = data[0].node.data.logo.url;

  let cleanLanguage = data[0].node.lang.replace(/[-_][a-z][a-z].*$/, '');

  data.map(singleNode => {
    if (singleNode.node.lang === language) {
      filteredData = singleNode.node.data.body;
    }
  });
  if (filteredData.length === 0) {
    data.map(singleNode => {
      if (singleNode.node.lang === 'en-gb') {
        filteredData = singleNode.node.data.body;
      }
    });
  }

  function returnComponentBySliceType(slice, index) {
    switch (slice.slice_type) {
      case 'link':
        return (
          <div
            className={
              slice.primary.special !== undefined
                ? styles[`${slice.primary.special.text}`]
                : styles.link
            }
            key={index}
          >
            <a href={`/${cleanLanguage}${slice.primary.link.text}`}>
              {slice.primary.label.text}
            </a>
          </div>
        );
      case 'external_link':
        return (
          <div
            className={
              slice.primary.special.text
                ? styles[`${slice.primary.special.text}`]
                : styles.link
            }
            key={index}
          >
            <a href={slice.primary.link.url}>{slice.primary.label.text}</a>
          </div>
        );

      case 'link_with_sublinks':
        return (
          <div key={index} className={styles.links}>
            <div className={styles.link_wrapper}>
              <a
                className={styles.link}
                href={`/${cleanLanguage}${slice.primary.link.text}`}
              >
                {slice.primary.label.text}
              </a>
            </div>
            <div className={styles.background}></div>
            <div className={styles.sublinks}>
              {slice.items.map((sublink, index) => {
                return (
                  <a
                    key={index}
                    href={`/${cleanLanguage}${sublink.sub_link.text}`}
                  >
                    {sublink.sublink_label.text}
                  </a>
                );
              })}
            </div>
          </div>
        );

      case 'language_switcher':
        return (
          <div key={index} className={styles.switcher}>
            {slice.items.map((single, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.language} ${
                    single.language_code.text === cleanLanguage
                      ? styles.language_active
                      : ''
                  }`}
                >
                  <img src={single.language_flag.url} />
                  <a href={`/${single.language_code.text}/`}>
                    {single.language.text}
                  </a>
                </div>
              );
            })}
          </div>
        );

      case 'login_and_signup':
        return (
          <div key={index} className={styles.user}>
            <a className={styles.login} href={slice.primary.login_link.url}>
              {slice.primary.login_label.text}
            </a>
          </div>
        );
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <a href={`/${cleanLanguage}`}>
          <img src={logoUrl} />
        </a>
        {filteredData.map((section, index) => {
          return returnComponentBySliceType(section, index);
        })}
      </div>
      <div className={styles.mobile_wrapper}>
        <HamburgerMenu
          menu={filteredData}
          language={cleanLanguage}
          logo={logoUrl}
        />
      </div>
    </>
  );
};

export default Navigation;

/* const query = graphql`
  query Navigation {
    allPrismicNavigation {
      edges {
        node {
          lang
          data {
            body {
              ... on PrismicNavigationBodyLanguageSwitcher {
                items {
                  language {
                    text
                  }
                  language_code {
                    text
                  }
                  language_flag {
                    url
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyLink {
                id
                primary {
                  label {
                    text
                  }
                  link {
                    text
                  }
                  special {
                    text
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyLinkWithSublinks {
                items {
                  sub_link {
                    text
                  }
                  sublink_label {
                    text
                  }
                }
                primary {
                  label {
                    text
                  }
                  link {
                    text
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyLoginAndSignup {
                id
                primary {
                  login_label {
                    text
                  }
                  login_link {
                    url
                  }
                  sign_up_label {
                    text
                  }
                  signup_link {
                    url
                  }
                }
                slice_type
              }
            }
            logo {
              url
            }
          }
        }
      }
    }
  }
`; */

const query = graphql`
  query Navigation {
    allPrismicNavigation {
      edges {
        node {
          lang
          data {
            body {
              ... on PrismicNavigationBodyLanguageSwitcher {
                items {
                  language {
                    text
                  }
                  language_code {
                    text
                  }
                  language_flag {
                    url
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyLink {
                id
                primary {
                  label {
                    text
                  }
                  link {
                    text
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyLinkWithSublinks {
                items {
                  sub_link {
                    text
                  }
                  sublink_label {
                    text
                  }
                }
                primary {
                  label {
                    text
                  }
                  link {
                    text
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyLoginAndSignup {
                id
                primary {
                  login_label {
                    text
                  }
                  login_link {
                    url
                  }
                  sign_up_label {
                    text
                  }
                  signup_link {
                    url
                  }
                }
                slice_type
              }
              ... on PrismicNavigationBodyExternalLink {
                id
                slice_type
                primary {
                  label {
                    text
                    html
                  }
                  link {
                    link_type
                    url
                    target
                  }
                  special {
                    text
                  }
                }
              }
            }
            logo {
              url
            }
          }
        }
      }
    }
  }
`;
