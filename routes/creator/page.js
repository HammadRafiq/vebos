import express from 'express';
import { handleIndexFrom } from '../../utils/index.js';
import { verifyTokenCreator } from '../../utils/auth.js';
import Pages from '../../models/page.js';

const router = express.Router();

/**
 * @openapi
 * '/creator/pages/submit':
 *  post:
 *     tags:
 *     - Creator Pages Submission
 *     summary: Submit a page
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              link:
 *                type: string
 *                default: https://www.google.com/
 *              grantLicense:
 *                type: boolean
 *                default: false
 *     responses:
 *      201:
 *        description: Created
 */

router.post('/submit', verifyTokenCreator, async (request, response) => {
    try {
        const newPage = new Pages({
            ...request.body,
            brandId: request.brandId
        })
        const page = await newPage.save()
        return response.status(201).send(page);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})


/**
 * @openapi
 * '/creator/pages':
 *  get:
 *     tags:
 *     - Creator Pages Submission
 *     summary: Get all submitted pages
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
        const pages = await Pages.find(filter)
            .limit(limit ?? 10)
            .skip(indexFrom)
            .exec()
        const total = await Pages.countDocuments(filter)
        return response.status(200).json({
            total,
            items: pages,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router
