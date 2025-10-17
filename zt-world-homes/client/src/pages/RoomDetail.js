import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { roomAPI } from '../services/api';
import { toast } from 'react-toastify';

const RoomContainer = styled.div`
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, var(--praise-warm) 0%, var(--praise-cream) 100%);
  padding: 2rem;
`;

const RoomContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--praise-light);
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1);
`;

const RoomTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RoomDetails = styled.div`
  h3 {
    color: var(--praise-orange);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const BookingCard = styled.div`
  background: var(--praise-light);
  padding: 2rem;
  border-radius: 1rem;
  height: fit-content;
  border: 1px solid var(--praise-amber);
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--praise-orange);
  margin-bottom: 1rem;
`;

const BookButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, var(--praise-orange) 0%, var(--praise-deep) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(217, 119, 6, 0.25);
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem;
`;

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomAPI.getById(id);
        setRoom(response.data.room);
      } catch (error) {
        console.error('Error fetching room:', error);
        toast.error('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <RoomContainer>
        <LoadingContainer>
          <p>Loading room details...</p>
        </LoadingContainer>
      </RoomContainer>
    );
  }

  if (!room) {
    return (
      <RoomContainer>
        <RoomContent>
          <h1>Room not found</h1>
          <p>The room you're looking for doesn't exist.</p>
        </RoomContent>
      </RoomContainer>
    );
  }

  return (
    <RoomContainer>
      <RoomContent>
        <RoomTitle>{room.name}</RoomTitle>
        
        <RoomInfo>
          <RoomDetails>
            <h3>Room Details</h3>
            <p><strong>Type:</strong> {room.type}</p>
            <p><strong>Capacity:</strong> {room.capacity} guests</p>
            
            {room.description && (
              <>
                <h3>Description</h3>
                <p>{room.description}</p>
              </>
            )}
            
            {room.amenities && room.amenities.length > 0 && (
              <>
                <h3>Amenities</h3>
                <ul>
                  {room.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </>
            )}
          </RoomDetails>
          
          <BookingCard>
            <Price>₹{room.pricePerNight?.toLocaleString()}/night</Price>
            <BookButton onClick={handleBooking}>
              Book This Room
            </BookButton>
          </BookingCard>
        </RoomInfo>
      </RoomContent>
    </RoomContainer>
  );
};

export default RoomDetail;
