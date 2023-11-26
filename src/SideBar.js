import React from 'react';
import { useUser } from "@clerk/clerk-react";

const SideBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div style={{ width: '200px', backgroundColor: 'lightgray', padding: '10px' }}>
      <p>
        This website runs using an API. For development purposes, this API goes to sleep every 15 minutes.
        If the site is not working properly, try waking up the API manually by going to{' '}
        <a href="https://restaurant-chain-api.onrender.com/" target="_blank" rel="noopener noreferrer">
          https://restaurant-chain-api.onrender.com/
        </a>
        .
      </p>

      {isLoaded && isSignedIn && (
        <div>
          <p>Welcome, {user.firstName}!</p>
          <p>User ID: {user.id}</p>
          {/* Add more user information as needed */}
        </div>
      )}
    </div>
  );
};

export default SideBar;
