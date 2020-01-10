import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import { useStaticQuery, graphql, Link } from 'gatsby';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Hero.module.scss';

const Hero = ({ language }) => {
  const data = useStaticQuery(query);

  let dataFilteredByLanguage = data.allPrismicCarousel.edges.filter(
    edge => edge.node.lang === language
  );
  if (dataFilteredByLanguage.length === 0) {
    dataFilteredByLanguage = data.allPrismicCarousel.edges.filter(
      edge => edge.node.lang === 'en-gb'
    );
  }
  const carouselData = dataFilteredByLanguage[0].node.data.carousel;
  const cleanLanguage = dataFilteredByLanguage[0].node.lang.replace(
    /[-_][a-z][a-z].*$/,
    ''
  );

  return (
    <Carousel
      infiniteLoop
      autoplay
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
    >
      {carouselData.map((single, index) => {
        return (
          <div
            className={styles.carousel_image}
            style={{ backgroundImage: `url("${single.image.url}")` }}
            key={index}
          >
            <div className={styles.gradient}></div>
            <div className={styles.carousel_item_wrapper}>
              <div
                dangerouslySetInnerHTML={{ __html: single.main_text.html }}
              />
              <div className={styles.buttons}>
                {single.left_button && (
                  <a
                    href={
                      single.left_button.includes('http')
                        ? single.left_button
                        : `/${cleanLanguage}${single.left_button}`
                    }
                  >
                    {single.left_label.text}
                  </a>
                )}
                {single.right_button && (
                  <a
                    href={
                      single.right_button.includes('http')
                        ? single.right_button
                        : `/${cleanLanguage}${single.right_button}`
                    }
                  >
                    {single.right_label.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Hero;
/* const query = graphql`
  query Carousel {
    allPrismicCarousel {
      edges {
        node {
          lang
          data {
            carousel {
              image {
                url
              }
              main_text {
                html
              }
              left_button {
                url
              }
              left_label {
                text
              }
              right_button {
                url
              }
              right_label {
                text
              }
            }
          }
        }
      }
    }
  }
`; */

const query = graphql`
  query Carousel {
    allPrismicCarousel {
      edges {
        node {
          lang
          data {
            carousel {
              image {
                url
              }
              main_text {
                html
              }
              left_button
              left_label {
                text
              }
              right_button
              right_label {
                text
              }
            }
          }
        }
      }
    }
  }
`;
