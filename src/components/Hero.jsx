import React from 'react';
import chatbotImage from '../assets/sigmaMan.gif'; // Adjust the path as necessary

const Hero = () => (
  <header className="hero-section">
    <img src={chatbotImage} alt="Chatbot" className="hero-image" />
    <h1>SigmaGPT</h1>
    <p>Ditch ChatGPT, use SigmaGPT</p>
  </header>
);

export default Hero;