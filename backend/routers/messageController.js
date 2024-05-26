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