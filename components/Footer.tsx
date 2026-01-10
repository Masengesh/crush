import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
        <p>&copy; 2023 CrushZone Escorts. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="Instagram">📷</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;