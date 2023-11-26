// OrderDetails.js
import React, { useState, useEffect } from 'react';
import MenuItemSearch from './MenuItemSearch';
import AddDishForm from './AddDishForm';


const OrderDetails = ({ orderId, updateOrderList }) => {
  const [details, setDetails] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [showAddDishForm, setShowAddDishForm] = useState(false);

  useEffect(() => {
    // Código existente para obtener detalles de la orden
    fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/details`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error(`Error fetching details for order ${orderId}:`, error));

    // Obtener información de todos los elementos del menú
    fetch('https://restaurant-chain-api.onrender.com/menu/all_info')
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu items:', error));
  }, [orderId]);

  const handleRemoveItem = async (detailId) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este detalle?');

    if (isConfirmed) {
      try {
        const response = await fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/remove_item/${detailId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Actualizar la lista de detalles después de la eliminación
          const updatedDetails = details.filter((detail) => detail.detail_id !== detailId);
          setDetails(updatedDetails);
        } else {
          const errorData = await response.json();
          console.error('Error removing item from order:', errorData);
        }
      } catch (error) {
        console.error('Error removing item from order:', error);
      }
    }
  };

  const handleChangeOrderStatus = async () => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas marcar este pedido como entregado?');

    if (isConfirmed) {
      try {
        const response = await fetch(`https://restaurant-chain-api.onrender.com/orders/${orderId}/change_status`, {
          method: 'PUT',
        });

        if (response.ok) {
          alert('Estado del pedido cambiado con éxito.');
          // Update the order list in the sidebar
          updateOrderList();
        } else {
          const errorData = await response.json();
          console.error('Error changing order status:', errorData);
        }
      } catch (error) {
        console.error('Error changing order status:', error);
      }
    }
  };

  const handleDeleteOrder = async () => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este pedido?');

    if (isConfirmed) {
      try {
        const response = await fetch(`https://restaurant-chain-api.onrender.com//orders/${orderId}/delete`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('{Pedido eliminado con exito}');
          // Update the order list in the sidebar
          updateOrderList();
        } else {
          const errorData = await response.json();
          console.error('Error deleting order:', errorData);
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleShowAddDishForm = () => {
    setShowAddDishForm(true);
  };

  const handleHideAddDishForm = () => {
    setShowAddDishForm(false);
  };

  return (
    <div className="border p-3 mt-3">
      <h4>Order Details:</h4>
      <button className="btn btn-primary mb-3" onClick={handleShowAddDishForm}>
        Add plate
      </button>
      <button className="btn btn-success mb-3 ml-3" onClick={handleChangeOrderStatus}>
        Set as Delivered
      </button>
      <button className="btn btn-danger mb-3 ml-3" onClick={handleDeleteOrder}>
        Delete order
      </button>

      {details.length > 0 && (
        <div>
          <ul className="list-group">
            {details.map((detail) => {
              // Buscar información del menú para el elemento de la orden actual
              const menuItem = menuItems.find((item) => item.menu_id === detail.item_id);

              return (
                <li key={detail.detail_id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <MenuItemSearch itemId={detail.item_id} />
                    <p>Cantidad: {detail.quantity}</p>
                  </div>
                  <div>
                    <p>Total: ${menuItem ? menuItem.price * detail.quantity : 'N/A'}</p>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(detail.detail_id)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {showAddDishForm && (
        <AddDishForm orderId={orderId} onHideForm={handleHideAddDishForm} updateOrderDetails={() => setDetails([])} />
      )}

      {details.length === 0 && !showAddDishForm && (
        <p>No hay elementos para esta orden.</p>
      )}
    </div>
  );
};

export default OrderDetails;
