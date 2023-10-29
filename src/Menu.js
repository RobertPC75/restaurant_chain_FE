// Menu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem'

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items on component mount
    axios.get('https://restaurant-chain-api.onrender.com/menu/all_info')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Menu</h2>
      <div className="row">
        {menuItems.map(item => (
          <MenuItem key={item.menu_id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
