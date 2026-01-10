import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - CrushZone</title>
        <meta name="description" content="Learn about CrushZone's mission, vision, and the team behind connecting hearts worldwide." />
        <meta name="keywords" content="about, mission, vision, team, dating app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="section">
          <div className="container">
            <h1>About CrushZone</h1>
            <p className="mb-4">Connecting hearts and building meaningful relationships since 2020.</p>

            <Card className="mb-4">
              <h2>Our Story</h2>
              <p>
                CrushZone was born from the idea that everyone deserves to find genuine connections in today's digital world.
                Our founders experienced the frustrations of traditional dating apps and decided to create something better -
                a platform that prioritizes compatibility, safety, and real relationships over superficial swiping.
              </p>
            </Card>

            <div className="grid grid-2 mb-4">
              <Card>
                <h3>Our Mission</h3>
                <p>
                  To create a safe, inclusive, and effective platform where people can find meaningful romantic connections
                  and build lasting relationships based on shared values and genuine compatibility.
                </p>
              </Card>
              <Card>
                <h3>Our Vision</h3>
                <p>
                  A world where technology brings people closer together, fostering authentic relationships and reducing
                  loneliness through intelligent matching and community building.
                </p>
              </Card>
            </div>

            <Card>
              <h2>Our Team</h2>
              <div className="grid grid-3">
                <div className="text-center">
                  <h4>Jane Doe</h4>
                  <p>CEO & Co-Founder</p>
                  <p>Former relationship counselor with 10+ years experience.</p>
                </div>
                <div className="text-center">
                  <h4>John Smith</h4>
                  <p>CTO & Co-Founder</p>
                  <p>Tech entrepreneur specializing in AI and machine learning.</p>
                </div>
                <div className="text-center">
                  <h4>Sarah Johnson</h4>
                  <p>Head of Safety</p>
                  <p>Dedicated to creating the safest dating environment possible.</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}