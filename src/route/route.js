import express from 'express';
import { getHomePage, createStudent, getAllStudents, handleEditStudent, handleDeleteStudent } from '../controllers/studentController';

import handleLogin from '../controllers/adminController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', getHomePage);
    
    router.post('/create-student', createStudent);
    router.get('/students', getAllStudents);
    router.put('/edit-student', handleEditStudent);
    router.delete('/delete-student', handleDeleteStudent);

    router.post('/login', handleLogin);
    return app.use('/', router)
}

export default initWebRouter;