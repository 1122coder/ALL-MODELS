import React from 'react';

import '../Style/FrontPage.css';

const FrontPage = () => {
 

  return (
    <div className="container">
      <h1 className="gradient-text">All models <span className="animated-text">at one place</span></h1>
      <p className="subtitle">The place where you can play with different models</p>
      <button className="button">
  Get Started <span className="arrow">→</span>
</button>
    </div>
  );
};

export default FrontPage;
