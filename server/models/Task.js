const { Schema, model } = require('mongoose');

// Subdocument schema for checklist items
const ChecklistItemSchema = new Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
}, { _id: false });

// Subdocument schema for labels
const LabelSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
}, { _id: false });

// Main Task schema
const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  listId: { type: Schema.Types.ObjectId, required: true }, 
  // not a ref, since lists are embedded inside board

  startDate: Date,
  dueDate: Date,

  checklist: [ChecklistItemSchema],
  labels: [LabelSchema],

  // References to User model
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]

}, { timestamps: true });

module.exports = model('Task', TaskSchema);
