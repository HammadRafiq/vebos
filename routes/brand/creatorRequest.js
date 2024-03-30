import express from 'express';
import { verifyTokenBrand } from '../../utils/auth.js';
import { handleIndexFrom } from '../../utils/index.js';
import creatorRequests from '../../models/creatorRequest.js';

const router = express.Router();

/**
 * @openapi
 * '/brand/creatorsRequest/submit':
 *  post:
 *     tags:
 *     - Brand - Request Full Time Creator
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
 *              videosNeeded:
 *                type: string
 *                default: We will need 5 videos each month
 *              goals:
 *                type: string
 *                default: Target audience is teenagers
 *     responses:
 *      201:
 *        description: Created
 */
router.post('/submit', verifyTokenBrand, async (request, response) => {
    try {
        const newCreatorRequest = new creatorRequests({
            ...request.body,
            brandId: request.brandId
        })
        const creatorRequest = await newCreatorRequest.save()
        return response.status(201).send(creatorRequest);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})


/**
 * @openapi
 * '/brand/creatorsRequest':
 *  get:
 *     tags:
 *     - Brand - Request Full Time Creator
 *     summary: Get all submitted creator requests
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
router.get('/', verifyTokenBrand, async (request, response) => {
    const { page, limit } = request.query
    const indexFrom = handleIndexFrom(page, limit)
    const filter = {
        brandId: request.brandId
    }
    try {
        const profiles = await creatorRequests.find(filter)
            .limit(limit ?? 10)
            .skip(indexFrom)
            .exec()
        const total = await creatorRequests.countDocuments(filter)
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
