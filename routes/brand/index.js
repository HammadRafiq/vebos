import express from 'express';
import Campaigns from '../../models/campaign.js';
import { handleIndexFrom } from '../../utils/index.js';

const router = express.Router();

router.post('/requestCreator', async (request, response) => {
    try {
        const newCampaign = new Campaigns(request.body)
        const campaign = await newCampaign.save()
        return response.status(201).send(campaign);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})

router.get('/', async (request, response) => {
    const { page, limit, search } = request.query
    const indexFrom = handleIndexFrom(page, limit)
    const filter = {}
    try {
        const campaigns = await Campaigns.find(filter)
            .limit(limit ?? 10)
            .skip(indexFrom)
            .exec()
        const total = await Campaigns.countDocuments(filter)
        return response.status(200).json({
            total,
            items: campaigns,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

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

router.put('/update', async (request, response) => {
    try {
        const { id } = request.query;
        const result = await Campaigns.findOneAndUpdate({ _id: id }, request.query, {
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
