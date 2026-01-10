import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - CrushZone Escorts</title>
        <meta name="description" content="Read CrushZone Escorts' terms and conditions for using our platform and services." />
        <meta name="keywords" content="terms, conditions, legal, escort services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="section">
          <div className="container">
            <h1>Terms & Conditions</h1>
            <p className="mb-4">Last updated: October 19, 2023</p>

            <Card className="mb-4">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using CrushZone Escorts, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </Card>

            <Card className="mb-4">
              <h2>2. User Accounts</h2>
              <p>
                You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality
                of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </Card>

            <Card className="mb-4">
              <h2>3. User Conduct</h2>
              <p>
                You agree not to use the service to:
              </p>
              <ul>
                <li>Harass, abuse, or harm another person</li>
                <li>Post false or misleading information</li>
                <li>Impersonate any person or entity</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit any viruses or malicious code</li>
              </ul>
            </Card>

            <Card className="mb-4">
              <h2>4. Content and Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of CrushZone Escorts,
                to understand our practices. By using our service, you consent to the collection and use of information in accordance
                with our Privacy Policy.
              </p>
            </Card>

            <Card className="mb-4">
              <h2>5. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability,
                under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </Card>

            <Card className="mb-4">
              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall CrushZone Escorts, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses.
              </p>
            </Card>

            <Card>
              <h2>7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material,
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}