//app.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import MyNavBar from './MyNavBar';
import SideBar from './SideBar';  // Add this line
import Home from './Home';
import Menu from './Menu';
import Orders from './Orders';


function App() {
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
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
                <Route
                  path="/*"
                  element={
                    <SignedIn>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/home" element={<Home />} />
                      </Routes>
                    </SignedIn>
                  }
                />
              </Routes>
              <SignedOut>
                <SignIn />
              </SignedOut>
            </div>
          </div>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
