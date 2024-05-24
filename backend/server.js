// Required libraries
const express = require('express')
const cors = require('cors')
const userController = require('./routers/userController')
const statusController = require('./routers/statusController')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongoose = require('mongoose')

// Connection URI for your MongoDB database
const mongoURI = `${process.env.MONGO_URL}`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for database connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Define app
const app = express();

// Use cors
app.use(cors());

// Use cookie parser
app.use(cookieParser());

// Use signup routes
app.use('/user', userController);

// Use status routes
app.use('/status', statusController)

// Start listening
const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});