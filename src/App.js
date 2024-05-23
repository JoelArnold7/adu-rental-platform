import React from 'react';
import AddListing from './components/AddListing';
import ListingsMap from './components/ListingsMap';

function App() {
  return (
    <div className="App">
      <h1>Find My ADU</h1>
      <AddListing />
      <ListingsMap />
    </div>
  );
}

export default App;
