import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import authCreators from './routes/creator/auth.js';
import clips from './routes/creator/clip.js';
import authBrands from './routes/brand/auth.js';
import campaigns from './routes/brand/campaign.js';
import index from './routes/brand/index.js';
import cors from 'cors';
import swaggerDocs from './swagger.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  return response.status(234).send('Vebos Backend Root');
});

// Creator routes
app.use('/creator/auth', authCreators)
app.use('/creator/clips', clips)

// Brand routes
app.use('/brand/auth', authBrands)
app.use('/brand/campaigns', campaigns)
app.use('/brand', index) // Rest of the routes

mongoose
  .connect(mongoDBURL, {
    dbName: "vebos"
  })
  .then(() => {
    console.log('App connected to database');
    swaggerDocs(app, PORT)
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
