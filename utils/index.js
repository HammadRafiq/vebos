import multer from "multer";
import path from "path"
import * as fs from "fs"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dy5yfqrgz',
    api_key: '619336452271354',
    api_secret: 'Gm5wkdURtwB9Nx1xbW_10UWsKWo'
})

export function handleIndexFrom(page, limit) {
    if (page > 0 && limit > 0) {
        return (page - 1) * limit
    }
    return 0
}

export function fileUpload(file) {
    // Set up multer for file upload
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '/tmp/'); // Specify the directory where uploaded files will be stored
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            cb(null, `video`); // Use a unique filename for each uploaded file
        }
    });
    const upload = multer({ storage });
    return upload
}

export async function cloudinaryUpload(filePath) {
    // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, { resource_type: 'video' });
    // Delete the locally saved file after uploading to Cloudinary
    fs.unlinkSync(filePath);
    return cloudinaryResponse
}