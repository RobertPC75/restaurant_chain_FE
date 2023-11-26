// OrderDetails.js

import React, { useState, useEffect } from 'react';
import MenuItemSearch from './MenuItemSearch';
import AddDishForm from './AddDishForm';

const OrderDetails = ({ orderId }) => {
  const [details, setDetails] = useState([]);
  const [showAddDishForm, setShowAddDishForm] = useState(false);

  useEffect(() => {
    // Código existente para obtener detalles de la orden
    fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/details`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error(`Error fetching details for order ${orderId}:`, error));
  }, [orderId]);

  const handleRemoveItem = async (detailId) => {
    // Código existente para manejar la eliminación de un ítem
  };

  const handleShowAddDishForm = () => {
    setShowAddDishForm(true);
  };

  const handleHideAddDishForm = () => {
    setShowAddDishForm(false);
  };

  const updateOrderDetails = async () => {
    // Lógica para actualizar los detalles de la orden
    try {
      const response = await fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/details`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error updating order details:', error);
    }
  };

  return (
    <div className="border p-3 mt-3">
      <h4>Order Details:</h4>
      {details.length > 0 ? (
        <div>
          <button className="btn btn-primary mb-3" onClick={handleShowAddDishForm}>
            Agregar Plato
          </button>

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

          {showAddDishForm && (
            <AddDishForm orderId={orderId} onHideForm={handleHideAddDishForm} updateOrderDetails={updateOrderDetails} />
          )}
        </div>
      ) : (
        <p>No hay elementos para esta orden.</p>
      )}
    </div>
  );
};

export default OrderDetails;
