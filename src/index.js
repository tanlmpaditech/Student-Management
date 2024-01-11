import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRouter from './route/Route';
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
// import cors from "cors";
import cookieParser from 'cookie-parser';

// import { createJwt, verifyToken } from './middleware/JWTAction';

dotenv.config();

const app = express();

const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

viewEngine(app);
initWebRouter(app);

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Backend listening on port " + port)
});

