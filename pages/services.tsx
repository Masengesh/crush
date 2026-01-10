import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services - CrushZone Escort Kampala</title>
        <meta name="description" content="Explore our range of premium escort services in Kampala including massage, dinner dates, GFE, swinger clubs, and duo experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Our Services</h1>
            <p>Our captivating companions are available at your convenience, ready to help you explore and indulge in your fantasies! Each of our stunning escorts possesses unique talents that encompass allure, charm, intellect, and playfulness. At CrushZone Escort Kampala, we are dedicated to fulfilling every desire our clients may have. Our website showcases an outstanding selection of beautiful ladies, ensuring an unmatched customer experience across the city.</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            <div className="services-grid">
              <Card className="service-card">
                <h3>Massage Escorts</h3>
                <p>Let your stress melt away with an erotic massage in Kampala from one of our talented massage escorts. Each girl has their own style of massage, but all of them have complete satisfaction in common. Book today to have an outcall massage from one of our stunning Kampala ladies. You can see that some profiles list different types, such as tantric and prostate massages.</p>
              </Card>

              <Card className="service-card">
                <h3>Dinner Date Escorts</h3>
                <p>Feel a connection by taking your pick of dinner date escort in Kampala. An increasing number of clients are using this as an initial meeting to get to know the escort and if they are a good fit. This is a great idea if you're looking for a service that needs that extra communication and trust. A dinner date can also be beneficial if you are missing that connection and want to dine out with meaningful conversation and connect, but have limitations to make conventional dating unavailable, for example time.</p>
              </Card>

              <Card className="service-card">
                <h3>GFE</h3>
                <p>A Girlfriend experience is where you get the intimacy without the commitment. Think kisses and connection, think all her attention. This is one of the most popular services as it mimics a devoted girlfriend relationship. Our GFE escorts in Kampala are waiting to shower you with affection, book now for an outcall experience you won't regret.</p>
              </Card>

              <Card className="service-card">
                <h3>Swinger Club Escorts</h3>
                <p>Wanting to visit a swinging club but have no plus one? Some of our beautiful Kampala swinger escorts offer this service, where she will join you to a swingers party. Clients have said this was a great option for them as they wanted to experience swinging with someone that knows the ropes and guided them.</p>
              </Card>

              <Card className="service-card">
                <h3>Duo Escorts</h3>
                <p>What's better than one girl? Get the complete attention of two escorts in Kampala with our duo service. Threesomes are a common fantasy, and now you can curate your deepest desires. Want two blondes? A short girl and a tall woman? Take your pick of girls to have a threesome adventure with, right at your hotel.</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          padding: 2rem;
          height: fit-content;
        }

        .service-card h3 {
          color: #dc3545;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .service-card p {
          line-height: 1.6;
          color: #666;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}