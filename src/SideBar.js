import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

const SideBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId } = useAuth();
  const [clientData, setClientData] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    address: '',
    phone_number: '',
  });

  const fetchClientData = async (clerkId) => {
    try {
      console.log('Fetching client data for clerkId:', clerkId);
      const response = await axios.get(`https://restaurant-chain-api.onrender.com/clients/by_clerk/${clerkId}`);
      console.log('Client data response:', response.data);
      setClientData(response.data);
      setEditedData({
        name: response.data.name || '',
        address: response.data.address || '',
        phone_number: response.data.phone_number || '',
      });
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchClientData(userId);
    }
  }, [isSignedIn, userId]);

  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleEdit = async () => {
    try {
      // Fetch client ID based on clerk ID
      const response = await axios.get(`https://restaurant-chain-api.onrender.com/clients/by_clerk/${userId}`);
      const clientId = response.data.id;
  
      // Send request to edit client details using PUT method
      await axios.put(`https://restaurant-chain-api.onrender.com/clients/${clientId}/edit`, null, {
        params: editedData,  // Include editedData as query parameters
      });
  
      // Refresh client data
      fetchClientData(userId);
    } catch (error) {
      console.error('Error editing client data:', error.response);
      console.error('Request payload:', error.config.data);
    }
  };   

  return (
    <Card style={{ maxWidth: '200px', padding: '10px' }}>
      <Card.Body>
        {isLoaded && isSignedIn && (
          <>
            <Card.Title>Welcome, {user.firstName}!</Card.Title>
            {clientData ? (
              <>
                <Card.Subtitle className="mb-2 text-muted">Your details:</Card.Subtitle>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={editedData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      value={editedData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone number:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      value={editedData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleEdit}>
                    Change
                  </Button>
                </Form>
              </>
            ) : (
              <Card.Text>Loading client data...</Card.Text>
            )}
          </>
        )}
        {!isLoaded && <Card.Text>Loading...</Card.Text>}
        {!isSignedIn && <Card.Text>Sign in to view content</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default SideBar;
