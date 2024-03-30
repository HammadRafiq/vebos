import express from 'express';
import Profiles from '../../models/profile.js';
import { verifyTokenCreator } from '../../utils/auth.js';
import { handleIndexFrom } from '../../utils/index.js';

const router = express.Router();

/**
 * @openapi
 * '/creator/profiles/submit':
 *  post:
 *     tags:
 *     - Creator Profiles Submission
 *     summary: Submit a profile
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                default: Vebos
 *              tiktokId:
 *                type: string
 *                default: mrbeast
 *              youtube:
 *                type: string
 *                default: mrbeast
 *              clipLink:
 *                type: string
 *                default: https://www.tiktok.com/@mrbeast/video/7161158977169067310
 *     responses:
 *      201:
 *        description: Created
 */
router.post('/submit', verifyTokenCreator, async (request, response) => {
    try {
        const newProfile = new Profiles({
            ...request.body,
            brandId: request.brandId
        })
        const profile = await newProfile.save()
        return response.status(201).send(profile);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})


/**
 * @openapi
 * '/creator/profiles':
 *  get:
 *     tags:
 *     - Creator Profiles Submission
 *     summary: Get all submitted profiles
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
router.get('/', verifyTokenCreator, async (request, response) => {
    const { page, limit } = request.query
    const indexFrom = handleIndexFrom(page, limit)
    const filter = {
        brandId: request.brandId
    }
    try {
        const profiles = await Profiles.find(filter)
            .limit(limit ?? 10)
            .skip(indexFrom)
            .exec()
        const total = await Profiles.countDocuments(filter)
        return response.status(200).json({
            total,
            items: profiles,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router
