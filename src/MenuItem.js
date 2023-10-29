// MenuItem.js
import React from 'react';

const MenuItem = ({ item }) => {
  // Check if item is defined
  if (!item) {
    return <p>Item data is not available</p>;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Price: ${item.price}</p>
          {/* Add any other details you want to display */}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
