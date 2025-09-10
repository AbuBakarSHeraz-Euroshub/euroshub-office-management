const { Schema, model } = require('mongoose');

// Subdocument schema for lists
const ListSchema = new Schema({
  name: { type: String, required: true }
}, { _id: true });

// Main Board schema
const BoardSchema = new Schema({
  name: { type: String, required: true },
  desc: String,
  background: { type: String, default: '#ffffff' },
  visibility: { type: String, required: true, enum:['public' , 'private' , 'workspace'] },

  // 👇 embed lists directly inside Board
  lists: [ListSchema]

}, { timestamps: true });

module.exports = model('Board', BoardSchema);
