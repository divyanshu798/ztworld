import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../services/api';

const PropertiesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--gray-800);
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--gray-600);
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PropertyContent = styled.div`
  padding: 1.5rem;
`;

const PropertyName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--gray-800);
`;

const PropertyLocation = styled.p`
  color: var(--gray-600);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const PropertyDescription = styled.p`
  color: var(--gray-700);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PropertyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
`;

const RoomCount = styled.span`
  color: var(--gray-600);
  font-size: 0.9rem;
`;

const PriceRange = styled.span`
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const LoadingText = styled.p`
  color: var(--gray-600);
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--red-600);
`;

const SearchFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAll();
      setProperties(response.data.properties || []);
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = !searchTerm || 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !cityFilter || property.location.city === cityFilter;
    
    return matchesSearch && matchesCity;
  });

  const cities = [...new Set(properties.map(p => p.location.city))];

  const getPriceRange = (rooms) => {
    if (!rooms || rooms.length === 0) return 'Price on request';
    const prices = rooms.map(room => room.pricePerNight);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  if (loading) {
    return (
      <PropertiesContainer>
        <LoadingContainer>
          <LoadingText>Loading properties...</LoadingText>
        </LoadingContainer>
      </PropertiesContainer>
    );
  }

  if (error) {
    return (
      <PropertiesContainer>
        <ErrorContainer>
          <h3>Error Loading Properties</h3>
          <p>{error}</p>
          <button onClick={fetchProperties} style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            background: 'var(--primary-color)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            cursor: 'pointer' 
          }}>
            Try Again
          </button>
        </ErrorContainer>
      </PropertiesContainer>
    );
  }

  return (
    <PropertiesContainer>
      <PageHeader>
        <PageTitle>Our Properties</PageTitle>
        <PageSubtitle>
          Discover amazing guest houses across multiple locations
        </PageSubtitle>
      </PageHeader>

      <SearchFilters>
        <SearchInput
          type="text"
          placeholder="Search properties by name, location, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </FilterSelect>
      </SearchFilters>

      {filteredProperties.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
          <h3>No Properties Found</h3>
          <p>Try adjusting your search filters.</p>
        </div>
      ) : (
        <PropertiesGrid>
          {filteredProperties.map((property) => (
            <Link 
              key={property._id} 
              to={`/properties/${property._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <PropertyCard>
                <PropertyImage
                  src={property.photos && property.photos[0] ? property.photos[0] : '/placeholder-property.jpg'}
                  alt={property.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
                  }}
                />
                <PropertyContent>
                  <PropertyName>{property.name}</PropertyName>
                  <PropertyLocation>
                    📍 {property.location.city}, {property.location.state}
                  </PropertyLocation>
                  <PropertyDescription>
                    {property.description}
                  </PropertyDescription>
                  <PropertyFooter>
                    <RoomCount>
                      🏠 {property.rooms?.length || 0} rooms available
                    </RoomCount>
                    <PriceRange>
                      {getPriceRange(property.rooms)}
                    </PriceRange>
                  </PropertyFooter>
                </PropertyContent>
              </PropertyCard>
            </Link>
          ))}
        </PropertiesGrid>
      )}
    </PropertiesContainer>
  );
};

export default Properties;
