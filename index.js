const express = require('express');
require('dotenv').config();

// Express Server
const app = express();

// Port
const port = process.env.PORT;

// Public Directory
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
