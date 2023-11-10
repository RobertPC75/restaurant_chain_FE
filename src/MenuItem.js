import React, { useState } from 'react';
import EditForm from './EditForm';
import axios from 'axios';

const MenuItem = ({ item, onEditClick, onDeleteClick }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    onEditClick(); // Call the parent component's edit click handler
  };

  const handleEditFormClose = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    axios.delete(`https://restaurant-chain-api.onrender.com/menu/${item.menu_id}/delete`)
      .then(response => {
        console.log(response.data.message);
        onDeleteClick(item.menu_id); // Notify the parent component about the deletion
      })
      .catch(error => {
        console.error('Error deleting menu item:', error);
      });
  };

  return (
    <div className="card h-100">
      <img
        src={item.image_url || 'https://via.placeholder.com/150x100'}
        className="card-img-top"
        alt={item.name ? `Image of ${item.name}` : 'Placeholder Image'}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">Price: ${item.price}</p>
        <div className="mt-auto">
          {isEditing ? (
            <EditForm item={item} onClose={handleEditFormClose} />
          ) : (
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
              <button className="btn btn-danger" onClick={handleDeleteClick} style={{ marginLeft: '5px' }}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;