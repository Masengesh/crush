import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Section */}
          <div className="footer-section">
            <h3>CrushZone Escorts</h3>
            <p>Your trusted companion for professional escort services. Connecting people with quality companionship experiences.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link">📘 Facebook</a>
              <a href="#" aria-label="Twitter" className="social-link">🐦 Twitter</a>
              <a href="#" aria-label="Instagram" className="social-link">📷 Instagram</a>
            </div>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link href="/escorts">Browse Escorts</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/premium">Premium Membership</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/house-rules">House Rules</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/house-rules">Safety Guidelines</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 CrushZone Escorts. All rights reserved.</p>
          <p>Professional companionship services for discerning individuals.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;