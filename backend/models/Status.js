const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Comment schema
const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the Status schema
const statusSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  media: {
    type: { type: String, enum: ['image', 'video'] },
    url: { type: String },
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the status
  comments: [commentSchema],
  visibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

statusSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Status', statusSchema);
