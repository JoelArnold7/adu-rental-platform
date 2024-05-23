const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/adu_rentals', {
  useNewUrlParser: true, // Add this option to avoid deprecated warnings
  useUnifiedTopology: true, // Add this option to avoid deprecated warnings
});

// Define a schema and model for listings
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: {
    lat: Number,
    lng: Number,
  },
});

const Listing = mongoose.model('Listing', listingSchema);

// Define API endpoints
app.post('/api/listings', async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const listing = new Listing({ title, description, price, location });
    await listing.save();
    res.status(201).json(listing); // Send JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
  }
});

app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings); // Send JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
  }
});

// Serve static files (if necessary)
// Example: app.use(express.static('public'));

// Error handling middleware (if necessary)
// Example: app.use((err, req, res, next) => { ... });

// Start the server
const PORT = process.env.PORT || 5001; // Use environment variable for port or default to 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});