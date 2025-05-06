require('dotenv').config();  // Load the environment variables

const express = require('express');
const app = express();

// Use SERVER_PORT from the environment variable, default to 5001 if not provided
const port = process.env.SERVER_PORT || 5001;

app.get('/', (req, res) => {
  res.send('Hello from Express with dotenv!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});