import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import { useRouter } from 'next/router';

export default function PendingApproval() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Account Pending Approval - Elite Escort Amsterdam</title>
        <meta name="description" content="Your account is pending admin approval. Please wait for approval before logging in." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="hero">
          <div className="container">
            <Card className="pending-card">
              <div className="pending-content">
                <h1>Account Pending Approval</h1>
                <div className="status-icon">⏳</div>
                <p className="pending-message">
                  Thank you for registering with Elite Escort Amsterdam!
                </p>
                <p className="pending-details">
                  Your account has been submitted for admin approval. This process typically takes 24-48 hours.
                  You will receive an email notification once your account is approved and you can log in.
                </p>
                <p className="pending-note">
                  <strong>Note:</strong> All new accounts require manual approval to ensure the highest standards
                  of quality and security for our community.
                </p>
                <div className="pending-actions">
                  <Button onClick={() => router.push('/')} variant="secondary">
                    Return to Home
                  </Button>
                  <Button onClick={() => router.push('/contact')} variant="primary">
                    Contact Support
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 70vh;
          display: flex;
          align-items: center;
          padding: 4rem 0;
        }

        .pending-card {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 3rem 2rem;
        }

        .pending-content h1 {
          color: #dc3545;
          margin-bottom: 2rem;
          font-size: 2.5rem;
        }

        .status-icon {
          font-size: 4rem;
          margin: 2rem 0;
        }

        .pending-message {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .pending-details {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 1.5rem;
        }

        .pending-note {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .pending-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 2rem 0;
            min-height: auto;
          }

          .pending-card {
            padding: 2rem 1.5rem;
          }

          .pending-content h1 {
            font-size: 2rem;
          }

          .status-icon {
            font-size: 3rem;
          }

          .pending-actions {
            flex-direction: column;
            align-items: center;
          }

          .pending-actions button {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </>
  );
}