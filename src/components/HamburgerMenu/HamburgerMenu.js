import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HamburgerDropdown from '../HamburgerDropdown/HamburgerDropdown';
import HamburgerLink from '../HamburgerLink/HamburgerLink';
import styles from './HamburgerMenu.module.scss';

export default class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerStatus: 'hamburgerMenuHidden',
      isSubOpen: false,
      isLanguageOpen: false
    };
  }

  toggleHamburger = () => {
    if (this.state.hamburgerStatus === 'hamburgerMenuHidden') {
      this.setState({
        hamburgerStatus: 'hamburgerMenuShown'
      });
    } else {
      this.setState({
        hamburgerStatus: 'hamburgerMenuHidden'
      });
    }
  };

  toggleSub = () => {
    this.setState({
      isSubOpen: !this.state.isSubOpen
    });
  };

  toggleLanguage = () => {
    this.setState({
      isLanguageOpen: !this.state.isLanguageOpen
    });
  };

  returnMobileComponentBySliceType = (slice, index) => {
    switch (slice.slice_type) {
      case 'link':
        return (
          <a
            key={index}
            href={`${this.props.language}/${slice.primary.link.text}`}
          >
            {slice.primary.label.text}
          </a>
        );
        break;

      case 'link_with_sublinks':
        return (
          <div key={index} className={styles.links} onClick={this.toggleSub}>
            <div className={styles.dropdown}>
              <div className={styles.label}>{slice.primary.label.text}</div>
              <div
                className={`${styles.dropdown_list} ${
                  this.state.isSubOpen ? styles.show : styles.hide
                }`}
              >
                {slice.items.map((link, index) => {
                  return (
                    <a
                      href={`${this.props.language}/${link.sub_link.text}`}
                      key={index}
                    >
                      {link.sublink_label.text}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        );
        break;

      case 'language_switcher':
        return (
          <div
            key={index}
            className={`${styles.switcher} ${
              this.state.isLanguageOpen ? styles.show_lang : styles.hide_lang
            }`}
            onClick={this.toggleLanguage}
          >
            {slice.items.map((single, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.language} ${
                    single.language_code.text === this.props.language
                      ? styles.language_active
                      : ''
                  }`}
                >
                  <img src={single.language_flag.url} />
                  <a href={`/${single.language_code.text}/`}>
                    {single.language.text}
                  </a>
                </div>
              );
            })}
          </div>
        );
        break;
      case 'login_and_signup':
        return (
          <a
            key={index}
            href={`${this.props.language}/${slice.primary.login_link.url}`}
          >
            {slice.primary.login_label.text}
          </a>
        );
    }
  };

  render() {
    const { menu } = this.props;
    return (
      <div className={styles.hamburgerMenu}>
        <a
          className={`${this.state.hamburgerStatus}`}
          href={`/${this.props.language}`}
        >
          <img src={this.props.logo} />
        </a>
        <div
          className={styles.hamburgerMenuTrigger}
          onClick={this.toggleHamburger}
        >
          <div
            className={`${styles.hamburgerMenuLine} ${styles.hamburgerMenuLine__first}`}
          ></div>
          <div
            className={`${styles.hamburgerMenuLine} ${styles.hamburgerMenuLine__second}`}
          ></div>
          <div
            className={`${styles.hamburgerMenuLine} ${styles.hamburgerMenuLine__third}`}
          ></div>
        </div>
        <div
          className={`${styles.hamburgerList} ${this.state.hamburgerStatus}`}
        >
          <div
            className={styles.hamburgerMenuClose}
            onClick={this.toggleHamburger}
          >
            <div
              className={`${styles.hamburgerMenuLine} ${styles.hamburgerMenuLine__first_close}`}
            ></div>
            <div
              className={`${styles.hamburgerMenuLine} ${styles.hamburgerMenuLine__second_close}`}
            ></div>
          </div>
          <div className={styles.list}>
            {menu.map((slice, index) => {
              return this.returnMobileComponentBySliceType(slice, index);
            })}
          </div>
        </div>
      </div>
    );
  }
}
