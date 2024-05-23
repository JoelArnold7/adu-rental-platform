import React, { useState } from 'react';

const AddListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, price, location }),
    });
    if (response.ok) {
      alert('Listing added successfully!');
    } else {
      alert('Failed to add listing.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="hidden" value={location.lat} />
      <input type="hidden" value={location.lng} />
      <button type="submit">Add Listing</button>
    </form>
  );
};

export default AddListing;