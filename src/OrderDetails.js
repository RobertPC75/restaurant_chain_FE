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

  const handleRemoveItem = async (detailId) => {
    // Ask for confirmation before removing the item
    const confirmRemove = window.confirm('Are you sure you want to remove this item from the order?');

    if (!confirmRemove) {
      return; // Do nothing if the user cancels the confirmation
    }

    try {
      const response = await fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/remove_item/${detailId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the details after successful removal
        const updatedDetails = details.filter((detail) => detail.detail_id !== detailId);
        setDetails(updatedDetails);
      } else {
        console.error('Failed to remove item from order.');
      }
    } catch (error) {
      console.error('Error removing item from order:', error);
    }
  };

  return (
    <div className="border p-3 mt-3">
      <h4>Order Details:</h4>
      {details.length > 0 ? (
        <ul className="list-group">
          {details.map((detail) => (
            <li key={detail.detail_id} className="list-group-item d-flex justify-content-between align-items-center">
              <MenuItemSearch itemId={detail.item_id} />
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveItem(detail.detail_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items for this order.</p>
      )}
    </div>
  );
};

export default OrderDetails;
