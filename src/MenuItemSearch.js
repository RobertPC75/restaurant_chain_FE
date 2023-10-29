// MenuItemSearch.js
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

  console.log(itemDetails); // Add this line

  if (!itemDetails) {
    return <p>Item data is not available</p>;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{itemDetails.name}</h5>
          <p className="card-text">Price: ${itemDetails.price}</p>
          {/* Add any other details you want to display */}
        </div>
      </div>
    </div>
  );
};

export default MenuItemSearch;
