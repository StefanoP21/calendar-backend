const express = require('express');

// Express Server
const app = express();

// Routes
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Hello World' });
});

// Server
app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
