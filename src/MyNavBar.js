import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { UserButton } from '@clerk/clerk-react';
import { FaShoppingCart } from 'react-icons/fa';
import CartOffcanvas from './CartOffcanvas'; // Adjust the path as needed

const MyNavbar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  // Assume cartItemsCount is a variable representing the number of items in the cart
  const cartItemsCount = 3; // You can replace this with the actual count from your application state

  // ... (previous code)

  return (
    <>
      <Navbar expand="lg" bg="light">
        <Navbar.Brand href="home">Restaurant Chain</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="menu">Menu</Nav.Link>
            <Nav.Link href="orders">Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {/* Cart Icon */}
          <div style={{ position: 'relative', marginRight: '10px' }}>
            <FaShoppingCart size={20} style={{ cursor: 'pointer' }} onClick={handleCartClick} />

            {/* Red Dot */}
            {cartItemsCount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                }}
              />
            )}
          </div>

          {/* User Icon */}
          <UserButton />
        </Nav>
      </Navbar>

      {/* Cart Offcanvas */}
      <CartOffcanvas show={showCart} handleClose={handleCloseCart} />
    </>
  );

};

export default MyNavbar;
