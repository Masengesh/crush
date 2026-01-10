import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '../utils/api';

export default function Escorts() {
  const [escorts, setEscorts] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    tribe: '',
    minPrice: '',
    maxPrice: '',
    minAge: '',
    maxAge: '',
  });

  const fetchEscorts = async () => {
    try {
      const params: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
      const data = await apiClient.getEscorts(params);
      setEscorts(data);
    } catch (error) {
      console.error('Error fetching escorts:', error);
    }
  };

  useEffect(() => {
    fetchEscorts();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      tribe: '',
      minPrice: '',
      maxPrice: '',
      minAge: '',
      maxAge: '',
    });
  };

  return (
    <div className="container">
      <h1>Our Escorts</h1>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={filters.city} onChange={handleFilterChange} placeholder="Enter city" />
        </div>
        <div className="filter-group">
          <label htmlFor="tribe">Tribe</label>
          <input type="text" id="tribe" name="tribe" value={filters.tribe} onChange={handleFilterChange} placeholder="Enter tribe" />
        </div>
        <div className="filter-group">
          <label htmlFor="minPrice">Min Price (UGX)</label>
          <input type="number" id="minPrice" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="0" />
        </div>
        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price (UGX)</label>
          <input type="number" id="maxPrice" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="1000000" />
        </div>
        <div className="filter-group">
          <label htmlFor="minAge">Min Age</label>
          <input type="number" id="minAge" name="minAge" value={filters.minAge} onChange={handleFilterChange} placeholder="18" />
        </div>
        <div className="filter-group">
          <label htmlFor="maxAge">Max Age</label>
          <input type="number" id="maxAge" name="maxAge" value={filters.maxAge} onChange={handleFilterChange} placeholder="50" />
        </div>
        <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
      </div>
      <div className="escorts-grid">
        {escorts.map((escort: any) => (
          <Link key={escort.id} href={`/escorts/${escort.id}`} className="escort-card">
            <img src={escort.photos?.[0] || '/placeholder-escort.jpg'} alt={escort.name} />
            <h3>{escort.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}