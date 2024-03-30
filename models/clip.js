import mongoose from "mongoose";

const clipSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creators"
    },
    title: {
        type: String,
        required: [true]
    },
    niche: {
        type: String,
        required: [true]
    },
    url: {
        type: String,
        required: [true]
    },
    estRevenue: {
        type: Number,
    },
    date: {
        type: Date,
    },
})

const Clips = mongoose.models.Clips || mongoose.model("Clips", clipSchema)
export default Clips
