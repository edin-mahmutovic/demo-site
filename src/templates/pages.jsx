import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './Custom.module.scss';
import { RichText } from 'prismic-reactjs';
import TextSlice from '../slices/Text/TextSlice';
import ImageSlice from '../slices/Image/ImageSlice';
import CryptoSlice from '../slices/Crypto/CryptoSlice';
import FaqSlice from '../slices/FAQ/FaqSlice';
import TableSlice from '../slices/Table/TableSlice';
import LinkSlice from '../slices/Link/LinkSlice';

const Pages = ({ pageContext: { locale, slug }, location }) => {
  if (location) {
    if (location.pathname == '/ba-ba' || location.pathname == '/en-gb') {
      return null;
    }
  }
  const dynamicPages = useStaticQuery(query);
  const data = dynamicPages.allPrismicRepeatablePage.nodes;
  let filteredDataByLangAndSlug = data.filter(
    node => node.lang === locale && node.data.url === slug
  );

  let cleanLanguage = data.map(node =>
    node.lang.replace(/[-_][a-z][a-z].*$/, '')
  );

  if (filteredDataByLangAndSlug.length === 0) {
    return;
  }

  const filteredData = filteredDataByLangAndSlug[0].data;
  const leftColumnData = filteredData.body;
  const centerColumnData = filteredData.body1;
  const rightColumnData = filteredData.body2;
  const title = filteredData.title.html;

  function returnSliceType(slice) {
    switch (slice.slice_type) {
      case 'text':
        return slice.items.map((single, index) => {
          return <TextSlice index={index} single={single} />;
        });
        break;
      case 'image':
        return slice.items.map((single, index) => {
          return <ImageSlice key={index} index={index} single={single} />;
        });
        break;
      case 'faq_container':
        return <FaqSlice slice={slice} />;
        break;
      case 'crypto':
        return <CryptoSlice slice={slice} cleanLanguage={cleanLanguage[0]} location={location} />;
      case 'table':
        return <TableSlice slice={slice} />;
      case 'link':
        return <LinkSlice slice={slice} />;
    }
  }

  return (
    <div>
      <Navigation language={cleanLanguage[0]} location={location} />
      <Header title={title} />
      <div className={styles.wrapper}>
        <div className={styles.columnWrapper}>
          {leftColumnData && (
            <div className={styles.leftColumn}>
              {leftColumnData.map(slice => returnSliceType(slice))}
            </div>
          )}
          <div className={styles.centerColumn}>
            {centerColumnData.map(slice => returnSliceType(slice))}
          </div>
          {rightColumnData && (
            <div className={styles.rightColumn}>
              {rightColumnData.map(slice => returnSliceType(slice))}
            </div>
          )}
        </div>
      </div>
      <Footer language={locale} />
    </div>
  );
};

export default Pages;

const query = graphql`
  query DynamicPages {
    allPrismicRepeatablePage {
      nodes {
        slugs
        lang
        data {
          url
          body {
            primary {
              left_sidebar_title {
                html
                text
              }
            }
            slice_type
            items {
              cryptocurrency_logo {
                alt
                url
                copyright
              }
              link {
                link_type
                target
                url
              }
              link_placeholder {
                html
                text
              }
            }
          }
          body1 {
            ... on PrismicRepeatablePageBody1FaqContainer {
              id
              primary {
                faq_container {
                  html
                  text
                }
              }
              items {
                answer {
                  html
                  text
                }
                question {
                  html
                  text
                }
              }
              slice_type
            }
            ... on PrismicRepeatablePageBody1FounderContainer {
              id
              items {
                biography {
                  html
                  text
                }
                founder_image {
                  alt
                  copyright
                  url
                }
                name {
                  html
                  text
                }
                picture_position
              }
              slice_type
            }
            ... on PrismicRepeatablePageBody1Link {
              id
              primary {
                external_link {
                  link_type
                  target
                  url
                }
                link_icon {
                  alt
                  copyright
                  url
                }
                link_placeholder {
                  html
                  text
                }
              }
              slice_type
            }
            ... on PrismicRepeatablePageBody1Table {
              id
              slice_type
              primary {
                table_heading_1 {
                  html
                  text
                }
                table_heading_2 {
                  html
                  text
                }
              }
              items {
                col_1_content {
                  html
                  text
                }
                col_2_content {
                  html
                  text
                }
              }
            }
            ... on PrismicRepeatablePageBody1Text {
              id
              slice_type
              primary {
                title {
                  html
                  text
                }
              }
              items {
                content {
                  html
                  text
                }
              }
            }
          }
          title {
            html
            text
          }
        }
      }
    }
  }
`;
