import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes';
import cors from 'cors';
import errorMiddleware from './middleware/error';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api', routes);

app.use(errorMiddleware);

try {
  (async () => {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URI!);
    app.listen(process.env.PORT, async () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })();
} catch (error) {
  console.error('Development server crashed');
}
