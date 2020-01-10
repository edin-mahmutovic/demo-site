import React from 'react';
import PropTypes from 'prop-types';
import styles from './FooterSections.module.scss';

const FooterSections = ({ data, cleanLanguage }) => {
  const itemsArray = data.items;
  const title = data.primary.link_title.text;
  return (
    <div className={styles.links}>
      <p>{title}</p>
      {itemsArray.map((link, index) => {
        return (
          <a
            href={
              link.link !== null
                ? link.link.url
                : `/${cleanLanguage}/${link.link_on_page.text}`
            }
            key={index}
          >
            {link.label.text}
          </a>
        );
      })}
    </div>
  );
};

export default FooterSections;
