import React from 'react';
import PropTypes from 'prop-types';
import NavbarLink from '../NavbarLink/NavbarLink';
import NavbarDropdown from '../NavbarDropdown/NavbarDropdown';
import styles from './NavbarSection.module.scss';

function NavbarSection({ data }) {
  let section = data[0].primary.section;

  return (
    <>
      <div className={`${styles.section}`}>
        {data.map((single, index) => {
          return single.items[0].sub_nav_link ? (
            <NavbarDropdown data={single} key={index} />
          ) : (
            <NavbarLink data={single} key={index} />
          );
        })}
      </div>
    </>
  );
}

NavbarSection.propTypes = {};

export default NavbarSection;
