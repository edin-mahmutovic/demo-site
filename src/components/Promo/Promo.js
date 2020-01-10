import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styles from './Promo.module.scss';

export default class Promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticker: '',
      message: '',
      link: '',
      label: '',
      active: 0
    };
  }

  setActiveTab = (sticker, message, label, link, index) => () => {
    this.setState({
      sticker: sticker,
      message: message,
      link: link,
      label: label,
      active: index
    });
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query PromoTabs {
            allPrismicPromo {
              edges {
                node {
                  lang
                  data {
                    tab {
                      main_text {
                        text
                      }
                      message {
                        text
                      }
                      sub_text {
                        html
                      }
                      sticker {
                        text
                      }
                      link {
                        url
                      }
                      label {
                        text
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
        `}
        render={data => {
          let filteredByLanguage = data.allPrismicPromo.edges.filter(
            edge => edge.node.lang === this.props.language
          );
          if (filteredByLanguage.length === 0) {
            filteredByLanguage = data.allPrismicPromo.edges.filter(
              edge => edge.node.lang === 'en-gb'
            );
          }
          const filteredData = filteredByLanguage[0].node.data.tab;
          return (
            <div className={styles.wrapper}>
              {/* <div className={styles.promo}>
                <div className={styles.sticker}>{this.state.sticker === '' ? filteredData[0].sticker.text : this.state.sticker}</div>
                <div className={styles.message}>{this.state.message === '' ? filteredData[0].message.text : this.state.message}</div>
                <a className={styles.link} href={this.state.link === '' ? filteredData[0].link.url : this.state.link}>{this.state.label === '' ? filteredData[0].label.text : this.state.label}</a>
              </div> */}
              <div className={styles.tabs}>
                {filteredData.map((tab, index) => {
                  return (
                    <a
                      className={`${styles.tab}`}
                      key={index}
                      href={filteredData[0].link.url}
                    >
                      <img className={styles.image} src={tab.image.url} />
                      <div>
                        <div className={styles.title}>{tab.main_text.text}</div>
                        <div
                          className={styles.text}
                          dangerouslySetInnerHTML={{
                            __html: tab.sub_text.html
                          }}
                        />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        }}
      />
    );
  }
}
