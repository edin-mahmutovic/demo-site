import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from "./HamburgerDropdown.module.scss"

export default class HamburgerDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubOpen: false
    }
  }
  
  toggleSub = () => {
    this.setState({
      isSubOpen: !this.state.isSubOpen
    })
  }

  render() {
    const { data } = this.props;
    const label = data.primary.label.text;
    return (
      <div className={styles.dropdown} onClick={this.toggleSub}>
        {label}
        <div className={`${styles.sub} ${this.state.isSubOpen}`}>
          {data.items.map((sublink, index) => {
            return(
              <a href={sublink.sub_nav_link.url} key={index}>
                {sublink.sub_nav_link_label.text}
              </a>
            )
          })}
        </div>
      </div>
    )
  }
}
