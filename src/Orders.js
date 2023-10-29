// Orders.js
import React, { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch list of orders
    fetch('https://restaurant-chain-api.onrender.com/orders/all_info')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
          <p>Status: {order.order_status}</p>
          <OrderDetails orderId={order.order_id} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Orders;
