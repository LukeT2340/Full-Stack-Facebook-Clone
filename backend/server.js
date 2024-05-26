// Required libraries
const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
const userController = require('./routers/userController')
const statusController = require('./routers/statusController')
const messageController = require('./routers/messageController')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongoose = require('mongoose')
const Message = require('./models/Message')

// Define app
const app = express()

// Connection URI for your MongoDB database
const mongoURI = `${process.env.MONGO_URL}`

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection

// Event handlers for database connection
db.on('connected', () => {
  console.log('Connected to MongoDB')
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err)
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
});

// Initialize socket.io
const server = require('http').createServer(app); // Create HTTP server
const io = socketIo(server) 

io.on('connection', (socket) => {
  console.log('A user connected')

  // Handle incoming messages
  socket.on('message', async (data) => {
    const message = new Message({
      userId: data.userId,
      text: data.text,
      createdAt: new Date(),
    });
    await message.save()
    io.emit('message', message) // Broadcast to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  });
});

// Use cors
app.use(cors())

// Use cookie parser
app.use(cookieParser());

// Use signup routes
app.use('/user', userController)

// Use status routes
app.use('/status', statusController)

// Use message routes
app.use('/message', messageController)

// Start listening
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});