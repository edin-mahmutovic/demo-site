import React from 'react';
import { graphql, withPrefix } from 'gatsby';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import GetInTouch from '../components/GetInTouch/GetInTouch';
import ListChoice from '../components/ListChoice/ListChoice';
import TwoColumnsImageText from '../components/TwoColumnsImageText/TwoColumnsImageText';
import TwoColumnsTextImage from '../components/TwoColumnsTextImage/TwoColumnsTextImage';
import Promo from '../components/Promo/Promo';
import DynamicTable from '../components/DynamicTable/DynamicTable';
import Helmet from 'react-helmet';
import '../../static/fonts/fonts.css';
import Blog from '../components/Blog/Blog';
import Promotional from '../components/Promotional/Promotional';
import Navigation from '../components/Navigation/Navigation';

const Homepage = ({ language, location, ghostLang }) => {
  if (location) {
    if (location.pathname == '/ba-ba' || location.pathname == '/en-gb') {
      return null;
    }
  }
  return (
    <>
      <Helmet>
        <script src={withPrefix('rates.min.js')} type={'text/javascript'} />
      </Helmet>
      <Navigation language={language} location={location} />
      {/* <Navbar language={language} /> */}
      <Hero language={language} />
      {/* <Promotional language={language} /> */}
      <Promo language={language} />
      <DynamicTable language={language} />
      <TwoColumnsImageText language={language} />
      <TwoColumnsTextImage language={language} />
      <ListChoice language={language} />
      <Blog language='en' />
      <GetInTouch language={language} />
      <Footer language={language} />
    </>
  );
};

export default Homepage;
