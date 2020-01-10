import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './GetInTouch.module.scss';

const GetInTouch = ({ language }) => {
  const data = useStaticQuery(query);

  let filteredByLanguage = data.allPrismicHomepageContact.edges.filter(
    edge => edge.node.lang === language
  );

  if (filteredByLanguage.length !== 0) {
    let filteredData = filteredByLanguage[0].node.data;
    return (
      <div className={styles.wrapper}>
        <p className={styles.heading}>{filteredData.main_text.text}</p>
        <div className={styles.sections}>
          {filteredData.sections.map((section, index) => {
            return (
              <a className={styles.section} href={section.link.url} key={index}>
                <img className={styles.image} src={section.image.url} />
                <div className={styles.title}>{section.main_text1.text}</div>
                <div
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: section.sub_text.html }}
                />
                <img className={styles.icon} src={section.icon.url} />
              </a>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default GetInTouch;

const query = graphql`
  query getInTouch {
    allPrismicHomepageContact {
      edges {
        node {
          lang
          data {
            main_text {
              text
            }
            sections {
              icon {
                url
              }
              link {
                url
              }
              main_text1 {
                text
              }
              sub_text {
                html
              }
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;
