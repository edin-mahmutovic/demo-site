import React from 'react'
import PropTypes from 'prop-types'
import styles from './FooterSocial.module.scss'

const FooterSocial = ({data}) => {
  const title = data.primary.social_title.text;
  const itemsArray = data.items;
  return (
    <div className={styles.social}>
      <p>{title}</p>
      <div className={styles.links}>
        {itemsArray.map((link, index) => {
          return (
            <a
              className={styles.link}
              href={link.social_link.url}
              key={index}
            >
              <img src={link.social_icon.url} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

FooterSocial.propTypes = {

}

export default FooterSocial

