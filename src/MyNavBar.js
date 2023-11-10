import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { UserButton } from '@clerk/clerk-react';

const MyNavbar = () => {
  return (
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
      <div style={{ alignSelf: 'flex-end', margin: '10px' }}>
      <UserButton />
      </div>
    </Navbar>
    
  );
};

export default MyNavbar;
