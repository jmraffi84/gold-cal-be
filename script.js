import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'


import { goldRateRouter } from './Route/goldRateRoutes.js'

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(goldRateRouter)



const PORT = process.env.PORT
const MONGOURI = process.env.MONGO_URL
const APIURI = process.env.API_KEY


if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal server error during checkout' });
    });
}


// db connection
mongoose.connect(MONGOURI)
    .then(() => { console.log(`connected to Db Successfully`) })
    .catch((err) => console.log(err));

app.listen(PORT, console.log(`server started in local lost:${PORT}`));