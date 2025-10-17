import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { bookingAPI, roomAPI } from '../services/api';

const PaymentContainer = styled.div`
  min-height: calc(100vh - 160px);
  background: linear-gradient(135deg, var(--praise-warm) 0%, var(--praise-cream) 100%);
  padding: 2rem;
`;

const PaymentContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const BookingSummaryCard = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--praise-light);
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1);
  height: fit-content;
`;

const PaymentCard = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--praise-light);
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--praise-light);

  &:last-child {
    border-bottom: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding-top: 1rem;
    margin-top: 0.5rem;
    border-top: 2px solid var(--praise-amber);
  }
`;

const SummaryLabel = styled.span`
  color: var(--text-secondary);
`;

const SummaryValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;

  &.total {
    background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
`;

const RoomImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;

const RoomInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const RoomName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const RoomDetails = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const PaymentMethods = styled.div`
  margin-bottom: 2rem;
`;

const PaymentMethodItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${props => props.selected ? 'var(--praise-amber)' : 'var(--praise-light)'};
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'var(--praise-light)' : 'transparent'};

  &:hover {
    border-color: var(--praise-amber);
    background: var(--praise-light);
  }
`;

const PaymentMethodIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 1rem;
`;

const PaymentMethodInfo = styled.div`
  flex: 1;
`;

const PaymentMethodName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
`;

const PaymentMethodDesc = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const PayButton = styled.button`
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(217, 119, 6, 0.15);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--praise-orange) 0%, var(--praise-deep) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(217, 119, 6, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--praise-light);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();
  
  const [booking, setBooking] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');

  // Get booking data from location state or fetch from API
  useEffect(() => {
    const initializePayment = async () => {
      try {
        setLoading(true);
        
        // Get booking data from navigation state or fetch from API
        let bookingData = location.state?.booking;
        
        if (!bookingData && bookingId) {
          // Fetch booking from API if not in state
          const response = await bookingAPI.getById(bookingId);
          bookingData = response.data.booking;
        }
        
        if (!bookingData) {
          toast.error('Booking information not found');
          navigate('/dashboard');
          return;
        }
        
        setBooking(bookingData);
        
        // Fetch room details
        const roomResponse = await roomAPI.getById(bookingData.room);
        setRoom(roomResponse.data.room);
        
      } catch (error) {
        console.error('Error initializing payment:', error);
        toast.error('Failed to load booking information');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [bookingId, location.state, navigate]);

  const handlePayment = async () => {
    if (!booking || !user) return;

    setPaymentLoading(true);

    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Create Razorpay order
      const orderResponse = await bookingAPI.createPaymentOrder(booking._id);
      const { order, key } = orderResponse.data;

      const options = {
        key: key, // Razorpay key from backend
        amount: order.amount,
        currency: order.currency,
        name: 'Z&T World Homes',
        description: `Booking for ${room?.name}`,
        order_id: order.id,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || ''
        },
        theme: {
          color: '#d97706' // Praise theme primary color
        },
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await bookingAPI.verifyPayment({
              bookingId: booking._id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Your booking is confirmed.');
              navigate('/dashboard', { 
                state: { 
                  bookingConfirmed: true,
                  bookingId: booking._id 
                }
              });
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            setPaymentLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      setPaymentLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!booking) return 0;
    
    const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));
    const subtotal = booking.totalAmount;
    const taxes = subtotal * 0.18; // 18% GST
    const serviceFee = subtotal * 0.05; // 5% service fee
    
    return {
      nights,
      subtotal,
      taxes,
      serviceFee,
      total: subtotal + taxes + serviceFee
    };
  };

  if (loading) {
    return (
      <PaymentContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <LoadingSpinner style={{ margin: '0 auto 1rem', width: '40px', height: '40px', borderWidth: '3px' }} />
          <p>Loading payment information...</p>
        </div>
      </PaymentContainer>
    );
  }

  if (!booking || !room) {
    return (
      <PaymentContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Booking information not found.</p>
        </div>
      </PaymentContainer>
    );
  }

  const totals = calculateTotal();

  return (
    <PaymentContainer>
      <PaymentContent>
        <PaymentCard>
          <CardTitle>Complete Your Payment</CardTitle>
          
          <PaymentMethods>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Payment Method</h3>
            
            <PaymentMethodItem 
              selected={selectedPaymentMethod === 'razorpay'}
              onClick={() => setSelectedPaymentMethod('razorpay')}
            >
              <PaymentMethodIcon>₹</PaymentMethodIcon>
              <PaymentMethodInfo>
                <PaymentMethodName>Razorpay</PaymentMethodName>
                <PaymentMethodDesc>Credit Card, Debit Card, Net Banking, UPI, Wallets</PaymentMethodDesc>
              </PaymentMethodInfo>
            </PaymentMethodItem>
          </PaymentMethods>

          <PayButton 
            onClick={handlePayment}
            disabled={paymentLoading || !selectedPaymentMethod}
          >
            {paymentLoading && <LoadingSpinner />}
            Pay ₹{totals.total.toLocaleString('en-IN')}
          </PayButton>

          <SecurityBadge>
            🔒 Your payment information is secure and encrypted
          </SecurityBadge>
        </PaymentCard>

        <BookingSummaryCard>
          <CardTitle>Booking Summary</CardTitle>
          
          {room.images && room.images[0] && (
            <RoomImage src={room.images[0]} alt={room.name} />
          )}
          
          <RoomInfo>
            <RoomName>{room.name}</RoomName>
            <RoomDetails>📍 {room.property?.location?.city}, {room.property?.location?.state}</RoomDetails>
            <RoomDetails>🛏️ {room.type} • {room.capacity} guests</RoomDetails>
          </RoomInfo>

          <SummaryItem>
            <SummaryLabel>Check-in</SummaryLabel>
            <SummaryValue>{new Date(booking.checkIn).toLocaleDateString()}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Check-out</SummaryLabel>
            <SummaryValue>{new Date(booking.checkOut).toLocaleDateString()}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Guests</SummaryLabel>
            <SummaryValue>{booking.guests}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Nights ({totals.nights})</SummaryLabel>
            <SummaryValue>₹{totals.subtotal.toLocaleString('en-IN')}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Service Fee (5%)</SummaryLabel>
            <SummaryValue>₹{totals.serviceFee.toLocaleString('en-IN')}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Taxes & Fees (18%)</SummaryLabel>
            <SummaryValue>₹{totals.taxes.toLocaleString('en-IN')}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Total</SummaryLabel>
            <SummaryValue className="total">₹{totals.total.toLocaleString('en-IN')}</SummaryValue>
          </SummaryItem>
        </BookingSummaryCard>
      </PaymentContent>
    </PaymentContainer>
  );
};

export default Payment;