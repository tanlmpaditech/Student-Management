import express from 'express';
import {getHomePage} from '../controllers/homeController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', getHomePage)
    // router.get('/crud', getCRUD)
    return app.use('/', router)
}

export default initWebRouter;