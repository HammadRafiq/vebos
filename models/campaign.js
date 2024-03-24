import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: [true]
    },
    brandIndustry: {
        type: String,
        required: [true]
    },
    targetAudience: {
        type: String,
        required: [true]
    },
    results: {
        type: String,
        required: [true]
    },
    contentType: {
        type: String,
    },
    budget: {
        type: Number,
        required: [true]
    },
    date: {
        type: Date,
    },
})

const Campaigns = mongoose.models.Campaigns || mongoose.model("Campaigns", CampaignSchema)
export default Campaigns
