// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
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
router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Creates token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
};

// Hashes passwords
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds of 10
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Sign up route with profile picture upload
router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  console.log("Someone tried to sign up")
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(req.body.password);

    // Upload profile picture to Firebase Storage
    let profilePictureUrl = '';
    if (req.file) {
      const storageRef = ref(storage, `profilePictures/${Date.now()}_${req.file.originalname}`);
      const snapshot = await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype });
      profilePictureUrl = await getDownloadURL(snapshot.ref);
    }

    // Create a new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      profilePictureUrl: profilePictureUrl
    });

    // Save the user to the database
    await newUser.save();

    // Generate token
    const token = createToken(newUser._id);

    res.status(200).json({ user_id: newUser._id, email: newUser.email, token: token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


// Login route
router.post('/login', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = createToken(user._id);

    res.status(200).json({ user_id: user._id, email: user.email, token: token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Fetch non-sensitive information of one user
router.get("/getOne", async (req, res) => {
  const userId = req.query.userId
  try {
    // Try to fetch user
    const user = await User.findOne({ _id: userId }, { firstName: 1, lastName: 1, profilePictureUrl: 1 })

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

module.exports = router;
