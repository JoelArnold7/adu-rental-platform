import React, { useEffect, useState } from 'react';

const ListingsMap = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/listings')
      .then(response => response.json())
      .then(data => setListings(data));
  }, []);

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Diego
        zoom: 12,
      });

      listings.forEach((listing) => {
        new window.google.maps.Marker({
          position: { lat: listing.location.lat, lng: listing.location.lng },
          map,
          title: listing.title,
        });
      });
    }
  }, [listings]);

  return (
    <div>
      <h2>Map with Listings</h2>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default ListingsMap;