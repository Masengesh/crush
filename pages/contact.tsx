import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>Contact Us - CrushZone</title>
        <meta name="description" content="Get in touch with CrushZone. We're here to help with any questions or concerns." />
        <meta name="keywords" content="contact, support, help, dating app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="section">
          <div className="container">
            <h1>Contact Us</h1>
            <p className="mb-4">Have a question or need help? We'd love to hear from you!</p>

            <div className="grid grid-2">
              <Card>
                <h2>Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              </Card>

              <Card>
                <h2>Get in Touch</h2>
                <div className="mb-3">
                  <h3>Email</h3>
                  <p>support@datingapp.com</p>
                </div>
                <div className="mb-3">
                  <h3>Phone</h3>
                  <p>+256786754337</p>
                </div>
                <div className="mb-3">
                  <h3>Address</h3>
                  <p>123 Love Street<br />Romance City, RC 12345</p>
                </div>
                <div>
                  <h3>Follow Us</h3>
                  <div className="social-links">
                    <a href="#" aria-label="Facebook">📘 Facebook</a>
                    <a href="#" aria-label="Twitter">🐦 Twitter</a>
                    <a href="#" aria-label="Instagram">📷 Instagram</a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}