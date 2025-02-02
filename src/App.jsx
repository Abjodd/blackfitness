import React, { useState, useEffect } from 'react';  //
import './App.css';
import Admin from './Admin';
import Login from './Login.jsx'; // Import the Login component
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login state from localStorage on mount
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleAdminAccess = () => {
    if (isLoggedIn) {
      setView('login'); // If logged in, go directly to Admin
    } else {
      setView('login'); // Otherwise, go to Login first
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Save login state
    setView('admin'); // Redirect to Admin after login
  };
  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="home-content">
            <header className="hero-section">
              <h1>Welcome to BLACK FITNESS Gym</h1>
              <p>Your Fitness, Our Priority!</p>
            </header>
            <div className="container">
              <h1 className="section-title">Pick the best plan for you</h1>
              <div className="pricing-grid">
                {/* Normal Plan */}
                <div className="pricing-card">
                  <h5>NORMAL</h5>
                  <p className="price">
                    <sup>₹</sup>800<sub>/mo</sub>
                  </p>
                  <ul className="features-list">
                    <li><strong>₹ 2000</strong> Quarterly</li>
                    <li><strong>₹ 3500</strong> Half Yearly</li>
                    <li><strong>₹ 5500</strong> Yearly</li>
                  </ul>
                  <button className="btn-primary" onClick={() => setView('contact')}>Get Started</button>
                </div>

                {/* Couple Plan */}
                <div className="pricing-card">
                  <h5>COUPLE</h5>
                  <p className="price">
                    <sup>₹</sup>1400<sub>/mo</sub>
                  </p>
                  <ul className="features-list">
                    <li><strong>₹ 3500</strong> Quarterly</li>
                    <li><strong>₹ 6500</strong> Half Yearly</li>
                    <li><strong>₹ 12000</strong> Yearly</li>
                  </ul>
                  <button className="btn-primary" onClick={() => setView('contact')}>Get Started</button>
                </div>

                {/* Personal Trainer Plan */}
                <div className="pricing-card">
                  <h5>PERSONAL TRAINER</h5>
                  <p className="price">
                    <sup>₹</sup>3000<sub>/mo</sub>
                  </p>
                  <ul className="features-list">
                    <li><strong>₹ 8000</strong> Quarterly</li>
                    <li><strong>₹ 15000</strong> Half Yearly</li>
                    <li><strong>₹ 25000</strong> Yearly</li>
                  </ul>
                  <button className="btn-primary" onClick={() => setView('contact')}>Get Started</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="about-content">
            <h1>About Us</h1>
            <h2>BLACK FITNESS Gym is dedicated to providing the best fitness experience...</h2>
            <div className="about-grid">
              <div className="about-text">
                <h3>Our Mission</h3>
                <p>
                  At BLACK FITNESS Gym, we strive to help you reach your fitness goals with personalized programs, expert trainers, and a motivating environment.
                </p>
                <h3>Our Facilities</h3>
                <p>
                  Our gym is equipped with state-of-the-art equipment, spacious workout areas, and a wide variety of classes to suit your needs.
                </p>
              </div>
              <div className="about-images">
                <img src="/gym1.jpg" alt="Gym Interior" />
                <img src="/gym2.jpg" alt="Gym Interior" />
                <img src="/gym3.jpg" alt="Gym Interior" />
                <img src="/gym4.jpg" alt="Gym Interior" />
              </div>
            </div>
          </div>
        );
        case 'login':
          return <Login onLoginSuccess={handleLoginSuccess} />;

      case 'admin':
        // Only render Admin if logged in, else render Login
        return isLoggedIn ? <Admin /> : <Login onLoginSuccess={handleLoginSuccess} />;

      case 'contact':
        return (
          <div className="contact-content">
            <h2>Contact Us</h2>
            <p><h2> YASEEN</h2></p>
            <p>Email: yaseen14395@gmail.com</p>
            <p>Phone: 9606239668</p>
            <p>Address: 2nd Floor, Sharoff Square, 1539, 14th Main Rd, 1st Stage, Kumaraswamy Layout, Bengaluru, Karnataka 560078</p>
            <p>Follow us on social media:</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/share/1BAWewiSie/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/blackfitness35" target="_blank" rel="noopener noreferrer">
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
    <div className="app">
      <nav className="navbar">
        <img src="/logo.png" alt="BLACK FITNESS Gym Logo" className="logo" />
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleAdminAccess}>Admin</button>
          <button className="nav-button" onClick={() => setView('home')}>Home</button>
          <button className="nav-button" onClick={() => setView('about')}>About Us</button>
          <button className="nav-button" onClick={() => setView('contact')}>Contact Us</button>
        </div>
      </nav>
      <div className="main-content">
        {renderContent()}
      </div>
      <footer className="footer">
        <p>
          Created with <i className="fa fa-heart"></i> by{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://florin-pop.com">
            Arbeel Wani
          </a>{" "}
          - Contact me at 9622849366
          <br />
          Other projects on{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Abjodd">
            Github
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;