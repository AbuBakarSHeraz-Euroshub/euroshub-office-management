const BoardMemberSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { 
    type: String, 
    enum: ['owner', 'admin', 'member'], 
    default: 'member' 
  }
}, { timestamps: true });

BoardMemberSchema.index({ board: 1, user: 1 }, { unique: true });

module.exports = model('BoardMember', BoardMemberSchema);
