require('dotenv').config();
const { BASE_URL, PORT } = require('./config/env');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const nameRoutes = require('./routes/name.routes');
const subscribeRoutes = require("./routes/subscribe.routes");

const errorHandler = require('./middlewares/errorHandler');

// DB Connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/names', nameRoutes);
app.use('/api/subscriptions', subscribeRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server started on ${BASE_URL}`);
});
