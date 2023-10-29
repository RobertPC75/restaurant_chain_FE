import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import Orders from './Orders';
import SideBar from './SideBar';
import MyNavBar from './MyNavBar'; // Import MyNavBar component

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <MyNavBar />

        {/* Content Container */}
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <SideBar />

          {/* Main Content */}
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;