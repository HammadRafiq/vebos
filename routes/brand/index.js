import express from 'express';
import Campaigns from '../../models/campaign.js';
import { handleIndexFrom } from '../../utils/index.js';
import { verifyTokenBrand } from '../../utils/auth.js';

const router = express.Router();


export default router
