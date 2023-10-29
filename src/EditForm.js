// EditForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditForm = ({ item, onClose }) => {
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);

  const handleEdit = () => {
    // Send a request to update the menu item
    axios.put(`https://restaurant-chain-api.onrender.com/menu/${item.menu_id}/edit`, null, {
      params: {
        nombre: editedName,
        precio: editedPrice,
      }
    })
    .then(response => {
      console.log(response.data.message);
      // Display success message and ask the user to refresh the page
      alert('Edit successful! Please refresh the page.');
      // Optionally, you can also refresh the page programmatically
      // window.location.reload();
      // Close the edit form
      onClose();
    })
    .catch(error => {
      console.error('Error updating menu item:', error);
      console.log(error.response.data); // Log the detailed error response
    });
  };

  return (
    <div className="edit-form">
      <label>Name:</label>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <label>Price:</label>
      <input
        type="number"
        value={editedPrice}
        onChange={(e) => setEditedPrice(e.target.value)}
      />
      <button onClick={handleEdit}>Confirm Changes</button>
    </div>
  );
};

export default EditForm;
