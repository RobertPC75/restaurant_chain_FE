// AddDishForm.js

import React, { useState, useEffect } from 'react';

const AddDishForm = ({ orderId, onHideForm, updateOrderDetails }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Obtener la lista de platos desde la API
    fetch('https://restaurant-chain-api.onrender.com/menu/all_info')
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu items:', error));
  }, []);

  const handleAddDish = async () => {
    try {
      const itemId = parseInt(selectedMenuItem);

      if (isNaN(itemId)) {
        console.error('Invalid item ID');
        return;
      }

      const response = await fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/add_items?item_id=${itemId}&quantity=${quantity}`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Plato(s) agregado(s) con éxito!');
        onHideForm(); // Ocultar el formulario después de agregar el plato
        updateOrderDetails(); // Actualizar detalles de la orden
      } else {
        const errorData = await response.json();
        console.error('Error al agregar el plato a la orden:', errorData);
      }
    } catch (error) {
      console.error('Error adding dish to order:', error);
    }
  };

  return (
    <div className="border p-3 mt-3">
      <h4>Agregar Plato:</h4>
      <select
        value={selectedMenuItem}
        onChange={(e) => setSelectedMenuItem(e.target.value)}
      >
        <option value="" disabled>
          Seleccione un plato
        </option>
        {menuItems.map((menuItem) => (
          <option key={menuItem.menu_id} value={menuItem.menu_id}>
            {menuItem.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        placeholder="Cantidad"
        className="ml-2"
      />
      <button className="btn btn-success ml-2" onClick={handleAddDish}>
        Aceptar
      </button>
    </div>
  );
};

export default AddDishForm;
