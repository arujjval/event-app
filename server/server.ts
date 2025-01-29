import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as routes from './routes';
import cors from 'cors';

const app = express();
const port = 3000;

const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
dotenv.config({ path: `${__dirname}/../.env` });

const mongoURI = process.env.MONGO_ATLAS_URI!;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api', [routes.userRouter]);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});