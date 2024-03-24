import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    paypal: {
        type: String,
        required: [true]
    },
    country: {
        type: String,
        required: [true]
    },
    dob: {
        type: Date,
    },
    parentName: {
        type: String,
        required: [true]
    },
    tiktokId: {
        type: String,
        required: [true]
    },
    youtube: {
        type: String,
    },
    idCard: {
        type: String,
    },
    clipLink: {
        type: String,
        required: [true]
    }
})

const Creators = mongoose.models.Creators || mongoose.model("Creators", CreatorSchema)
export default Creators
