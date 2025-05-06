const dotenv = require('dotenv');
const path = require('path');

// Load .env file from root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Export environment variables
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.SERVER_PORT || 5000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  // Add more env vars as needed
};
