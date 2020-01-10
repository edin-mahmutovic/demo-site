import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './Footer.module.scss';
import FooterSections from '../FooterSections/FooterSections';
import FooterSocial from '../FooterSocial/FooterSocial';

const Footer = ({ language }) => {
  const data = useStaticQuery(query);
  let filteredDataByLanguage = data.allPrismicFooter.edges.filter(
    edge => edge.node.lang === language
  );
  if (filteredDataByLanguage.length === 0) {
    filteredDataByLanguage = data.allPrismicFooter.edges.filter(
      edge => edge.node.lang === 'en-gb'
    );
  }
  const extractedData = filteredDataByLanguage[0].node.data;
  let cleanLanguage = filteredDataByLanguage[0].node.lang.replace(
    /[-_][a-z][a-z].*$/,
    ''
  );

  const copyrightText = extractedData.copyright.text;
  const description = extractedData.description.text;
  const footerLogo = extractedData.footer_logo.url;
  const notice = extractedData.notice.html;
  const footerLinksArray = extractedData.body.filter(
    data => data.__typename === 'PrismicFooterBodyFooter'
  );
  const socialMediaInfo = extractedData.body.filter(
    data => data.__typename === 'PrismicFooterBodySocial'
  );

  return (
    <div className={styles.footer}>
      <div className={styles.sections}>
        <div className={styles.description}>
          <img src={footerLogo} />
          <p>{description}</p>
        </div>

        {footerLinksArray.map((section, index) => {
          return (
            <FooterSections
              cleanLanguage={cleanLanguage}
              data={section}
              key={index}
            />
          );
        })}
        {socialMediaInfo.map((section, index) => {
          return <FooterSocial data={section} key={index} />;
        })}
      </div>
      <div
        className={styles.notice}
        dangerouslySetInnerHTML={{ __html: notice }}
      />
      <div className={styles.copyright}>{copyrightText}</div>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;

const query = graphql`
  query Footer {
    allPrismicFooter {
      edges {
        node {
          data {
            body {
              __typename
              ... on PrismicFooterBodyFooter {
                items {
                  label {
                    text
                  }
                  link {
                    url
                  }
                  link_on_page {
                    text
                  }
                }
                primary {
                  link_title {
                    text
                  }
                }
              }
              ... on PrismicFooterBodySocial {
                id
                items {
                  label {
                    text
                  }
                  social_icon {
                    url
                  }
                  social_link {
                    url
                  }
                }
                primary {
                  social_title {
                    text
                  }
                }
              }
            }
            copyright {
              text
            }
            description {
              text
            }
            footer_logo {
              url
            }
            notice {
              html
            }
          }
          lang
        }
      }
    }
  }
`;
