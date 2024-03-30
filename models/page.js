import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creators"
    },
    link: {
        type: String,
        required: [true]
    },
    grantLicense: {
        type: Boolean,
        required: [true]
    },
})

const Pages = mongoose.models.Pages || mongoose.model("Pages", pageSchema)
export default Pages
