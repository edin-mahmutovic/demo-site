import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './ListChoice.module.scss';

const ListChoice = ({ language }) => {
  const data = useStaticQuery(query);
  const filteredDataByLanguage = data.allPrismicHomepageList.edges.filter(
    edge => edge.node.lang === language
  );
  if (filteredDataByLanguage.length !== 0) {
    const filteredData = filteredDataByLanguage[0].node.data;
    return (
      <div className={styles.holder}>
        <div className={styles.list_wrapper}>
          <div className={styles.list_title}>{filteredData.title.text}</div>
          <div className={styles.list_items}>
            {filteredData.list.map((value, index) => {
              return (
                <div className={styles.wrapper} key={index}>
                  <img src={value.icon.url} />
                  <div className={styles.list_item}>
                    <div
                      className={styles.list_item_subtitle}
                      dangerouslySetInnerHTML={{ __html: value.subtitle.html }}
                    />
                    <div
                      className={styles.list_item_subtext}
                      dangerouslySetInnerHTML={{ __html: value.subtext.html }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ListChoice;

const query = graphql`
  query ListChoice {
    allPrismicHomepageList {
      edges {
        node {
          lang
          data {
            title {
              text
            }
            list {
              subtext {
                html
              }
              subtitle {
                html
              }
              icon {
                url
              }
            }
          }
        }
      }
    }
  }
`;
