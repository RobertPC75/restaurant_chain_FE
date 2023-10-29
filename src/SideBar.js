// SideBar.js
import React from 'react';

const SideBar = () => {
  return (
    <div style={{ width: '200px', backgroundColor: 'lightgray', padding: '10px' }}>
      {/* Contenido de la barra lateral */}
      <p>
          This website runs using an API. For development purposes, this API goes to sleep every 15 minutes.
          If the site is not working properly, try waking up the API manually by going to{' '}
          <a href="https://restaurant-chain-api.onrender.com/" target="_blank" rel="noopener noreferrer">
            https://restaurant-chain-api.onrender.com/
          </a>
          .
        </p>
      {/* Otros elementos de la barra lateral */}
    </div>
  );
};

export default SideBar;
