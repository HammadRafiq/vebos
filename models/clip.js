import mongoose from "mongoose";

const clipSchema = new mongoose.Schema({
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
})

const Clips = mongoose.models.Clips || mongoose.model("Clips", clipSchema)
export default Clips
