const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  recentlyVisitedBoards: [{
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
    visitedAt: { type: Date, default: Date.now } // Store timestamp of visit
  }],
});

module.exports = mongoose.model('User', userSchema);