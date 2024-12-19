import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
    {

        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
            required: true
          },
          investorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor',
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now
          },

}
);

export default mongoose.model("Bookmark", bookmarkSchema);