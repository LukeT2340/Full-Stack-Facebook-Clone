const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const User = require('../models/User')
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer')
const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage")

// All received data is converted to JSON format
router.use(bodyParser.json());

// Increase the limit for JSON and URL-encoded payloads
router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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

// Fetch non-sensitive information of multiple users
router.get("/getMany", async (req, res) => {
  let limit = req.query.limit
  let user_id = req.query.user_id

  // Validate limit
  if (!limit || limit > 20) {
    limit = 20
  }
  try {
    // Try to fetch users
    const users = await User.find({ _id: { $ne: user_id }}, { _id: 1, firstName: 1, lastName: 1, profilePictureUrl: 1 })
      .sort({ createdAt: -1 })
      .limit(limit)

    // If users are found, send user data
    if (users) {
      res.status(200).json(users)
    } else {
      // Handle case where users is not found
      res.status(404).json({ message: 'No users found' })
    }
  } catch (error) {
    // Handle error
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Fetch non-sensitive information of one user
router.get("/getOne", async (req, res) => {
  const userId = req.query.userId
  try {
    // Try to fetch user
    const user = await User.findOne({ _id: userId }, { firstName: 1, lastName: 1, profilePictureUrl: 1, coverPhotoUrl: 1 })

    // If user is found, send user data
    if (user) {
      res.status(200).json(user)
    } else {
      // Handle case where user is not found
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    // Handle error
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Fetch non-sensitive information of multiple users
router.get("/getMany", async (req, res) => {
  let limit = req.query.limit
  let user_id = req.query.user_id

  // Validate limit
  if (!limit || limit > 20) {
    limit = 20
  }
  try {
    // Try to fetch users
    const users = await User.find({ _id: { $ne: user_id }}, { _id: 1, firstName: 1, lastName: 1, profilePictureUrl: 1 })
      .sort({ createdAt: -1 })
      .limit(limit)

    // If users are found, send user data
    if (users) {
      res.status(200).json(users)
    } else {
      // Handle case where users is not found
      res.status(404).json({ message: 'No users found' })
    }
  } catch (error) {
    // Handle error
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Search for users
router.get("/search", async (req, res) => {
  const text = req.query.text;
  const searchTextParts = text.split(" ");
  const firstName = searchTextParts[0];
  const lastName = searchTextParts.length > 1 ? searchTextParts.slice(1).join(" ") : '';
  
  try {
      // Find users whose names contain the search text, case-insensitive
      const users = await User.find({
          $or: [
              { $and: [
                  { firstName: { $regex: new RegExp(firstName, "i") } },
                  { lastName: { $regex: new RegExp(lastName, "i") } }
              ]},
              { $and: [
                  { lastName: { $regex: new RegExp(firstName, "i") } },
                  { firstName: { $regex: new RegExp(lastName, "i") } }
              ]}
          ]
      }, { _id: 1, firstName: 1, lastName: 1, profilePictureUrl: 1 });
      
    // Handle successful database query
    res.status(200).json(users);
  } catch (error) {
    // Handle error
    return res.status(400).json({ 'message': error })
  }
})

// Endpoints below this point require authorization
router.use(requireAuth)

// Update cover photo
router.put("/update/coverPhoto", upload.single('coverPhoto'), async(req, res) => {
    const userId = req.userId
    try {
        // First find the user from the db
        const user = await User.findOne({ _id: userId })

        // Check that user exists
        if (!user) {
            return res.status(400).json({ 'message': 'User not found' })
        }

        // Check if the file is available
        if (!req.file) {
            return res.status(400).json({ 'message': 'No file uploaded' })
        }

        // Upload profile picture to Firebase Storage
        let coverPhotoUrl = '';
        if (req.file) {
            const storageRef = ref(storage, `coverPictures/${Date.now()}_${req.file.originalname}`);
            const snapshot = await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype });
            coverPhotoUrl = await getDownloadURL(snapshot.ref);
        }
        user.coverPhotoUrl = coverPhotoUrl   
        await user.save()
        return res.status(201).json({ 'message': 'Cover photo updated successfully'})     
    } catch (error) {
        return res.status(400).json({ 'message': error })
    }
})

module.exports = router;
