import express from 'express';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { APP_SECRET } from '../../utils/auth.js';
import Brands from '../../models/brand.js';

const router = express.Router();


/** POST Methods */
/**
 * @openapi
 * '/brand/auth/signup':
 *  post:
 *     tags:
 *     - Brand Auth
 *     summary: Brand Signup
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - representative
 *              - password
 *              - email
 *              - phone
 *              - needs
 *              - budget
 *            properties:
 *              name:
 *                type: string
 *                default: Hammad
 *              email:
 *                type: string
 *                default: hammadrafiq1@gmail.com
 *              password:
 *                type: string
 *                default: Hammad@123
 *              representative:
 *                type: string
 *                default: John
 *              phone:
 *                type: string
 *                default: 0312-5442339
 *              needs:
 *                type: string
 *                default: Lorem ipsum
 *              budget:
 *                type: number
 *                default: 5000
 *              webLink:
 *                type: string
 *                default: https://www.google.com
 *              socialLink:
 *                type: string
 *                default: https://www.facebook.com
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */

router.post('/signup', async (request, response) => {
  try {
    const brandExists = await Brands.findOne({ email: request.body.email })
    if (brandExists) {
      response.status(400).send("Brand with this email already exists");
      return
    }
    const securePassword = await bcrypt.hash(request.body.password, 10)
    const newBrand = new Brands({
      ...request.body,
      password: securePassword
    })
    const brand = await newBrand.save()
    response.status(201).send(brand);
    return
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
})


/**
 * @openapi
 * '/brand/auth/login':
 *  post:
 *     tags:
 *     - Brand Auth
 *     summary: Brand login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: hammadrafiq1@gmail.com
 *              password:
 *                type: string
 *                default: Hammad@123
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

router.post('/login', async (request, response) => {
  const brand = await Brands.findOne({
    email: request.body.email
  })
  if (!brand) {
    response.status(500).send({ message: "No such brand/company found" })
    return
  }
  const valid = await bcrypt.compare(request.body.password, brand.password)
  if (!valid) {
    response.status(500).send({ message: "Invalid password" })
    return
  }
  const token = jwt.sign({ userId: brand._id }, APP_SECRET)
  response.status(201).send({ token });
});


export default router
