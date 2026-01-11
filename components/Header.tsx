import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <Link href="/" className="nav-brand">
          <h1>CrushZone Escorts</h1>
        </Link>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/escorts">Escorts</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/house-rules">House Rules</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            ☰
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="nav-mobile">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/escorts" onClick={() => setIsOpen(false)}>Escorts</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/house-rules" onClick={() => setIsOpen(false)}>House Rules</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        </div>
      )}
      <style jsx>{`
      `}</style>
    </header>
  );
};

export default Header;