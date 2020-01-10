import React from 'react'
import PropTypes from 'prop-types'
import styles from "./HamburgerLink.module.scss";

function HamburgerLink(props) {
  const data = props.data.primary;
  return (
    <a className={styles.hamburger_link} href={data.link.url} >
      {data.icon.localFile && <img src={data.icon.localFile.url} />}
      {data.label.text}
    </a>
  )
}

HamburgerLink.propTypes = {

}

export default HamburgerLink

