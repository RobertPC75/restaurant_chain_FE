// OrderSidebar.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderSidebar = ({ orders, selectedOrderId, onOrderClick, showAllOrders, onToggleShowAllOrders }) => {
  const [newOrderId, setNewOrderId] = useState('');

  const handleAddOrder = async () => {
    try {
      if (newOrderId.trim() === '') {
        alert('Please enter a valid customer ID.');
        return;
      }

      const response = await axios.post(`https://restaurant-chain-api.onrender.com/orders/add?customer_id=${newOrderId}`);

      if (response.status === 200) {
        // Refresh the orders after successfully adding a new order
        // You may want to fetch the updated list of orders here
        alert('Order added successfully!');
        setNewOrderId(''); // Clear the input field
      } else {
        alert('Failed to add a new order.');
      }
    } catch (error) {
      console.error('Error adding a new order:', error);
    }
  };

  return (
    <div className="order-sidebar">
      <h3>Orders</h3>
      <button className="btn btn-primary mb-3" onClick={onToggleShowAllOrders}>
        {showAllOrders ? 'Show In Process' : 'Show All'}
      </button>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={newOrderId}
          onChange={(e) => setNewOrderId(e.target.value)}
          style={{ width: '90%' }}
        />
        <button className="btn btn-success ml-2" onClick={handleAddOrder}>
          Add Order
        </button>
      </div>
      <ul className="list-group">
        {orders.map((order) => (
          <li
            key={order.order_id}
            className={`list-group-item ${selectedOrderId === order.order_id ? 'active' : ''}`}
            onClick={() => onOrderClick(order.order_id)}
          >
            {`ID: ${order.order_id} - ${order.order_status}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSidebar;
