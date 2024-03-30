import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creators"
    },
    fullname: {
        type: String,
        required: [true]
    },
    tiktokId: {
        type: String,
        required: [true]
    },
    youtube: {
        type: String
    },
    clipLink: {
        type: String,
    },
})

const Profiles = mongoose.models.Profiles || mongoose.model("Profiles", profileSchema)
export default Profiles
