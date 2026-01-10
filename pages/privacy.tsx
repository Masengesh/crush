import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - CrushZone Escorts</title>
        <meta name="description" content="Learn how CrushZone Escorts collects, uses, and protects your personal information." />
        <meta name="keywords" content="privacy, policy, data, protection, escort services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="section">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p className="mb-4">Last updated: October 19, 2023</p>

            <Card className="mb-4">
              <h2>1. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, update your profile,
                or contact us for support. This may include your name, email address, phone number, date of birth, photos,
                and profile information.
              </p>
              <h3>Usage Information</h3>
              <p>
                We collect information about how you use our service, including your interactions with escorts,
                pages visited, features used, and device information.
              </p>
            </Card>

            <Card className="mb-4">
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new features and services</li>
                <li>Personalize your experience and provide content relevant to you</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </Card>

            <Card className="mb-4">
              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                except as described in this policy. We may share your information in the following circumstances:
              </p>
              <ul>
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In connection with a business transfer</li>
              </ul>
            </Card>

            <Card className="mb-4">
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </Card>

            <Card className="mb-4">
              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability</li>
              </ul>
            </Card>

            <Card className="mb-4">
              <h2>6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts.
                You can control cookie settings through your browser preferences.
              </p>
            </Card>

            <Card>
              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}