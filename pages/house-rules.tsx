import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function HouseRules() {
  return (
    <>
      <Head>
        <title>House Rules - Crush Zone Escort Kampala</title>
        <meta name="description" content="House rules and guidelines for clients at Crush Zone Escort Kampala to ensure a safe, respectful, and enjoyable experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>House Rules at Crush Zone Escort Kampala</h1>
            <p>To ensure a safe, respectful, and enjoyable experience for both our clients and escorts, we kindly ask all guests to adhere to the following house rules:</p>
          </div>
        </section>

        {/* Rules Section */}
        <section className="section">
          <div className="container">
            <div className="rules-list">
              <div className="rule-item">
                <h3>Respect and Courtesy</h3>
                <p>Treat our escorts and staff with the utmost respect and courtesy at all times. Disrespectful or abusive behavior will not be tolerated and may result in immediate termination of the appointment.</p>
              </div>

              <div className="rule-item">
                <h3>Discretion and Privacy</h3>
                <p>We guarantee full discretion and expect the same from our clients. Privacy is paramount—for both parties involved.</p>
              </div>

              <div className="rule-item">
                <h3>Punctuality</h3>
                <p>Please be on time for your appointments. Escorts reserve the right to reduce the session length if the client arrives late.</p>
              </div>

              <div className="rule-item">
                <h3>Health and Safety</h3>
                <p>Escorts are regularly health-checked and expect clients to maintain proper hygiene. Unwell clients must notify us in advance and may need to reschedule.</p>
              </div>

              <div className="rule-item">
                <h3>No Illegal Activities</h3>
                <p>Any illegal activities, including drug use, are strictly prohibited during any interaction with our escorts or services.</p>
              </div>

              <div className="rule-item">
                <h3>Consent is Mandatory</h3>
                <p>All interactions must be consensual. Any inappropriate behavior or pressure is unacceptable.</p>
              </div>

              <div className="rule-item">
                <h3>No Photography or Recording</h3>
                <p>For the protection and privacy of our escorts, photography or recording during appointments is strictly forbidden.</p>
              </div>

              <div className="rule-item">
                <h3>Payment</h3>
                <p>Payment is required upfront or as agreed before the start of the session. Negotiation or bargaining is not acceptable.</p>
              </div>

              <div className="rule-item">
                <h3>Special Requests</h3>
                <p>Please inform us in advance if you have any specific requests or preferences so we can ensure the best possible experience.</p>
              </div>

              <div className="rule-item">
                <h3>Respect Personal Boundaries</h3>
                <p>During meetings, dinner dates, or outings, please avoid asking personal or uncomfortable questions about our escorts' families or reasons for choosing this profession. Respect their privacy and enjoy your time together.</p>
              </div>
            </div>

            <div className="rules-footer">
              <p>These rules help maintain the highest standards of professionalism, safety, and enjoyment. Thank you for choosing Crush Zone Escort Kampala.</p>
            </div>
          </div>
        </section>
      </main>
      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .section {
          padding: 4rem 0;
        }

        .rules-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .rule-item {
          background: #f8f9fa;
          border-left: 4px solid #dc3545;
          padding: 2rem;
          margin-bottom: 2rem;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .rule-item h3 {
          color: #dc3545;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .rule-item p {
          line-height: 1.6;
          color: #333;
          margin: 0;
        }

        .rules-footer {
          text-align: center;
          margin-top: 3rem;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
          font-style: italic;
          color: #666;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .rule-item {
            padding: 1.5rem;
          }

          .rule-item h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}