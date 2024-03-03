const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, enum: ['Unassigned', 'In Development', 'Pending Review', 'Done'] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deadline: { type: Date },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
},{timestamps});

module.exports = mongoose.model('Task', taskSchema);