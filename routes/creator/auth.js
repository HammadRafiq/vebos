import express from 'express';
import Creators from '../../models/creator.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from 'dotenv';


dotenv.config()
const router = express.Router();

/**
 * @openapi
 * '/creator/auth/signup':
 *  post:
 *     tags:
 *     - Creator Auth
 *     summary: Creator signup
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - password
 *              - email
 *              - paypal
 *              - country
 *              - parentName
 *              - tiktokId
 *              - clipLink
 *            properties:
 *              name:
 *                type: string
 *                default: Hammad
 *              email:
 *                type: string
 *                default: hammadrafiq50@gmail.com
 *              password:
 *                type: string
 *                default: Hammad@123
 *              paypal:
 *                type: string
 *                default: john@gmail.com
 *              country:
 *                type: string
 *                default: Pakistan
 *              parentName:
 *                type: string
 *                default: Khan
 *              dob:
 *                type: date
 *                default: 03/03/1995
 *              tiktokId:
 *                type: string
 *                default: sid_rapper
 *              youtube:
 *                type: string
 *                default: sid_rapper
 *              idCard:
 *                type: string
 *                default: 23432-23423-234
 *              clipLink:
 *                type: string
 *                default: https://www.google.com
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */
router.post('/signup', async (request, response) => {
  try {
    const creatorExists = await Creators.findOne({ email: request.body.email })
    if (creatorExists) {
      return response.status(400).send("User with this email already exists");
    }
    const securePassword = await bcrypt.hash(request.body.password, 10)
    const newCreator = new Creators({
      ...request.body,
      password: securePassword
    })
    const creator = await newCreator.save()
    return response.status(201).send(creator);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
})


/**
 * @openapi
 * '/creator/auth/login':
 *  post:
 *     tags:
 *     - Creator Auth
 *     summary: Creator login
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
 *                default: hammadrafiq50@gmail.com
 *              password:
 *                type: string
 *                default: Hammad@123
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */
router.post('/login', async (request, response) => {
  const creator = await Creators.findOne({
    email: request.body.email
  })
  if (!creator) {
    response.status(500).send({ message: "No such creator found" })
    return
  }
  const valid = await bcrypt.compare(request.body.password, creator.password)
  if (!valid) {
    response.status(500).send({ message: "Invalid password" })
    return
  }
  const token = jwt.sign({ creatorId: creator._id }, process.env.JWT_SECRET)
  response.status(200).send({ token });
});


export default router;
