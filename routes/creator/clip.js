import express from 'express';
import { cloudinaryUpload, fileUpload, handleIndexFrom } from '../../utils/index.js';
import Clips from '../../models/clip.js';
import { verifyTokenCreator } from '../../utils/auth.js';

const router = express.Router();
const upload = fileUpload()

/**
 * @openapi
 * '/creator/clips/submit':
 *  post:
 *     tags:
 *     - Creator Clips Submission
 *     summary: Submit a clip
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                default: Not to laugh challenge clip
 *              niche:
 *                type: string
 *                default: Comedy
 *              estRevenue:
 *                type: number
 *                default: 750
 *              video:
 *                type: string
 *                format: binary
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */
router.post('/submit', verifyTokenCreator, upload.single("video"), async (req, res) => {
    const filePath = req?.file?.path;
    try {
        const cloudinaryResponse = await cloudinaryUpload(filePath)
        const newClip = new Clips({
            ...req.body,
            url: cloudinaryResponse?.url,
            date: new Date(),
            brandId: req.brandId
        })
        const clip = await newClip.save()
        return res.status(201).send(clip);
    } catch (error) {
        console.error('Error saving clip:', error);
        res.status(500).send(error);
    }
})


/**
 * @openapi
 * '/creator/clips':
 *  get:
 *     tags:
 *     - Creator Clips Submission
 *     summary: Get all clips
 *     parameters:
 *      - name: page
 *        in: query
 *        description: Page number of records
 *      - name: limit
 *        in: query
 *        description: The total number of records against a single page
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      500:
 *        description: Server Error
 */
router.get('/', async (request, response) => {
    const { page, limit, search } = request.query
    const indexFrom = handleIndexFrom(page, limit)
    const filter = {
        brandId: request.brandId
    }
    try {
        const clips = await Clips.find(filter)
            .limit(limit ?? 10)
            .skip(indexFrom)
            .exec()
        const total = await Clips.countDocuments(filter)
        return response.status(200).json({
            total,
            items: clips,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router
