// Orders.js
import React, { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';
import OrderSidebar from './OrderSidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    // Fetch list of all orders
    fetch('https://restaurant-chain-api.onrender.com/orders/all_info')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleToggleShowAllOrders = () => {
    setShowAllOrders((prevShowAllOrders) => !prevShowAllOrders);
  };

  const updateOrderList = async () => {
    try {
      const response = await fetch('https://restaurant-chain-api.onrender.com/orders/all_info');
      if (response.ok) {
        const updatedOrders = await response.json();
        setOrders(updatedOrders);
      } else {
        console.error('Error fetching updated orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching updated orders:', error);
    }
  };

  const filteredOrders = showAllOrders
    ? orders
    : orders.filter((order) => order.order_status === 'En proceso' || order.order_status === 'Entregado');

  return (
    <div className="orders-container">
      <OrderSidebar
        orders={filteredOrders}
        selectedOrderId={selectedOrderId}
        onOrderClick={handleOrderClick}
        showAllOrders={showAllOrders}
        onToggleShowAllOrders={handleToggleShowAllOrders}
      />
      <div className="order-details-container">
        <h2>Orders</h2>
        {selectedOrderId ? (
          <OrderDetails orderId={selectedOrderId} updateOrderList={updateOrderList} />
        ) : (
          <p>Select an order from the list on the left to view details.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
