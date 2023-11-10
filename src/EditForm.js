import React, { useState } from 'react';
import axios from 'axios';

const EditForm = ({ item, onClose }) => {
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);

  const handleEdit = () => {
    axios.put(`https://restaurant-chain-api.onrender.com/menu/${item.menu_id}/edit`, null, {
      params: {
        nombre: editedName,
        precio: editedPrice,
      }
    })
    .then(response => {
      const successMessage = response.data.message;
      console.log(successMessage);
      alert(successMessage);
      onClose();
      // Reload the page
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating menu item:', error);
      console.log(error.response.data);
    });
  };

  return (
    <div className="edit-form">
      <form>
        <div className="mb-3">
          <label htmlFor="editedName" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="editedName"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editedPrice" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="editedPrice"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleEdit}>Confirm Changes</button>
      </form>
    </div>
  );
};

export default EditForm;
