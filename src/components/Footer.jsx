import React from 'react';
import { FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer-section">
    <p>Made with love by Musaddiq Rafi</p>
    <div className="social-icons">
      <a href="https://www.facebook.com/abdullahalmusaddiq.rafi" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://www.linkedin.com/in/musaddiq-rafi/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="mailto:musaddiq@iut-dhaka.edu">
        <FaEnvelope />
      </a>
    </div>
  </footer>
);

export default Footer;