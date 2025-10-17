import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { propertyAPI, roomAPI } from '../services/api';

const PropertyDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PropertyHeader = styled.div`
  margin-bottom: 2rem;
`;

const PropertyTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--gray-800);
`;

const PropertyLocation = styled.p`
  font-size: 1.1rem;
  color: var(--gray-600);
  margin-bottom: 1rem;
`;

const PropertyImages = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  gap: 1rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 200px);
  }
`;

const MainImage = styled.img`
  grid-row: 1 / 3;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    grid-row: 1;
  }
`;

const SideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PropertyContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PropertyInfo = styled.div``;

const PropertyDescription = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--gray-800);
`;

const Description = styled.p`
  line-height: 1.6;
  color: var(--gray-700);
`;

const AmenitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: var(--gray-50);
  border-radius: 0.5rem;
  font-size: 0.9rem;
`;

const BookingCard = styled.div`
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const RoomsSection = styled.div`
  margin-top: 3rem;
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const RoomCard = styled.div`
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RoomContent = styled.div`
  padding: 1.5rem;
`;

const RoomName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--gray-800);
`;

const RoomType = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const RoomPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const BookButton = styled.button`
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--red-600);
`;

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const propertyResponse = await propertyAPI.getById(id);
      
      // Extract property from the response (backend returns { property: {...} })
      const propertyData = propertyResponse.data.property || propertyResponse.data;
      setProperty(propertyData);
      
      // If rooms are populated as objects, use them
      if (propertyData.rooms && propertyData.rooms.length > 0 && typeof propertyData.rooms[0] === 'object') {
        setRooms(propertyData.rooms);
      } else {
        // Otherwise, fetch rooms separately
        try {
          const roomsResponse = await roomAPI.getByProperty(id);
          setRooms(roomsResponse.data.rooms || []);
        } catch (roomErr) {
          console.error('Error fetching rooms:', roomErr);
          setRooms([]);
        }
      }
    } catch (err) {
      setError('Failed to load property details');
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (roomId) => {
    navigate(`/booking/${roomId}`);
  };

  if (loading) {
    return (
      <PropertyDetailContainer>
        <LoadingContainer>
          <p>Loading property details...</p>
        </LoadingContainer>
      </PropertyDetailContainer>
    );
  }

  if (error || !property) {
    return (
      <PropertyDetailContainer>
        <ErrorContainer>
          <h3>Error Loading Property</h3>
          <p>{error || 'Property not found'}</p>
          <button onClick={() => navigate('/properties')} style={{
            padding: '0.5rem 1rem',
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            Back to Properties
          </button>
        </ErrorContainer>
      </PropertyDetailContainer>
    );
  }

  // Only render the full component when we have property data
  if (!property || !property.location) {
    return (
      <PropertyDetailContainer>
        <LoadingContainer>
          <p>Loading property details...</p>
        </LoadingContainer>
      </PropertyDetailContainer>
    );
  }

  return (
    <PropertyDetailContainer>
      <PropertyHeader>
        <PropertyTitle>{property.name}</PropertyTitle>
        <PropertyLocation>
          📍 {property.location.address}, {property.location.city}, {property.location.state}
        </PropertyLocation>
      </PropertyHeader>

      <PropertyImages>
        <MainImage
          src={property.photos?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
          alt={property.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
          }}
        />
        {property.photos?.slice(1, 5).map((photo, index) => (
          <SideImage
            key={index}
            src={photo}
            alt={`${property.name} ${index + 2}`}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
            }}
          />
        ))}
      </PropertyImages>

      <PropertyContent>
        <PropertyInfo>
          <PropertyDescription>
            <SectionTitle>About this property</SectionTitle>
            <Description>{property.description}</Description>
          </PropertyDescription>

          <div>
            <SectionTitle>Amenities</SectionTitle>
            <AmenitiesList>
              {property.amenities?.map((amenity, index) => (
                <AmenityItem key={index}>
                  ✓ {amenity}
                </AmenityItem>
              ))}
            </AmenitiesList>
          </div>
        </PropertyInfo>

        <BookingCard>
          <SectionTitle>Quick Booking</SectionTitle>
          <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
            Choose from our available rooms below to book your stay.
          </p>
        </BookingCard>
      </PropertyContent>

      <RoomsSection>
        <SectionTitle>Available Rooms ({rooms?.length || 0})</SectionTitle>
        {!rooms || rooms.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '2rem' }}>
            No rooms available for this property.
          </p>
        ) : (
          <RoomsGrid>
            {rooms.map((room) => (
              <RoomCard key={room._id}>
                <RoomImage
                  src={room.photos?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'}
                  alt={room.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800';
                  }}
                />
                <RoomContent>
                  <RoomName>{room.name}</RoomName>
                  <RoomType>{room.type}</RoomType>
                  <RoomPrice>₹{room.pricePerNight?.toLocaleString()}/night</RoomPrice>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Capacity: {room.capacity} guests
                  </p>
                  <BookButton onClick={() => handleBookRoom(room._id)}>
                    Book This Room
                  </BookButton>
                </RoomContent>
              </RoomCard>
            ))}
          </RoomsGrid>
        )}
      </RoomsSection>
    </PropertyDetailContainer>
  );
};

export default PropertyDetail;
