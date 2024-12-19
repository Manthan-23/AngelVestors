import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    participants: [
      {
      startupId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Investor'
    }
  }
  ],
    messages: [{
      type: String,
      ref: 'Message'
    }],
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  
export default mongoose.model('ChatRoom', chatRoomSchema);