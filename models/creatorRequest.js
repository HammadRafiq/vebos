import mongoose from "mongoose";

const creatorRequestSchema = new mongoose.Schema({
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brands"
    },
    niche: {
        type: String,
        required: [true]
    },
    budget: {
        type: Number,
        required: [true]
    },
    videosNeeded: {
        type: String,
        required: [true]
    },
    goals: {
        type: String,
    },
})

const creatorRequests = mongoose.models.creatorRequests || mongoose.model("creatorRequests", creatorRequestSchema)
export default creatorRequests
