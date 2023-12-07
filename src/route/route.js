import express from 'express';
import { getHomePage, createStudent, postStudent, getAllStudents, editStudent, putStudent } from '../controllers/homeController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', getHomePage);
    router.get('/create-student', createStudent);
    router.post('/post-student', postStudent);
    router.get('/students', getAllStudents);
    router.get('/edit-student', editStudent);
    router.post('/put-student', putStudent);
    return app.use('/', router)
}

export default initWebRouter;