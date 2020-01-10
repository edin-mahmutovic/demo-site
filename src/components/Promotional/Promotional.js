import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './Promotional.module.scss';

const Promotional = ({ language }) => {
  const data = useStaticQuery(query);
  // console.log(data)
  const filteredByLanguage = data.allPrismicPromotionalTab.edges.filter(
    edge => edge.node.lang === language
  );

  if (filteredByLanguage.length !== 0) {
    const filteredData = filteredByLanguage[0].node.data.tabs;

    return (
      <div className={styles.wrapper}>
        <div className={styles.promo}>
          <div className={styles.sticker}>{filteredData[0].sticker.text}</div>
          <div className={styles.message}>{filteredData[0].message.text}</div>
          <a className={styles.link} href={filteredData[0].link.url}>
            {filteredData[0].link_label.text}
          </a>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Promotional;

const query = graphql`
  query Promotional {
    allPrismicPromotionalTab {
      edges {
        node {
          lang
          data {
            tabs {
              link {
                url
              }
              link_label {
                text
              }
              message {
                text
              }
              sticker {
                text
              }
            }
          }
        }
      }
    }
  }
`;
