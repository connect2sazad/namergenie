require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const nameRoutes = require('./routes/name.routes');
const errorHandler = require('./middlewares/errorHandler');
const { BASE_URL, PORT } = require('./config/env');

// DB Connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/names', nameRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server started on ${BASE_URL}`);
});
