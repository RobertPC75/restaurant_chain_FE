import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";

const CartOffcanvas = ({ show, handleClose }) => {
  const { isLoaded, userId } = useAuth();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
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

  useEffect(() => {
    const fetchCartItems = async () => {
      if (orders.length > 0) {
        const orderIdInCola = orders.find(order => order.order_status === 'En cola');

        if (orderIdInCola) {
          try {
            const response = await axios.get(`https://restaurant-chain-api.onrender.com/orders/${orderIdInCola.order_id}/details`);
            const itemDetails = response.data;

            // Fetch item details including prices using the menu API
            const itemDetailsPromises = itemDetails.map(async item => {
              const itemResponse = await axios.get(`https://restaurant-chain-api.onrender.com/menu/${item.item_id}`);
              return {
                ...item,
                itemName: itemResponse.data.name,
                itemPrice: itemResponse.data.price,
              };
            });

            // Wait for all item details to be fetched
            const itemsWithDetails = await Promise.all(itemDetailsPromises);

            setCartItems(itemsWithDetails);
          } catch (error) {
            console.error('Error fetching cart items:', error);
          }
        }
      }
    };

    fetchCartItems();
  }, [orders]);

  useEffect(() => {
    // Calculate total price when cart items change
    const calculatedTotalPrice = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (orders.length > 0) {
      const orderIdInCola = orders.find(order => order.order_status === 'En cola');

      if (orderIdInCola) {
        try {
          // Change the order status to "En proceso"
          await axios.put(`https://restaurant-chain-api.onrender.com/orders/${orderIdInCola.order_id}/change_status`);

          // Reload the page
          window.location.reload();
        } catch (error) {
          console.error('Error checking out:', error);
          setShowAlert(true);
          setAlertMessage('Failed to process the checkout. Please try again.');
        }
      }
    }
  };

  const handleDeleteOrder = async () => {
    if (orders.length > 0) {
      const orderIdInCola = orders.find(order => order.order_status === 'En cola');

      if (orderIdInCola) {
        try {
          // Delete the order
          await axios.delete(`https://restaurant-chain-api.onrender.com/orders/${orderIdInCola.order_id}/delete`);

          // Reload the page
          window.location.reload();
        } catch (error) {
          console.error('Error deleting order:', error);
          setShowAlert(true);
          setAlertMessage('Failed to delete the order. Please try again.');
        }
      }
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.detail_id}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.itemPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items in the cart.</p>
        )}

        {/* Total Price */}
        <p>Total Price: ${totalPrice.toFixed(2)}</p>

        {/* Checkout Button */}
        <button className="btn btn-primary" onClick={handleCheckout}>
          Check out
        </button>

        {/* Delete Order Button */}
        <button className="btn btn-danger" onClick={handleDeleteOrder}>
          Delete Order
        </button>

        {/* Alert for checkout failure */}
        {showAlert && (
          <div className="alert alert-danger mt-3" role="alert">
            {alertMessage}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
