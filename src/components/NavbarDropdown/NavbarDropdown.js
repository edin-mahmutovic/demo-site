import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './NavbarDropdown.module.scss'

export default class NavbarDropdown extends Component {
  render() {

    const { data }  = this.props;
    const label = data.primary.label.text
    const subnav = data.items;
    
    return (
      <div className={styles.dropdown_link}>
        {label}
        <div className={styles.dropdown}>
          {subnav.map((link, index) => {
            return (
              <a href={link.sub_nav_link.url} key={index}>
                {link.sub_nav_link_label.text}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
