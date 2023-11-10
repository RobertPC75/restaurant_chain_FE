import React, { useState, useEffect } from 'react';

const MenuItemSearch = ({ itemId }) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    // Check if itemId is defined before making the API request
    if (itemId) {
      // Fetch item details for a specific item
      fetch(`https://restaurant-chain-api.onrender.com/menu/${itemId}`)
        .then((response) => response.json())
        .then((data) => setItemDetails(data))
        .catch((error) => console.error(`Error fetching details for item ${itemId}:`, error));
    }
  }, [itemId]);

  console.log(itemDetails);

  if (!itemDetails || itemDetails.status === 'Entregado') {
    return null; // If item status is 'Entregado', don't render
  }

  return (
    <div>
      <h5>{itemDetails.name}</h5>
      <p>Price: ${itemDetails.price}</p>
      {/* Add any other details you want to display */}
    </div>
  );
};

export default MenuItemSearch;
