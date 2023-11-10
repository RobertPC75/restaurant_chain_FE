import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import EditForm from './EditForm';
import AddPlateForm from './AddPlateForm';

const Menu = () => {
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [displayedMenuItems, setDisplayedMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const [showAddPlateForm, setShowAddPlateForm] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    axios.get(`https://restaurant-chain-api.onrender.com/menu/all_info`)
      .then(response => {
        const sortedMenuItems = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setAllMenuItems(sortedMenuItems);
      })
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = allMenuItems.slice(startIndex, endIndex);
    setDisplayedMenuItems(itemsToDisplay);
  }, [currentPage, allMenuItems, itemsPerPage]);

  const handlePageChange = (newPage) => {
    const maxPages = Math.ceil(allMenuItems.length / itemsPerPage);
    if (newPage >= 1 && newPage <= maxPages) {
      setCurrentPage(newPage);
      setEditItem(null);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handleDeleteClick = (deletedItemId) => {
    const updatedDisplayedMenuItems = displayedMenuItems.filter(item => item.menu_id !== deletedItemId);
    setDisplayedMenuItems(updatedDisplayedMenuItems);
  };

  const handleAddPlateClick = () => {
    setShowAddPlateForm(true);
  };

  const handlePlateAdded = () => {
    // Refresh the menu items after a plate is added
    // You can fetch the updated menu items here
    setShowAddPlateForm(false);
  };

  return (
    <div className="container-fluid mt-4">
      <h2>Menu</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddPlateClick}>Add Plate</button>

      {showAddPlateForm && (
        <AddPlateForm onPlateAdded={handlePlateAdded} />
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {displayedMenuItems.map(item => (
          <div className="col" key={item.menu_id}>
            <MenuItem
              item={item}
              onEditClick={() => handleEditClick(item)}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end ms-auto mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">Page {currentPage}</span>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {editItem && (
        <EditForm
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
};

export default Menu;
