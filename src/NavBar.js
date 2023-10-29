// NavBar.js
import React from 'react';

const NavBar = () => {
  return (
    <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      {/* Contenido de la barra de navegación */}
      <a href="/">Inicio</a>
      <a href="/menu">Menu</a>
      <a href="/orders">Orders</a>
      {/* Otros enlaces */}
    </div>
  );
};

export default NavBar;
