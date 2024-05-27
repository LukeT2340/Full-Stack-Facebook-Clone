// Import Mongoose module
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date
    },
    coverPhotoUrl: {
        type: String
    },
    profilePictureUrl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;