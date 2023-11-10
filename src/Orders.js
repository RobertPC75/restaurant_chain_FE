import React, { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showDelivered, setShowDelivered] = useState(false);

  useEffect(() => {
    // Fetch list of all orders
    fetch('https://restaurant-chain-api.onrender.com/orders/all_info')
      .then((response) => response.json())
      .then((data) => {
        // Filter orders based on showDelivered state
        const filteredOrders = showDelivered
          ? data
          : data.filter((order) => order.order_status !== 'Entregado');

        setOrders(filteredOrders);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  }, [showDelivered]);

  return (
    <div>
      <h2>Orders</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowDelivered(!showDelivered)}
      >
        {showDelivered ? 'Show Current' : 'Show History'}
      </button>
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
