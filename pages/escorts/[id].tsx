import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../../utils/api';

export default function EscortDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [escort, setEscort] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    hours: 1,
  });

  useEffect(() => {
    if (id) {
      const fetchEscort = async () => {
        try {
          const escortData = await apiClient.getEscortById(id as string);
          setEscort(escortData);
        } catch (error) {
          console.error('Error fetching escort:', error);
        }
      };
      fetchEscort();
    }
  }, [id]);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.bookEscort(id as string, bookingData);
      alert('Booking request sent successfully!');
    } catch (error) {
      console.error('Error booking:', error);
      alert('Error sending booking request');
    }
  };

  if (!escort) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="escort-detail">
        <div className="escort-images">
          <img src={escort.photos?.[0] || '/placeholder-escort.jpg'} alt={escort.name} />
        </div>
        <div className="escort-info">
          <h1>{escort.name}, {escort.age}</h1>
          <p><strong>Location:</strong> {escort.location?.city || 'N/A'}</p>
          <p><strong>Tribe:</strong> {escort.escortDetails?.tribe || 'N/A'}</p>
          <p><strong>Skin Color:</strong> {escort.escortDetails?.skinColor || 'N/A'}</p>
          <p><strong>Languages:</strong> {escort.escortDetails?.languages?.join(', ') || 'N/A'}</p>
          <p><strong>Phone:</strong> {escort.escortDetails?.phoneNumber || 'N/A'}</p>
          <p><strong>Orientation:</strong> {escort.escortDetails?.orientation || 'N/A'}</p>
          <p><strong>Price per Hour:</strong> {escort.escortDetails?.pricePerHour || 'N/A'} UGX</p>
          <p><strong>Height:</strong> {escort.escortDetails?.height || 'N/A'} cm</p>
          <p><strong>Weight:</strong> {escort.escortDetails?.weight || 'N/A'} kg</p>
        </div>
        <div className="booking-form">
          <h2>Book {escort.name}</h2>
          <form onSubmit={handleBook}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" value={bookingData.name} onChange={handleBookingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={bookingData.email} onChange={handleBookingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={bookingData.phone} onChange={handleBookingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={bookingData.date} onChange={handleBookingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="hours">Hours</label>
              <input type="number" id="hours" name="hours" value={bookingData.hours} onChange={handleBookingChange} min="1" required />
            </div>
            <button type="submit" className="btn btn-primary">Send Booking Request</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .escort-detail {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        .escort-images img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
        }
        .escort-info h1 {
          margin-bottom: 1rem;
        }
        .escort-info p {
          margin-bottom: 0.5rem;
        }
        .booking-form {
          grid-column: 1 / -1;
          margin-top: 2rem;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .form-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn-primary {
          background: #007bff;
          color: white;
        }
        .btn-primary:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}