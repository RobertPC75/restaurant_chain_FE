// Menu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import EditForm from './EditForm';

const Menu = () => {
  const [allMenuItems, setAllMenuItems] = useState([]); // Separate state for all menu items
  const [displayedMenuItems, setDisplayedMenuItems] = useState([]); // State for items to display on the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch menu items on component mount
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

    // Update the menu items based on the current page
    const itemsToDisplay = allMenuItems.slice(startIndex, endIndex);
    setDisplayedMenuItems(itemsToDisplay);
  }, [currentPage, allMenuItems, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setEditItem(null);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  return (
    <div className="container mt-4">
      <h2>Menu</h2>
      <div className="row">
        {displayedMenuItems.map(item => (
          <MenuItem
            key={item.menu_id}
            item={item}
            onEditClick={() => handleEditClick(item)}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
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
