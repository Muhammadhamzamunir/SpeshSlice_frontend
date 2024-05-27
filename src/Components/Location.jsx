import React, { useState } from 'react';

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null, loading: false });
  const [address, setAddress] = useState({ country: '', city: '', street: '' });

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setPosition({ loading: true });
      navigator.geolocation.getCurrentPosition(async function (position) {
        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=7ff51c5bbef84d1ab2a6083a195e4b3b`);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const { country, city, road } = data.results[0].components;
            setAddress({ country, city, street: road });
          } else {
            console.log("No results found for the given coordinates.");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false
          });
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  };

  return (
    <div>
      <h2>My Current Location</h2>
      <button onClick={getCurrentLocation}>Get Current Location</button>
      {position.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Latitude: {position.latitude}, Longitude: {position.longitude}</p>
          <label className="block text-sm font-medium text-gray-700">Street:</label>
          <input 
            type="text" 
            value={address.street} 
           
            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" 
          /><br />
          <label className="block text-sm font-medium text-gray-700">City:</label>
          <input 
            type="text" 
            value={address.city} 
            
            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" 
          /><br />
          <label className="block text-sm font-medium text-gray-700">Country:</label>
          <input 
            type="text" 
            value={address.country} 
           
            className="border border-gray-200 rounded-lg h-16 shadow-none pl-5 text-base w-full mb-4" 
          />
        </>
      )}
    </div>
  );
}

export default MyLocation;
