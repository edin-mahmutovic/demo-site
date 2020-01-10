import React from 'react';
import styles from './Header.module.scss';

const Header = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div dangerouslySetInnerHTML={{__html: props.title}}></div>
      </div>
    </div>
  );
};

export default Header;
