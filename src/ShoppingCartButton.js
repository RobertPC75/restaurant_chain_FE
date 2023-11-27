// ShoppingCartButton.js
import React, { useEffect, useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import { Modal, Button } from 'react-bootstrap';

const ShoppingCartButton = ({ item }) => {
  const { isLoaded, userId } = useAuth();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Fetch the user's clerk_id
    const fetchClerkId = async () => {
      try {
        const response = await axios.get(`https://restaurant-chain-api.onrender.com/clients/by_clerk/${userId}`);
        setCustomerDetails(response.data);
      } catch (error) {
        console.error('Error fetching clerk_id:', error);
      }
    };

    if (isLoaded) {
      fetchClerkId();
    }
  }, [isLoaded, userId]);

  useEffect(() => {
    // Fetch orders by customer_id
    const fetchOrders = async () => {
      if (customerDetails) {
        try {
          const response = await axios.get(`https://restaurant-chain-api.onrender.com/orders/by_customer/${customerDetails.id}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [customerDetails]);

  const handleAddToCartClick = async () => {
    // Check if there is an order with order_status: "En cola"
    const enColaOrder = orders.find(order => order.order_status === "En cola");

    if (enColaOrder) {
      // If such an order exists, add the item to the existing order
      try {
        await axios.post(
          `https://restaurant-chain-api.onrender.com/orders/${enColaOrder.order_id}/add_items`,
          null,
          {
            params: {
              item_id: item.menu_id,
              quantity: 1,
            },
          }
        );
        setAlertMessage('Item added to existing order successfully');
        setShowAlert(true);
      } catch (error) {
        console.error('Error adding item to existing order:', error);
        setAlertMessage('Error adding item to existing order. Please try again.');
        setShowAlert(true);
      }
    } else {
      // If there is no order with order_status: "En cola", create a new order and add the item
      try {
        const orderResponse = await axios.post(
          'https://restaurant-chain-api.onrender.com/orders/add',
          null,
          {
            params: {
              customer_id: customerDetails.id,
            },
          }
        );
        const newOrderId = orderResponse.data.result.order_id;

        await axios.post(
          `https://restaurant-chain-api.onrender.com/orders/${newOrderId}/add_items`,
          null,
          {
            params: {
              item_id: item.menu_id,
              quantity: 1,
            },
          }
        );
        setAlertMessage('Item added to new order successfully');
        setShowAlert(true);
      } catch (error) {
        console.error('Error adding item to new order:', error);
        setAlertMessage('Error adding item to new order. Please try again.');
        setShowAlert(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <button className="btn btn-outline-primary" onClick={handleAddToCartClick}>
        <BsCartPlus size={20} />
        {' '}
        Add to Cart
      </button>

      <Modal show={showAlert} onHide={handleCloseAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseAlert}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartButton;