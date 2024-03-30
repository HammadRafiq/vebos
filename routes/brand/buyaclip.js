import express from 'express';
import { verifyTokenBrand } from '../../utils/auth.js';
import { handleIndexFrom } from '../../utils/index.js';
import buyAClip from '../../models/buyaclip.js';

const router = express.Router();

/**
 * @openapi
 * '/brand/buyClip/submit':
 *  post:
 *     tags:
 *     - Brand - Buy A Clip
 *     summary: Submit request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              niche:
 *                type: string
 *                default: Comedy
 *              budget:
 *                type: number
 *                default: 500
 *              purpose:
 *                type: string
 *                default: We want to buy clip for commercial purposes
 *              example:
 *                type: string
 *                default: https://www.google.com/
 *     responses:
 *      201:
 *        description: Created
 */
router.post('/submit', verifyTokenBrand, async (request, response) => {
    try {
        const newBuyClip = new buyAClip({
            ...request.body,
            brandId: request.brandId
        })
        const buyClip = await newBuyClip.save()
        return response.status(201).send(buyClip);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})


/**
 * @openapi
 * '/brand/buyClip':
 *  get:
 *     tags:
 *     - Brand - Buy A Clip
 *     summary: Get all submitted records
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
 */
router.get('/', verifyTokenBrand, async (request, response) => {
    const { page, limit } = request.query
    const indexFrom = handleIndexFrom(page, limit)
    const filter = {
        brandId: request.brandId
    }
    try {
        const buyClips = await buyAClip.find(filter)
            .limit(limit ?? 10)
            .skip(indexFrom)
            .exec()
        const total = await buyAClip.countDocuments(filter)
        return response.status(200).json({
            total,
            items: buyClips,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router
