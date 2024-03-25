import express from 'express';
import Campaigns from '../../models/campaign.js';
import { handleIndexFrom } from '../../utils/index.js';

const router = express.Router();

/**
 * @openapi
 * '/brand/campaigns/create':
 *  post:
 *     tags:
 *     - Brand Campaign
 *     summary: Create a campaign
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - brandName
 *              - brandIndustry
 *              - targetAudience
 *              - results
 *              - budget
 *            properties:
 *              brandName:
 *                type: string
 *                default: Vebos
 *              brandIndustry:
 *                type: string
 *                default: Tech
 *              targetAudience:
 *                type: string
 *                default: TikTok users
 *              results:
 *                type: string
 *                default: Lorem ipsum
 *              contentType:
 *                type: string
 *                default: Comedy
 *              budget:
 *                type: number
 *                default: 1000
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */

router.post('/create', async (request, response) => {
    try {
        const newCampaign = new Campaigns(request.body)
        const campaign = await newCampaign.save()
        return response.status(201).send(campaign);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})


/**
 * @openapi
 * '/brand/campaigns':
 *  get:
 *     tags:
 *     - Brand Campaign
 *     summary: Get all campaigns
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
    const filter = {}
    try {
        // const campaigns = await Campaigns.find(filter)
        //     .limit(limit ?? 10)
        //     .skip(indexFrom)
        //     .exec()
        // const total = await Campaigns.countDocuments(filter)
        // return response.status(200).json({
        //     total,
        //     items: campaigns,
        // });
        return response.status(200).json("brand campaigns api execute success")
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


/**
 * @openapi
 * '/brand/campaigns/delete':
 *  delete:
 *     tags:
 *     - Brand Campaign
 *     summary: Delete campaign by Id
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The unique Id of the campaign
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      500:
 *        description: Server Error
 */
router.delete('/delete', async (request, response) => {
    try {
        const { id } = request.query;
        const result = await Campaigns.deleteOne({ _id: id })

        if (!result) {
            return response.status(404).json({ message: 'Campaign not found' });
        }
        return response.status(200).send({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


/**
 * @openapi
 * '/brand/campaigns/update':
 *  put:
 *     tags:
 *     - Brand Campaign
 *     summary: Update a campaign
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *                default: campaign id
 *              brandName:
 *                type: string
 *                default: Vebos
 *              brandIndustry:
 *                type: string
 *                default: Tech
 *              targetAudience:
 *                type: string
 *                default: TikTok users
 *              results:
 *                type: string
 *                default: Lorem ipsum
 *              contentType:
 *                type: string
 *                default: Comedy
 *              budget:
 *                type: number
 *                default: 1000
 *     responses:
 *      200:
 *        description: Modified
 *      500:
 *        description: Server Error
 */
router.put('/update', async (request, response) => {
    try {
        const { id } = request.body;
        const result = await Campaigns.findOneAndUpdate({ _id: id }, request.body, {
            new: true
        })
        if (!result) {
            return response.status(404).json({ message: 'Campaign not found' });
        }
        return response.status(200).send({ message: 'Campaign updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


/**
 * @openapi
 * '/brand/campaigns/single':
 *  get:
 *     tags:
 *     - Brand Campaign
 *     summary: Get a single campaign by id
 *     parameters:
 *      - name: id
 *        in: query
 *        description: Campaign id
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      500:
 *        description: Server Error
 */
router.get('/single', async (request, response) => {
    try {
        const { id } = request.query;
        const campaign = await Campaigns.findOne({
            _id: id
        })
        return response.status(200).json(campaign);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

export default router
