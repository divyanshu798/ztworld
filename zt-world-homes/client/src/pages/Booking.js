import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { roomAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BookingForm = styled.form`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--gray-800);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
`;

const RoomInfo = styled.div`
  background: var(--gray-50);
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
`;

const RoomName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--gray-800);
`;

const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const DetailItem = styled.div`
  font-size: 0.9rem;
  color: var(--gray-600);
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--gray-700);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const DatePickerContainer = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--gray-300);
    border-radius: 0.5rem;
    font-size: 1rem;
  }
`;

const BookingSummary = styled.div`
  background: var(--primary-color);
  color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
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

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--red-600);
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Booking = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    checkInDate: null,
    checkOutDate: null,
    guests: 1,
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: '',
    specialRequests: ''
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }
    fetchRoomData();
  }, [roomId, user, navigate]);

  const fetchRoomData = async () => {
    try {
      setLoading(true);
      const response = await roomAPI.getById(roomId);
      setRoom(response.data.room);
    } catch (err) {
      setError('Failed to load room details');
      console.error('Error fetching room:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const calculateTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !room) return 0;
    
    const timeDiff = formData.checkOutDate.getTime() - formData.checkInDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return dayDiff * room.pricePerNight;
  };

  const getDayCount = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    
    const timeDiff = formData.checkOutDate.getTime() - formData.checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.checkInDate || !formData.checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    
    if (formData.checkInDate >= formData.checkOutDate) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    
    if (formData.guests > room.capacity) {
      toast.error(`Maximum capacity for this room is ${room.capacity} guests`);
      return;
    }

    try {
      setSubmitting(true);
      
      const bookingData = {
        room: roomId,
        property: room?.property?._id || room?.property || '',
        checkInDate: formData.checkInDate.toISOString(),
        checkOutDate: formData.checkOutDate.toISOString(),
        guests: parseInt(formData.guests),
        guestDetails: {
          name: formData.guestName,
          email: formData.guestEmail,
          phone: formData.guestPhone
        },
        specialRequests: formData.specialRequests,
        totalAmount: calculateTotal()
      };

      const response = await bookingAPI.create(bookingData);
      const createdBooking = response.data.booking;
      
      toast.success('Booking created successfully! Please complete your payment.');
      
      // Navigate to payment page with booking data
      navigate(`/payment/${createdBooking._id}`, {
        state: { booking: createdBooking }
      });
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create booking');
      console.error('Error creating booking:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <BookingContainer>
        <LoadingContainer>
          <p>Loading room details...</p>
        </LoadingContainer>
      </BookingContainer>
    );
  }

  if (error || !room) {
    return (
      <BookingContainer>
        <ErrorContainer>
          <h3>Error Loading Room</h3>
          <p>{error || 'Room not found'}</p>
          <button onClick={() => navigate('/properties')}>
            Back to Properties
          </button>
        </ErrorContainer>
      </BookingContainer>
    );
  }

  return (
    <BookingContainer>
      <h1>Book Your Stay</h1>
      
      <BookingForm onSubmit={handleSubmit}>
        <RoomInfo>
          <RoomName>{room.name}</RoomName>
          <RoomDetails>
            <DetailItem><strong>Type:</strong> {room.type}</DetailItem>
            <DetailItem><strong>Capacity:</strong> {room.capacity} guests</DetailItem>
            <DetailItem><strong>Price:</strong> ₹{room.pricePerNight?.toLocaleString()}/night</DetailItem>
          </RoomDetails>
        </RoomInfo>

        <FormSection>
          <SectionTitle>Stay Details</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Check-in Date</Label>
              <DatePickerContainer>
                <DatePicker
                  selected={formData.checkInDate}
                  onChange={(date) => handleDateChange(date, 'checkInDate')}
                  minDate={new Date()}
                  placeholderText="Select check-in date"
                  dateFormat="MMM dd, yyyy"
                />
              </DatePickerContainer>
            </FormGroup>
            
            <FormGroup>
              <Label>Check-out Date</Label>
              <DatePickerContainer>
                <DatePicker
                  selected={formData.checkOutDate}
                  onChange={(date) => handleDateChange(date, 'checkOutDate')}
                  minDate={formData.checkInDate || new Date()}
                  placeholderText="Select check-out date"
                  dateFormat="MMM dd, yyyy"
                />
              </DatePickerContainer>
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>Number of Guests</Label>
            <Input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              max={room.capacity}
              required
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Guest Information</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="guestEmail"
                value={formData.guestEmail}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="guestPhone"
              value={formData.guestPhone}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Special Requests (Optional)</Label>
            <TextArea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              placeholder="Any special requests or preferences..."
            />
          </FormGroup>
        </FormSection>

        {formData.checkInDate && formData.checkOutDate && (
          <BookingSummary>
            <h3 style={{ marginBottom: '1rem' }}>Booking Summary</h3>
            <SummaryRow>
              <span>Room Rate (₹{room.pricePerNight?.toLocaleString()}/night)</span>
              <span>₹{room.pricePerNight?.toLocaleString()}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Number of Nights</span>
              <span>{getDayCount()}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total Amount</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </SummaryRow>
          </BookingSummary>
        )}

        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? 'Creating Booking...' : 'Confirm Booking'}
        </SubmitButton>
      </BookingForm>
    </BookingContainer>
  );
};

export default Booking;
