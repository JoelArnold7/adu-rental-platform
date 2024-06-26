require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    });

const ListingSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'Pending Approval' }
});

const Listing = mongoose.model('Listing', ListingSchema);

app.get('/admin/pending-listings', async (req, res) => {
    try {
        console.log('Fetching pending listings...');
        const listings = await Listing.find({ status: 'Pending Approval' });
        console.log('Pending listings fetched:', listings);
        res.json(listings);
    } catch (error) {
        console.error('Error fetching pending listings:', error.message);
        res.status(500).send('Server error: ' + error.message);
    }
});

app.post('/admin/approve-listing/:id', async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
        if (!updatedListing) {
            return res.status(404).send('Listing not found');
        }
        res.send('Listing approved');
        console.log('Approved listing with ID:', req.params.id);
    } catch (error) {
        console.error('Error approving listing:', error);
        res.status(500).send('Server error: ' + error.message);
    }
});

app.post('/submit-listing', async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        res.send('Listing submitted');
        console.log('Submitted new listing:', newListing);
    } catch (error) {
        console.error('Error submitting listing:', error);
        res.status(500).send('Server error: ' + error.message);
    }
});

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
