import React from 'react';
import styles from './CryptoSlice.module.scss';

const CryptoSlice = props => {
  return (
    <div className={styles.crypto}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: props.slice.primary.left_sidebar_title.html
        }}
      />
      {props.slice.items.map((single, index) => {
        return (
          <a
            href={`/${
              props.cleanLanguage
            }/contracts/${single.link_placeholder.text.toLowerCase()}`}
          >
            <div className={styles.row} key={index}>
              <img src={single.cryptocurrency_logo.url} />
              <div>{single.link_placeholder.text}</div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default CryptoSlice;
