// Home.js
import React from 'react';

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the "Restaurant chain" development web page.</h1>
        <p>
          This website runs using an API. For development purposes, this API goes to sleep every 15 minutes.
          If the site is not working properly, try waking up the API manually by going to{' '}
          <a href="https://restaurant-chain-api.onrender.com/" target="_blank" rel="noopener noreferrer">
            https://restaurant-chain-api.onrender.com/
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Home;
