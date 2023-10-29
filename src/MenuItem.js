// MenuItem.js
import React, { useState } from 'react';
import EditForm from './EditForm';

const MenuItem = ({ item, onEditClick }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    onEditClick(); // Call the parent component's edit click handler
  };

  const handleEditFormClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Price: ${item.price}</p>
          {isEditing ? (
            <EditForm item={item} onClose={handleEditFormClose} />
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
