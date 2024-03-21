const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Express Server
const app = express();

// Database
dbConnection();

// Port
const port = process.env.PORT;

// Public Directory
app.use(express.static('public'));

// Read and parse the body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
