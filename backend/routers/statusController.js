// Required libraries
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Status = require('../models/Status.js')
const multer = require('multer')
const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage")
const requireAuth = require('../middleware/requireAuth.js')
require('dotenv').config();


// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Set up multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } 
});


// All received data is converted to JSON format
router.use(bodyParser.json());

// Increase the limit for JSON and URL-encoded payloads
router.use(bodyParser.json({ limit: '30mb' }));
router.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Statuses can only be read and manipulated by authenticated users
router.use(requireAuth)

// Post new status
router.post("/post", upload.single('image'), async (req, res) => {
  try {
      // Extract status text, visibility, and media from request body
      const { text, visibility, recipientUserId } = req.body;
      const userId = req.userId;
      let media = null;
      
      // Check if an image file is uploaded
      if (req.file) {
          // Reference for Firebase Storage
          const storageRef = ref(storage, `statusImages/${Date.now()}_${req.file.originalname}`);
          // Upload the image to Firebase Storage
          const snapshot = await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype });
          // Get the download URL of the uploaded image
          const imageUrl = await getDownloadURL(snapshot.ref);
          // Set media fields
          media = {
              type: 'image',
              url: imageUrl
          };
      }

      // Create a new status document
      const newStatus = new Status({
          userId,
          recipientUserId,
          text,
          media,
          createdAt: new Date(),
          visibility
      });

      // Save the status document to the database
      await newStatus.save();

      // Send a success response
      res.status(201).json({ message: 'Status posted successfully', status: newStatus });
  } catch (error) {
      // Send an error response
      console.log(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Fetch Statuses - If userId is provided in query, that means we are fetching statuses for a particular user. Else it is for the home page
router.get("/getMany", async (req, res) => {
  try {
    // Extract query parameters
    let { page, limit, userId } = req.query;

    // Set default values if parameters are not provided
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 20;

    // Validate page and limit values
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 20;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    let statuses;

    // Query the database for user's statuses
    if (userId) {
      const statuses = await Status.find({
        $or: [
          { userId: userId },
          { recipientUserId: userId }
        ]
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return res.status(200).json({ statuses });
    } else {
      // Query the database for all statuses
      statuses = await Status.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    // Send the fetched statuses as a response
    return res.status(200).json({ statuses });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check like status
router.get("/:statusId/isLiked", async (req, res) => {
  const statusId = req.params.statusId
  const userId = req.userId

  try {
    // Find the status by ID
    const status = await Status.findById(statusId);
    if (!status) {
        return res.status(404).json({ message: 'Status not found' })
    }

    // Ensure the status has a valid likes array
    if (!status.likes || !Array.isArray(status.likes)) {
        return res.status(200).json({ liked: false })
    }

    // Check if the user has already liked the status
    if (status.likes.includes(userId)) {
        return res.status(200).json({ liked: true })
    } 

    return res.status(200).json({ liked: false })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})


// Like status
router.post("/:statusId/like", async (req, res) => {
    const statusId = req.params.statusId;
    const userId = req.userId

    try {
      // Find the status by ID
      const status = await Status.findById(statusId);
      if (!status) {
          return res.status(404).json({ message: 'Status not found' });
      }

      // Check if the user has already liked the status
      if (status.likes.includes(userId)) {
          return res.status(400).json({ message: 'Status already liked' });
      }

      // Add the user to the likes array
      status.likes.push(userId);
      await status.save();

      return res.status(200).json({ message: 'Status liked successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Unlike status
router.post("/:statusId/unlike", async (req, res) => {
  const statusId = req.params.statusId;
  const userId = req.userId

  try {
    // Find the status by ID
    const status = await Status.findById(statusId);
    if (!status) {
        return res.status(404).json({ message: 'Status not found' });
    }

    // Check if the user has liked the status
    if (status.likes.some(like => like.equals(userId))) {
      // Remove the user from the likes array
      status.likes = status.likes.filter(like => !like.equals(userId));
      await status.save();
      return res.status(200).json({ message: 'Status unliked successfully' });
    }

    return res.status(400).json({ message: 'User has not liked status' });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
}
});

// Publish comment
router.post("/:statusId/comment", async (req, res) => {
  const statusId = req.params.statusId;
  const text = req.body.text;
  const userId = req.userId

  try {
      // Find the status by ID
      const status = await Status.findById(statusId);
      if (!status) {
          return res.status(404).json({ message: 'Status not found' });
      }

      // Add the comment to the status
      status.comments.push({
          userId: userId, 
          text: text,
      });

      // Save the updated status
      await status.save();

      // Respond with the newly added comment
      const newComment = status.comments[status.comments.length - 1]; // Get the last comment in the array (the newly added one)
      return res.status(201).json(newComment);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
