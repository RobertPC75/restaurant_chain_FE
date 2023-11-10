import React, { useState } from 'react';
import axios from 'axios';

const AddPlateForm = ({ onPlateAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddPlate = async () => {
    console.log('Adding plate with data:', { nombre: name, precio: Number(price) });
  
    try {
      const response = await axios.post('https://restaurant-chain-api.onrender.com/menu/add', null, {
        params: {
          nombre: name,
          precio: Number(price),
        },
      });
  
      const successMessage = response.data.message;
      console.log(successMessage);
      alert(successMessage); // Display success message
  
      onPlateAdded(); // Notify parent component about the new plate
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error adding plate:', error);
      console.log(error.response.data); // Log the detailed error response
    }
  };  
  
  return (
    <div>
      <h3>Add Plate</h3>
      <div className="mb-3">
        <label htmlFor="plateName" className="form-label">Plate Name</label>
        <input
          type="text"
          className="form-control"
          id="plateName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="platePrice" className="form-label">Plate Price</label>
        <input
          type="number"
          className="form-control"
          id="platePrice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddPlate}>Add Plate</button>
    </div>
  );
};

export default AddPlateForm;
