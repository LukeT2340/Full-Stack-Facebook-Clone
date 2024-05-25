// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Message = require('../models/Message');
const requireAuth = require('../middleware/requireAuth.js');
require('dotenv').config();

// All received data is converted to JSON format
router.use(bodyParser.json());

// Statuses can only be read and manipulated by authenticated users
router.use(requireAuth);

// Post end-point for new messages
router.post('/send', async (req, res) => {
    const { recipientId, text } = req.body;
    const userId = req.userId; 

    try {
        // Create new message
        const message = new Message({
            senderId: userId,
            recipientId: recipientId,
            text: text.trim()
        });

        // Try to save message
        await message.save();
        return res.status(201).json({ message });
    } catch (error) {
        return res.status(400).json({ error: "Failed to send message", details: error.message });
    }
});

// Fetch messages
router.get('/get', async (req, res) => {
    const { recipientId } = req.query;
    const userId = req.userId

    try {
        // Find messages between the sender and recipient
        const messages = await Message.find({
            $or: [
                { senderId: userId, recipientId: recipientId },
                { senderId: recipientId, recipientId: userId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by createdAt date

        return res.status(200).json({ messages });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch messages", details: error.message });
    }
});


module.exports = router;
