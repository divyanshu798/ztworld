import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { propertyAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminHeader = styled.div`
  background: linear-gradient(135deg, var(--secondary-color) 0%, #d97706 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const AdminText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--gray-200);
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--gray-600)'};
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'var(--primary-dark)' : 'var(--gray-100)'};
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--gray-800);
`;

const AddButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PropertyCard = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const PropertyInfo = styled.div`
  padding: 1rem;
`;

const PropertyName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--gray-800);
`;

const PropertyLocation = styled.p`
  color: var(--gray-600);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PropertyActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid ${props => props.variant === 'danger' ? 'var(--red-500)' : 'var(--primary-color)'};
  background: ${props => props.variant === 'danger' ? 'var(--red-500)' : 'var(--primary-color)'};
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'danger' ? 'var(--red-600)' : 'var(--primary-dark)'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--gray-700);
`;

const Input = styled.input`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  background: ${props => props.variant === 'secondary' ? 'var(--gray-300)' : 'var(--primary-color)'};
  color: ${props => props.variant === 'secondary' ? 'var(--gray-700)' : 'white'};

  &:hover {
    background: ${props => props.variant === 'secondary' ? 'var(--gray-400)' : 'var(--primary-dark)'};
  }
`;

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    photos: '',
    amenities: '',
    coordinates: { lat: 28.6139, lng: 77.209 }, // Default to Delhi
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchProperties();
    }
  }, [user]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAll();
      setProperties(response.data.properties || []);
    } catch (err) {
      toast.error('Failed to fetch properties');
      console.error('Error fetching properties:', err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('amenities', formData.amenities);
      // Add photo URLs from textarea (optional)
      if (formData.photos) {
        formData.photos.split('\n').forEach((url) => {
          if (url.trim()) formDataToSend.append('photoUrls', url.trim());
        });
      }
      // Add uploaded files
      if (formData.photoFiles && formData.photoFiles.length > 0) {
        for (let i = 0; i < formData.photoFiles.length && i < 30; i++) {
          formDataToSend.append('photos', formData.photoFiles[i]);
        }
      }
      if (editingProperty) {
        await propertyAPI.update(editingProperty._id, formDataToSend);
        toast.success('Property updated successfully!');
      } else {
        await propertyAPI.create(formDataToSend);
        toast.success('Property created successfully!');
      }
      setShowModal(false);
      setEditingProperty(null);
      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        pincode: '',
        photos: '',
        amenities: '',
        photoFiles: []
      });
      fetchProperties();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save property');
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyAPI.delete(propertyId);
        toast.success('Property deleted successfully!');
        fetchProperties();
      } catch (err) {
        toast.error('Failed to delete property');
        console.error('Error deleting property:', err);
      }
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      name: property.name || '',
      description: property.description || '',
      address: property.location?.address || '',
      city: property.location?.city || '',
      state: property.location?.state || '',
      country: property.location?.country || 'India',
      pincode: property.location?.pincode || '',
      photos: property.photos?.join('\n') || '',
      amenities: property.amenities?.join('\n') || '',
      coordinates: property.location?.coordinates || { lat: 28.6139, lng: 77.209 },
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
      photos: '',
      amenities: ''
    });
    setShowModal(true);
  };

  if (user?.role !== 'admin') {
    return (
      <AdminContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Admin Dashboard</AdminTitle>
        <AdminText>
          Manage properties, rooms, bookings, and view analytics.
        </AdminText>
      </AdminHeader>

      <TabContainer>
        <Tab 
          $active={activeTab === 'properties'} 
          onClick={() => setActiveTab('properties')}
        >
          Properties
        </Tab>
        <Tab 
          $active={activeTab === 'bookings'} 
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </Tab>
        <Tab 
          $active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </Tab>
      </TabContainer>

      {activeTab === 'properties' && (
        <ContentSection>
          <SectionHeader>
            <SectionTitle>Properties Management</SectionTitle>
            <AddButton onClick={openAddModal}>
              Add New Property
            </AddButton>
          </SectionHeader>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading properties...
            </div>
          ) : (
            <PropertyGrid>
              {properties.map((property) => (
                <PropertyCard key={property._id}>
                  <PropertyImage
                    src={property.photos?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                    alt={property.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
                    }}
                  />
                  <PropertyInfo>
                    <PropertyName>{property.name}</PropertyName>
                    <PropertyLocation>
                      📍 {property.location.city}, {property.location.state}
                    </PropertyLocation>
                    <PropertyActions>
                      <ActionButton onClick={() => handleEdit(property)}>
                        Edit
                      </ActionButton>
                      <ActionButton 
                        variant="danger" 
                        onClick={() => handleDelete(property._id)}
                      >
                        Delete
                      </ActionButton>
                    </PropertyActions>
                  </PropertyInfo>
                </PropertyCard>
              ))}
            </PropertyGrid>
          )}
        </ContentSection>
      )}

      {activeTab === 'bookings' && (
        <ContentSection>
          <SectionTitle>Bookings Management</SectionTitle>
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
            <h3>Bookings management coming soon...</h3>
            <p>View and manage all property bookings!</p>
          </div>
        </ContentSection>
      )}

      {activeTab === 'analytics' && (
        <ContentSection>
          <SectionTitle>Analytics & Reports</SectionTitle>
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
            <h3>Analytics dashboard coming soon...</h3>
            <p>View booking statistics, revenue reports, and more!</p>
          </div>
        </ContentSection>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
            <Form onSubmit={handleSubmit}>
              {/* Map Integration */}
              <FormGroup>
                <Label>Property Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Pincode</Label>
                  <Input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <Label>Photos (upload up to 30 images)</Label>
                <input
                  type="file"
                  name="photoFiles"
                  accept="image/*"
                  multiple
                  onChange={e => setFormData(prev => ({ ...prev, photoFiles: Array.from(e.target.files) }))}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {formData.photoFiles && formData.photoFiles.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ))}
                </div>
                <Label style={{ marginTop: '1rem' }}>Or add photo URLs (one per line)</Label>
                <TextArea
                  name="photos"
                  value={formData.photos}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo1.jpg\nhttps://example.com/photo2.jpg"
                />
              </FormGroup>

              <FormGroup>
                <Label>Amenities (one per line)</Label>
                <TextArea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder="Free WiFi&#10;Swimming Pool&#10;Parking"
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProperty ? 'Update' : 'Create'} Property
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;
