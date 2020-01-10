import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './Navbar.module.scss';
import NavbarSection from '../NavbarSection/NavbarSection';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const Navbar = ({ language }) => {
  const navbarQuery = useStaticQuery(query);

  const data = navbarQuery.allPrismicNavbar.edges;
  let logoUrl;
  let filteredData = [];
  let sections = [];

  data.map(singleNode => {
    if (singleNode.node.lang === language) {
      filteredData = singleNode.node.data.nav;
      logoUrl = singleNode.node.data.logo.url;
    }
  });
  if (filteredData.length === 0) {
    data.map(singleNode => {
      if (singleNode.node.lang === 'en-gb') {
        filteredData = singleNode.node.data.nav;
        logoUrl = singleNode.node.data.logo.url;
      }
    });
  }

  sections.push(
    filteredData.filter(section => section.primary.section === 'first')
  );
  sections.push(
    filteredData.filter(section => section.primary.section === 'second')
  );
  sections.push(
    filteredData.filter(section => section.primary.section === 'third')
  );
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_sections}>
        <div className={styles['navbarSections__section--logo']}>
          <img src={logoUrl} alt='logo' />
        </div>
        <div className={styles.hamburgerMenuWrapper}>
          <HamburgerMenu data={filteredData} />
        </div>
        <div className={styles.navbar_sections_wrapper}>
          {sections.map((section, index) => {
            return <NavbarSection data={section} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/* const query = graphql`
  query Navbar {
    allPrismicNavbar {
      edges {
        node {
          lang
          data {
            display_name {
              text
            }
            logo {
              url
            }
            nav {
              items {
                sub_nav_link {
                  text
                  target
                }
                sub_nav_link_label {
                  text
                }
              }
              primary {
                section
                icon {
                  localFile {
                    url
                  }
                }
                label {
                  text
                }
                link {
                  url
                  target
                }
              }
            }
          }
        }
      }
    }
  }
`; */

const query = graphql`
  query Navbar {
    allPrismicNavbar {
      edges {
        node {
          lang
          data {
            display_name {
              text
            }
            logo {
              url
            }
            nav {
              items {
                sub_nav_link {
                  text
                }
                sub_nav_link_label {
                  text
                }
              }
              primary {
                section
                icon {
                  localFile {
                    url
                  }
                }
                label {
                  text
                }
                link {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;
