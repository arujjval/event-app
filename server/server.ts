import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as routes from './routes';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
dotenv.config({ path: `${__dirname}/../.env` });

const mongoURI = process.env.MONGO_ATLAS_URI!;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api', [routes.userRouter, routes.eventRouter, routes.handleEventUserRouter]);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});