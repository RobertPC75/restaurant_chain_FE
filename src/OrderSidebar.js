//OrderSidebar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderSidebar = ({ selectedOrderId, onOrderClick, showAllOrders, onToggleShowAllOrders }) => {
  const [newOrderId, setNewOrderId] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch list of all orders
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://restaurant-chain-api.onrender.com/orders/all_info');
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrder = async () => {
    try {
      if (newOrderId.trim() === '') {
        alert('Please enter a valid customer ID.');
        return;
      }

      const response = await axios.post(`https://restaurant-chain-api.onrender.com/orders/add?customer_id=${newOrderId}`);

      if (response.status === 200) {
        // Change the status of the newly created order
        const newOrder = response.data.result;
        await axios.put(`https://restaurant-chain-api.onrender.com/orders/${newOrder.order_id}/change_status`, {}, { headers: { 'Content-Type': 'application/json' } });

        // Fetch the updated list of orders
        fetchOrders();

        alert('Order added successfully!');
        setNewOrderId(''); // Clear the input field
      } else {
        alert('Failed to add a new order.');
      }
    } catch (error) {
      console.error('Error adding a new order:', error);
    }
  };

  const sortOrders = (orderList) => {
    return orderList.sort((a, b) => {
      if (a.order_status === 'Entregado' && b.order_status !== 'Entregado') {
        return -1;
      } else if (a.order_status !== 'Entregado' && b.order_status === 'Entregado') {
        return 1;
      } else {
        return a.order_id - b.order_id;
      }
    });
  };

  const filteredOrders = showAllOrders
    ? sortOrders(orders.filter(order => order.order_status === 'En proceso' || order.order_status === 'Entregado'))
    : sortOrders(orders.filter(order => order.order_status === 'En proceso'));

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
        {filteredOrders.map((order) => (
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
