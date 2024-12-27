import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config()
const PORT = process.env.PORT || 8080
const mongoDBURL = process.env.MONGO_DB_URL

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

// // Creator routes
// app.use('/creator/auth', authCreators)
// app.use('/creator/clips', clips)
// app.use('/creator/profiles', profiles)
// app.use('/creator/pages', pages)


// // Brand routes
// app.use('/brand/auth', authBrands)
// app.use('/brand/campaigns', campaigns)
// app.use('/brand/creatorsRequest', creatorsRequest)
// app.use('/brand/buyClip', buyClip)
// app.use('/brand', index) // Rest routes

mongoose
  .connect(mongoDBURL, {
    dbName: "vebos"
  })
  .then(() => {
    console.log('App connected to database');
    // swaggerDocs(app, PORT)
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error:", error);
  });

export default app
