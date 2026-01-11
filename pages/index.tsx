import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { apiClient } from '../utils/api';

export default function Home() {
  const [escorts, setEscorts] = useState([]);

  useEffect(() => {
    const fetchEscorts = async () => {
      try {
        const data = await apiClient.getEscorts();
        setEscorts(data.slice(0, 3)); // Show first 3
      } catch (error) {
        console.error('Error fetching escorts:', error);
      }
    };
    fetchEscorts();
  }, []);

  const handleBook = (escort: any) => {
    // Redirect to escort detail page
    window.location.href = `/escorts/${escort.id}`;
  };
  return (
    <>
      <Head>
        <title>CrushZone Escorts - Find Companionship</title>
        <meta name="description" content="Connect with professional escorts for companionship and memorable experiences." />
        <meta name="keywords" content="escorts, companionship, dates, professional services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Find CrushZone Companionship</h1>
            <p>Connect with professional escorts for unforgettable experiences</p>
            <Link href="/escorts"><Button>Explore Escorts</Button></Link>
          </div>
        </section>

        {/* Featured Escorts */}
        <section className="section">
          <div className="container">
            <h2>Featured Escorts</h2>
            <div className="grid grid-3">
              {escorts.length > 0 ? escorts.map((escort: any) => (
                <Card key={escort.id}>
                  <img src={escort.photos?.[0] || '/placeholder-escort.jpg'} alt={escort.name} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px'}} />
                  <h4>{escort.name}, {escort.age}</h4>
                  <p>Location: {escort.location?.city || 'N/A'}</p>
                  <p>Price: {escort.escortDetails?.pricePerHour || 'N/A'} UGX/hour</p>
                  <Button onClick={() => handleBook(escort)}>Book Now</Button>
                </Card>
              )) : (
                <>
                  <Card>
                    <img src="/placeholder-escort.jpg" alt="Escort 1" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px'}} />
                    <h4>No escorts available</h4>
                    <p>Check back later</p>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}