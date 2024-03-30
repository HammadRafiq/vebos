import mongoose from "mongoose";

const buyClipSchema = new mongoose.Schema({
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brands"
    },
    niche: {
        type: String,
        required: [true]
    },
    budget: {
        type: String,
        required: [true]
    },
    purpose: {
        type: String,
        required: [true]
    },
    example: {
        type: String,
    },
})

const buyAClip = mongoose.models.buyAClip || mongoose.model("buyAClip", buyClipSchema)
export default buyAClip
