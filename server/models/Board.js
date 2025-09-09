const { Schema, model } = require('mongoose');


const ListSchema = new Schema({
  name: { type: String, required: true }
}, { _id: true });


const BoardSchema = new Schema({
  name: { type: String, required: true },
  description: String,

  lists: [ListSchema]

}, { timestamps: true });

module.exports = model('Board', BoardSchema);
