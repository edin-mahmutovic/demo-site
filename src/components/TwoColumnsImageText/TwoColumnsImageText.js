import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './TwoColumnsImageText.module.scss';

const TwoColumnsImageText = ({ language }) => {
  const data = useStaticQuery(query);
  const filteredByLanguage = data.allPrismicTradeAnywhere.edges.filter(
    edge => edge.node.lang === language
  );

  if (filteredByLanguage.length !== 0) {
    const filteredData = filteredByLanguage[0].node.data;
    return (
      <div
        className={styles.wrapper}
        style={{ backgroundColor: filteredData.background_color }}
      >
        <div className={styles.column_wrapper}>
          <div className={styles.column_image}>
            <img src={filteredData.main_image.url} />
          </div>
          <div className={styles.column_text}>
            <div className={styles.title}>{filteredData.main_text.text}</div>
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: filteredData.sub_text.html }}
            />
            <a className={styles.link} href={filteredData.link_url.url}>
              <img src={filteredData.icon.url} />
              {filteredData.link_label.text}
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TwoColumnsImageText;

const query = graphql`
  query MyQuery {
    allPrismicTradeAnywhere {
      edges {
        node {
          lang
          data {
            background_color
            main_image {
              url
            }
            icon {
              url
            }
            link_label {
              text
            }
            link_url {
              url
            }
            main_text {
              text
            }
            sub_text {
              html
            }
          }
        }
      }
    }
  }
`;
