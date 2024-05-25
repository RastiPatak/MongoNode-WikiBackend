const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pageRoutes = require('./routes/pageRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/pages', pageRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wiki')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
