import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Homepage from '../templates/homepage';
import '../styles/reset.css';

const Index = ({ children, pageContext, pageContext: { language } }) => {
  return (
    <div className='layout'>
      {/* <Navbar language={language} /> */}
      <Homepage language={language} />
      {/* <Footer language={language} /> */}
    </div>
  );
};

export default Index;
