import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRouter from './route/route';
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
import cors from "cors";

dotenv.config();

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Backend listening on port " + port)
});
