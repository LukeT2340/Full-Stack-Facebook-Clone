const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message');
require('dotenv').config();
const userController = require('./routers/userController');
const statusController = require('./routers/statusController');
const messageController = require('./routers/messageController');
const cookieParser = require('cookie-parser');

const app = express();

// Connection URI for your MongoDB database
const mongoURI = process.env.MONGO_URL;

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

// Use cors
app.use(cors({
  origin: process.env.REACT_APP_URL, // React app URL
  credentials: true,
}));

// Use cookie parser
app.use(cookieParser());

// Use user routes
app.use('/user', userController);

// Use status routes
app.use('/status', statusController);

// Use message routes
app.use('/message', messageController);

// Initialize socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_URL, // React app URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const generateRoomId = (userId1, userId2) => {
  // Concatenate user IDs and sort them alphabetically
  const sortedIds = [userId1, userId2].sort();
  // Join the sorted IDs to create the room ID
  const roomId = sortedIds.join('_');
  return roomId;
};

io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query; // Access room ID from handshake query

  console.log(`A user connected to room: ${roomId}`);

  // Join the user to the specified room
  socket.join(roomId);

  // Handle incoming messages
  socket.on('message', async (data) => {
      const message = new Message({
          senderId: data.senderId,
          recipientId: data.recipientId,
          text: data.text,
      });
      await message.save();
      // Emit message only to the recipient's room
      io.to(roomId).emit('message', message); 
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});


// Start listening
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
