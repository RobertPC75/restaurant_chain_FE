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

  const addNewClient = async (name, clerkId) => {
    try {
      const response = await axios.post('https://restaurant-chain-api.onrender.com/clients/add', null, {
        params: {
        name: name,
        clerkid: clerkId,
        },
      });
  
      console.log('New client added:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 422 && error.response.data.detail) {
        const validationErrors = error.response.data.detail;
        console.error('Validation Error:', validationErrors);
      } else {
        console.error('Error adding new client:', error.response);
      }
    }
  };
  

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
      if (error.response && error.response.status === 404) {
        console.log('Clerk ID not found. Adding the client...');
        await addNewClient(user.firstName, clerkId);
        // Retry fetching client data after adding the client
        await fetchClientData(clerkId);
      } else {
        console.error('Error fetching client data:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isSignedIn && userId) {
        await fetchClientData(userId);
      }
    };
  
    fetchData();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
      // Show a success pop-up
      window.alert('Changes were successful!');
    } catch (error) {
      console.error('Error editing client data:', error.response);
      console.error('Request payload:', error.config.data);
  
      // You might want to handle errors differently, e.g., show an error pop-up
      window.alert('Error editing client data. Please try again.');
    }
  };
  

  return (
    <Card className="mb-3" style={{ maxWidth: '200px', padding: '10px', wordBreak: 'break-all' }}>
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
                  <Button variant="primary" className="mt-3" onClick={handleEdit}>
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