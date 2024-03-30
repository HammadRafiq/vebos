import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()

export function verifyTokenBrand(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const { brandId } = jwt.verify(token, process.env.JWT_SECRET);
        if (brandId) {
            req.brandId = brandId
            next();
        }
        else {
            res.status(401).json({ error: "User doesn't have access to this resource" })
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export function verifyTokenCreator(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const { creatorId } = jwt.verify(token, process.env.JWT_SECRET);
        if (creatorId) {
            req.creatorId = creatorId
            next();
        }
        else {
            res.status(401).json({ error: "User doesn't have access to this resource" })
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
