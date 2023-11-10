import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import Orders from './Orders';
import SideBar from './SideBar';
import MyNavBar from './MyNavBar';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';

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
                  path="*"
                  element={
                    <SignedIn>
                      <Routes>
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/home" element={<Home />} />
                      </Routes>
                    </SignedIn>
                  }
                />
                <Route
                  path="*"
                  element={
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
