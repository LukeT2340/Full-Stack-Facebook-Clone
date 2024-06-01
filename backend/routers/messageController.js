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
        /* 
            In reality, you'd want to fetch messages a bit at a time rather than load the whole conversation each time the users open the chat.
        */
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

// Fetch unread count
router.get('/fetchUnreadCount', async (req, res) => {
    const { otherUserId } = req.query
    const userId = req.userId

    try {
        // Fetch messages where senderId is otherUserId and recipientId is userId and isRead is false
        const unreadMessages = await Message.find(
            { 
                senderId: otherUserId,
                recipientId: userId,
                isRead: false
            }
        )


        // Count unread messages
        const count = unreadMessages.length;
        return res.status(200).json({ count }); 
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch unread messages count", details: error.message });
    }
})

// Mark messages as red
router.get('/markAsRead', async (req, res) => {
    const { otherUserId } = req.query;
    const userId = req.userId;

    try {
        await Message.updateMany(
            {
                senderId: otherUserId,
                recipientId: userId,
                isRead: false
            },
            { $set: { isRead: true } }
        );

        res.status(200).send("Messages marked as read successfully.");
    } catch (error) {
        console.error("Error marking messages as read:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;