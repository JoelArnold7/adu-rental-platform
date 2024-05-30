import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get('/admin/pending-listings')
            .then(response => {
                setListings(response.data);
            })
            .catch(error => {
                console.error('Error fetching pending listings:', error);
            });
    }, []);

    const approveListing = (id) => {
        axios.post(`/admin/approve-listing/${id}`)
            .then(() => {
                setListings(listings.filter(listing => listing._id !== id));
            })
            .catch(error => {
                console.error('Error approving listing:', error);
            });
    };

    return (
        <div>
            <h1>Pending Listings</h1>
            <ul>
                {listings.map(listing => (
                    <li key={listing._id}>
                        {listing.title}
                        <button onClick={() => approveListing(listing._id)}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
