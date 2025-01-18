import React, { useState } from 'react';
import './App.css';
import Admin from './Admin'; // Only one import here

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [view, setView] = useState('home');

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <header>
              <h1>Welcome to BLACK FITNESS Gym</h1>
              <p>Your Fitness, Our Priority!</p>
            </header>
            <div className="container">
            <h1 className="t">Pick the best plan for you</h1>

      {/* Pricing Box Container */}
      <div className="pricing-box-container">
        {/* Free Plan */}
        <div className="pricing-box text-center">
          <h5>NORMAL</h5>
          <p className="price">
            <sup>₹</sup>800<sub>/mo</sub>
          </p>
          <ul className="features-list">
            <li>
              <strong> ₹ 2000 </strong> Quarterly
            </li>
            <li>
              <strong>₹ 3500 </strong> half yearly
            </li>
            <li>
              <strong>₹ 5500 </strong> Yearly
            </li>
            
          </ul>
          <button className="btn-primary" onClick={() => setView('contact')}>Get Started</button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-box text-center">
          <h5>COUPLE</h5>
          <p className="price">
            <sup>₹</sup>1400<sub>/mo</sub>
          </p>
          <ul className="features-list">
          <li>
              <strong> ₹ 3500 </strong> Quarterly
            </li>
            <li>
              <strong>₹ 6500 </strong> half yearly
            </li>
            <li>
              <strong>₹ 12000 </strong> Yearly
            </li>
          </ul>
          <button className="btn-primary" onClick={() => setView('contact')}>Get Started</button>
          </div>
        {/* Platinum Plan */}
          <div className="pricing-box text-center">
            <h5>PERSONAL TRAINER</h5>
            <p className="price">
              <sup>₹</sup>3000<sub>/mo</sub>
            </p>
            <ul className="features-list">
            <li>
                <strong> ₹ 8000 </strong> Quarterly
              </li>
              <li>
                <strong>₹ 15000 </strong> half yearly
              </li>
              <li>
                <strong>₹ 25000 </strong> Yearly
              </li>
            </ul>
            <button className="btn-primary" onClick={() => setView('contact')}>Get Started</button>
          </div>
              </div>

              {/* Footer */}
      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://florin-pop.com">
            Arbeel Wani
          </a>{" "}
          - contact me at{" "}
          
             "9622849366"
         
          <br />
          Other projects on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Abjodd"
          >
            Github
          </a>
        </p>
      </footer>
    </div>
          </>
        );
      case 'about':
        return (
          <div className="content">
          <h1>About Us</h1>
          <h2>BLACK FITNESS Gym is dedicated to providing the best fitness experience...</h2>
      
          <div className="about-container">
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>
                At BLACK FITNESS Gym, we strive to help you reach your fitness goals with personalized programs, expert trainers, and a motivating environment. Whether you're looking to lose weight, build muscle, or maintain overall health, we have a plan for you.
              </p>
              <h3>Our Facilities</h3>
              <p>
                Our gym is equipped with state-of-the-art equipment, spacious workout areas, and a wide variety of classes to suit your needs.
              </p>
            </div>
      
            <div className="about-images">
              <img src="/WhatsApp Image 2025-01-16 at 06.33.45_3cb394af.jpg" alt="Gym Interior" className="about-img" />
              <img src="/WhatsApp Image 2025-01-16 at 14.55.09_cb3539ec.jpg" alt="Gym Interior" className="about-img" />
              <img src="/WhatsApp Image 2025-01-16 at 14.55.08_5f580e18.jpg" alt="Gym Interior" className="about-img" />
              <img src="/WhatsApp Video 2025-01-16 at 06.35.20_761f3e83.mp4" alt="Fitness Class" className="about-img" />
            </div>
          </div>
        </div>
        );
      case 'admin':
        return <Admin />;
     
      case 'contact':
        return (
          <div className="content">
  <h2>Contact Us</h2>
  <p>Email: contact@fitlifegym.com</p>
  <p>Phone: 9606239668</p>
  <p>Address:2nd Floor, Sharoff Square, 1539, 14th Main Rd, 1st Stage, Kumaraswamy Layout, Bengaluru, Karnataka 560078</p>
  <p>Follow us on social media:</p>

  <div className="social-icons">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://www.instagram.com/blackfitness35?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-image">
      <nav className="navbar">
        <button className="nav-button" onClick={() => setView('admin')}>Admin</button>
        <button className="nav-button" onClick={() => setView('home')}>Home</button>
        <button className="nav-button" onClick={() => setView('about')}>About Us</button>
        <button className="nav-button" onClick={() => setView('contact')}>Contact Us</button>
      </nav>
      {renderContent()}
    </div>
  );
}

export default App;
