// OrderDetails.js
import React, { useState, useEffect } from 'react';
import MenuItemSearch from './MenuItemSearch';

const OrderDetails = ({ orderId }) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    // Fetch order details for a specific order
    fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/details`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error(`Error fetching details for order ${orderId}:`, error));
  }, [orderId]);

  console.log(details); // Add this line

  return (
    <div>
      <h4>Order Details:</h4>
      {details.length > 0 ? (
        details.map((detail) => (
          <MenuItemSearch key={detail.detail_id} itemId={detail.item_id} />
        ))
      ) : (
        <p>No items for this order.</p>
      )}
    </div>
  );
};

export default OrderDetails;