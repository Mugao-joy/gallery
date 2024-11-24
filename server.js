const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Import configuration
const config = require('./_config');

// Determine environment
const env = process.env.NODE_ENV || 'development'; // Defaults to 'development'
const mongodb_url = config.mongoURI[env]; // Get the MongoDB URI from config.js

// Connecting to the database
mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully to ${env} environment`))
  .catch((err) => console.error('Database connection error:', err));

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
