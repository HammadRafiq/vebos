import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    representative: {
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
    phone: {
        type: String,
        required: [true]
    },
    needs: {
        type: String,
        required: [true]
    },
    budget: {
        type: Number,
        required: [true]
    },
    webLink: {
        type: String,
    },
    socialLink: {
        type: String,
    }
})

const Brands = mongoose.models.Brands || mongoose.model("Brands", BrandSchema)
export default Brands
