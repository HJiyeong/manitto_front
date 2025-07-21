import React from 'react';
import bgFull from '../assets/images/web_background.png';
import bgInner from '../assets/images/basic_background.png';

const Layout = ({ children, innerBackground }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${bgFull})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '618px',
        minHeight: '100vh',
        backgroundImage: `url(${innerBackground || bgInner})`,  
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffffcc',
      }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
