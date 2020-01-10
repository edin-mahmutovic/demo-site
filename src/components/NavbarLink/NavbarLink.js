import React from "react";
import PropTypes from "prop-types";
import styles from "./NavbarLink.module.scss";

function NavbarLink(props) {
  const linkOptions = props.data.primary;
  const hasIcon = linkOptions.icon.localFile ? true : false;
  const label = linkOptions.label.text;
  const linkUrl = linkOptions.link.url;

  return (
    <a href={linkUrl} className={styles.link}>
      {hasIcon && <img src={linkOptions.icon.localFile.url} />}
      {label}
    </a>
  );
}

NavbarLink.propTypes = {};

export default NavbarLink;
