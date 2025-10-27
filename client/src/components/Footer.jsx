import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <p>&copy; 2025 MERN Blog. All rights reserved.</p>
        <p>Built with MongoDB, Express, React & Node.js</p>
      </div>
    </footer>
  );
};

export default Footer;