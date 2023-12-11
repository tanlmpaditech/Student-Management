import express from 'express';
import { getHomePage, createStudent, postStudent, getAllStudents, editStudent, putStudentEdited, deleteStudent } from '../controllers/homeController';
import handleLogin from '../controllers/adminController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', getHomePage);
    
    router.get('/create-student', createStudent);
    router.post('/post-student', postStudent);
    router.get('/students', getAllStudents);
    router.get('/edit-student', editStudent);
    router.post('/put-student', putStudentEdited);
    router.get('/delete-student', deleteStudent);

    router.post('/login', handleLogin);
    return app.use('/', router)
}

export default initWebRouter;