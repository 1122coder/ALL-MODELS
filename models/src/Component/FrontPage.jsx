import React from 'react';
import '../Style/FrontPage.css'; // Make sure to create this CSS file

const FrontPage = () => {
  return (
    <div className="container">
      <h1 className="gradient-text">All models <span className="animated-text">at one place</span></h1>
      <p className="subtitle">The place where you can play with different models</p>
    </div>
  );
}

export default FrontPage;
