import express from 'express';
import getHomePage from '../controllers/homeController';

let router = express.Router();

let initWebRouter = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send("Hello World!");
    // })

    router.get('/', getHomePage)

    return app.use('/', router)
}

export default initWebRouter;